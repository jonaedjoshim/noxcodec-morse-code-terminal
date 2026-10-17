import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      if (item === null) {
        return initialValue;
      }

      const parsedValue = JSON.parse(item);

      if (Array.isArray(initialValue) && !Array.isArray(parsedValue)) {
        return initialValue;
      }

      return parsedValue;
    } catch (error) {
      console.warn(`[NOXCODEC] Failed to read localStorage key: ${key}`, error);

      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`[NOXCODEC] Failed to save localStorage key: ${key}`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
