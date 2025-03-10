import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define supported languages
export type Language = 'en' | 'de' | 'ar-ma';

// Define the shape of our language context
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

// Import all translations
import en from './translations/en';
import de from './translations/de';
import arMa from './translations/ar-ma';

// Create a translations object
const translations = {
  en,
  de,
  'ar-ma': arMa,
};

// Create a provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Try to get the language from localStorage, default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage && Object.keys(translations).includes(savedLanguage) 
      ? savedLanguage 
      : 'en';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update document direction for RTL languages
    document.documentElement.dir = language === 'ar-ma' ? 'rtl' : 'ltr';
    // Update lang attribute
    document.documentElement.lang = language === 'ar-ma' ? 'ar' : language;
  }, [language]);

  // Function to set language
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  // Translation function
  const t = (key: string, params?: Record<string, string>): string => {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    
    // Get the current translations object
    let value: any = translations[language];
    
    // Navigate through the nested properties
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // If the key doesn't exist, return the key itself
        return key;
      }
    }
    
    // If the value is not a string, return the key
    if (typeof value !== 'string') {
      return key;
    }
    
    // Replace parameters if provided
    if (params) {
      return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
        return acc.replace(new RegExp(`\\{\\{${paramKey}\\}\\}`, 'g'), paramValue);
      }, value);
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
