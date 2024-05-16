import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DeviceProvider } from './DeviceProvider';
import { ThemeProvider } from './ThemeProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProvider = ({ children }) => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <DeviceProvider>{children}</DeviceProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
