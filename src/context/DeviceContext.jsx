import { createContext, useContext, useEffect, useState } from 'react';

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
  const [hasTouchScreen, SetHasTouchScreen] = useState(false);

  useEffect(() => {
    if ("maxTouchPoints" in navigator) {
      SetHasTouchScreen(navigator.maxTouchPoints > 0)
    } else if ("msMaxTouchPoints" in navigator) {
      SetHasTouchScreen(navigator.msMaxTouchPoints > 0)
    } else {
      const mQ = matchMedia?.("(pointer:coarse)");
      if (mQ?.media === "(pointer:coarse)") {
        SetHasTouchScreen(!!mQ.matches);
      } else if ("orientation" in window) {
        SetHasTouchScreen(true);
      } else {
        const UA = navigator.userAgent;
        SetHasTouchScreen(/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA));
      }
    }
  }, [])

  return <DeviceContext.Provider value={{ hasTouchScreen }}>
    { children }
  </DeviceContext.Provider>
}

export function useDeviceContext() {
  return useContext(DeviceContext);
}