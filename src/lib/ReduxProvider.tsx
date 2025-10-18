'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { setCredentials } from './authSlice';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  if (!initialized.current) {
    // Initialize auth state from cookie immediately during render
    if (typeof window !== 'undefined') {
      const authToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth-token='))
        ?.split('=')[1];

      const authEmail = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth-email='))
        ?.split('=')[1];

      if (authToken && authEmail) {
        store.dispatch(setCredentials({ token: authToken, email: authEmail }));
      }
      
      initialized.current = true;
    }
  }

  return <Provider store={store}>{children}</Provider>;
}
