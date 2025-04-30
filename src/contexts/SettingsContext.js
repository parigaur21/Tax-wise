import React, { createContext, useState, useContext, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  // Default settings
  const defaultSettings = {
    darkMode: false,
    verbosityLevel: 'medium', // 'low', 'medium', 'high'
    colorTheme: 'blue', // 'blue', 'green', 'neutral'
    preferredCalculationMethod: 'standard', // 'standard', 'itemized'
    notifications: true,
  };

  // Get settings from localStorage or use defaults
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('taxAssistantSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('taxAssistantSettings', JSON.stringify(settings));
  }, [settings]);

  // Update a single setting
  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset settings to default
  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{ 
      settings, 
      updateSetting, 
      resetSettings 
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
