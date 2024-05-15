import { DatePicker } from 'antd';
import React from 'react';

export const ResponsiveRangePicker: React.FC<React.ComponentProps<typeof DatePicker.RangePicker>> = ({
  ...props
}) => {
  return <DatePicker.RangePicker size="small" popupClassName="custom-range-picker" {...props} />;
};
