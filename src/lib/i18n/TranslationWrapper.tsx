import React, { ReactNode } from "react";
import { useLanguage } from "./index.tsx";

interface TranslationWrapperProps {
  translationKey: string;
  children: ReactNode;
  params?: Record<string, string>;
}

/**
 * A component that wraps content and translates it using the i18n system.
 * This is useful for components that don't have direct access to the useLanguage hook
 * or for simplifying translation in complex components.
 */
export const TranslationWrapper = ({
  translationKey,
  children,
  params,
}: TranslationWrapperProps) => {
  const { t } = useLanguage();
  return <>{t(translationKey, params) || children}</>;
};
