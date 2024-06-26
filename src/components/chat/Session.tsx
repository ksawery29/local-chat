"use client"

import { useLLMInitialiseSession, useLLMSession, useLLMSettingTemperature, useLLMSettingTopK } from "@/app/usellm"
import { PropsWithChildren, useEffect } from "react";

export const LLMSession = (props: PropsWithChildren) => {
  const session = useLLMSession();
  const init = useLLMInitialiseSession();
  const temperature = useLLMSettingTemperature();
  const topK = useLLMSettingTopK();

  useEffect(() => {
    if (session === undefined) {
      if (temperature === undefined || topK === undefined) {
        init();
      } else {
        init({
          temperature,
          topK,
        });
      }
    }
  }, [session, init, temperature, topK]);

  if (session === undefined) {
    return null;
  }

  return props.children;
}