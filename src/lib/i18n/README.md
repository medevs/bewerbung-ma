# Internationalization (i18n) System

## Overview

This directory contains the internationalization (i18n) system for the application. It provides a way to translate the application into multiple languages, including English, German, and Moroccan Darija (Arabic dialect spoken in Morocco).

## Structure

- `index.ts`: Contains the main i18n context, provider, and hook
- `translations/`: Directory containing translation files for each supported language
  - `en.ts`: English translations
  - `de.ts`: German translations
  - `ar-ma.ts`: Moroccan Darija translations

## Usage

### Wrapping Your Application

The application is already wrapped with the `LanguageProvider` in `App.tsx`:

```jsx
function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
          <AppContent />
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
```

### Using Translations in Components

To use translations in your components, import the `useLanguage` hook:

```jsx
import { useLanguage } from '@/lib/i18n';

function MyComponent() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div>
      <h1>{t('common.appName')}</h1>
      <p>{t('dashboard.welcome')}</p>
      <button onClick={() => setLanguage('de')}>
        {t('common.german')}
      </button>
    </div>
  );
}
```

### Translation with Parameters

You can also use parameters in your translations:

```jsx
// In your translation file
const en = {
  greeting: "Hello, {{name}}!"
};

// In your component
const { t } = useLanguage();
console.log(t('greeting', { name: 'John' })); // "Hello, John!"
```

### Language Switcher Component

A `LanguageSwitcher` component is provided to allow users to switch between languages:

```jsx
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
}
```

## Adding a New Language

To add a new language:

1. Create a new translation file in the `translations/` directory (e.g., `fr.ts` for French)
2. Copy the structure from an existing translation file and translate the strings
3. Import and add the new translation file in `index.ts`
4. Update the `Language` type to include the new language code
5. Add the new language option to the `LanguageSwitcher` component

## RTL Support

The system automatically sets the document direction to RTL for Arabic-based languages. This is handled in the `useEffect` hook in the `LanguageProvider`:

```jsx
useEffect(() => {
  localStorage.setItem('language', language);
  // Update document direction for RTL languages
  document.documentElement.dir = language === 'ar-ma' ? 'rtl' : 'ltr';
  // Update lang attribute
  document.documentElement.lang = language === 'ar-ma' ? 'ar' : language;
}, [language]);
```

## Translation Structure

Translations are organized in a nested structure to keep related translations together. For example:

```javascript
const en = {
  common: {
    appName: "Resume Builder",
    // ...
  },
  auth: {
    signIn: "Sign In",
    // ...
  },
  // ...
};
```

To access nested translations, use dot notation:

```jsx
t('common.appName') // "Resume Builder"
```
