"use client"

import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from "sonner"

type LLMSettings = {
  temperature: number;
  topK: number;
}

type LLMSettingsStore = {
  temperature: number | undefined;
  topK: number | undefined;
  update: (settings: LLMSettings) => LLMSettings;
  reset: () => Promise<LLMSettings>;
}

const useLLMSettingsStore = create<LLMSettingsStore>()(
  persist(
    (set, get) => ({
      temperature: undefined,
      topK: undefined,

      update: (settings) => {
        set((state) => ({ ...state, ...settings }))

        return {
          temperature: settings.temperature ?? get().temperature,
          topK: settings.topK ?? get().topK,
        }
      },
      reset: async () => {
        if (!window.ai) {
          toast.error("AI not available");
          throw new Error("AI not available");
        }

        const defaults = await window.ai.defaultTextSessionOptions();

        set({
          temperature: defaults.temperature,
          topK: defaults.topK,
        })

        return defaults
      }
    }),
    {
      name: 'llm-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const useLLMSettingTemperature = () => useLLMSettingsStore(store => store.temperature)
export const useLLMSettingTopK = () => useLLMSettingsStore(store => store.topK)
export const useUpdateLLMSetting = () => useLLMSettingsStore(store => store.update)
export const useResetLLMSetting = () => useLLMSettingsStore(store => store.reset)

async function createLLMSession(settings?: LLMSettings) {
  if (!window.ai) {
    toast.error("AI not available");
    return undefined;
  }

  const supported = await window.ai.canCreateTextSession()

  if (supported === "not-readily") {
    toast.error("AI is not ready");
    return undefined;
  }

  return await window.ai.createTextSession(settings);
}

type Message = {
  id: string;
  author: "user" | "ai";
  content: string;
  timestamp: Date;
}

type LLMStore = {
  session: undefined | Awaited<ReturnType<typeof createLLMSession>>;
  initialiseSession: (settings?: LLMSettings) => Promise<void>;

  messages: Message[];
  streamedResponse: undefined | string;
  generatingResponse: boolean;
  addMessage: (message: string) => Promise<void>;
}

const useLLMStore = create<LLMStore>()((set, get) => ({
  session: undefined,
  initialiseSession: async (settings) => {
    set({ session: await createLLMSession(settings) })
  },

  messages: [],
  streamedResponse: undefined,
  generatingResponse: false,

  addMessage: async (message) => {

    set({ messages: [...get().messages, { id: crypto.randomUUID(), author: "user", content: message, timestamp: new Date() }] });

    const session = get().session;

    if (session === undefined) {
      toast.error("AI not available");
      return;
    }

    set({ generatingResponse: true });

    const stream = session.promptStreaming(message)
    const reader = stream.getReader()

    try {
      let done = false;
      let streamedResponse = '';
      while (!done) {
        const { value, done: isDone } = await reader.read();
        done = isDone;
        if (value) {
          streamedResponse = value;
          set({ streamedResponse }); // Update streamed response in the store
        }
      }

      // Add the final message to the messages array
      const messages = get().messages;
      set({
        messages: [...messages, { id: crypto.randomUUID(), author: "ai", content: streamedResponse, timestamp: new Date() }],
        streamedResponse: undefined, // Clear the streamed response after processing
        generatingResponse: false,
      });

    } catch (error) {
      toast.error("Error streaming response");
      console.error("Streaming error:", error);
    }

  }
}))

export const useLLMSession = () => useLLMStore(store => store.session)
export const useLLMMessages = () => useLLMStore(store => store.messages)
export const useLLMStreamedResponse = () => useLLMStore(store => store.streamedResponse)
export const useLLMGeneratingResponse = () => useLLMStore(store => store.generatingResponse)
export const useLLMAddMessage = () => useLLMStore(store => store.addMessage)
export const useLLMInitialiseSession = () => useLLMStore(store => store.initialiseSession)