import React from "react";
import { useLanguage } from "./index.tsx";

/**
 * Higher-order component that injects the translation function into a component.
 * This is useful for class components or components that need translations but don't
 * want to use the useLanguage hook directly.
 *
 * @param Component The component to wrap
 * @returns A new component with the t function injected as a prop
 */
export function withTranslation<P extends object>(
  Component: React.ComponentType<P & { t: any }>,
) {
  return (props: P) => {
    const { t } = useLanguage();
    return <Component {...props} t={t} />;
  };
}
