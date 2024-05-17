import { useWindowSize } from '@/hooks/useWindowSize';
import React from 'react';

interface IDeviceContext {
  deviceType: 'mobile' | 'desktop';
  width: number;
  height: number;
}

interface IDeviceProviderProps {
  defaultDeviceType?: IDeviceContext['deviceType'];
  children: React.ReactNode;
}

const DeviceContext = React.createContext<IDeviceContext>(null);

export const DeviceProvider: React.FC<IDeviceProviderProps> = ({ defaultDeviceType, children }) => {
  const { width, height } = useWindowSize();
  const calculatedDeviceType = width <= 768 ? 'mobile' : 'desktop';

  const deviceType: IDeviceContext['deviceType'] =
    typeof defaultDeviceType !== 'undefined' ? defaultDeviceType : calculatedDeviceType;

  const value = React.useMemo(
    () => ({
      deviceType,
      width,
      height,
    }),
    [deviceType, height, width],
  );

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
};

export const useDevice = () => {
  const context = React.useContext(DeviceContext);

  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }

  return context;
};
