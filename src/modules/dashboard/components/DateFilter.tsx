import { ResponsiveRangePicker } from '@/components/common/ResponsiveRangePicker';
import { Form } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { rangePresets } from '../constants';

const DateFilter = ({ setDate, title }) => {
  const [form] = Form.useForm();

  const handleValueChange = (changedValue) => {
    const [key, value] = Object.entries(changedValue)?.[0] || [];

    if (key === 'rangeTime') {
      const from = value[0];
      const to = value[1];
      setDate({ from, to });
    }
  };

  useEffect(() => {
    const today = dayjs();
    const from = today.startOf('month');

    form.setFieldsValue({ rangeTime: [from, today] });
  }, [form]);

  return (
    <Form
      form={form}
      className="flex items-center justify-between w-full flex-col md:flex-row border-0 border-b border-solid border-th-border p-4"
      onValuesChange={handleValueChange}
    >
      <div className="flex items-center md:items-baseline gap-2 flex-col md:flex-row md:flex-wrap">
        <h2 className="text-xl m-0">{title}</h2>
        <i className="mb-6 md:m-0 text-xs ">Cập nhật lúc {dayjs().format('YYYY/MM/DD HH:mm:ss')}</i>
      </div>
      <Form.Item className="mb-0 w-full md:w-auto h-7" name="rangeTime">
        <ResponsiveRangePicker size="small" allowClear={false} presets={rangePresets} className="w-full" />
      </Form.Item>
    </Form>
  );
};

export default DateFilter;
