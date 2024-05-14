import { ThemeProvider } from '@/configs/theme/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext } from 'react';
import { DeviceProvider } from './DeviceProvider';

export const ThemeContext = createContext(null);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <DeviceProvider>{children}</DeviceProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
