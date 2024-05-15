import { useEffect } from 'react';
import { ResponsiveRangePicker } from '@/components/common/ResponsiveRangePicker';
import dayjs from 'dayjs';
import { Form } from 'antd';
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
      className="flex items-center justify-between w-full flex-col md:flex-row"
      onValuesChange={handleValueChange}
    >
      <div className="flex items-center md:items-baseline gap-2 flex-col md:flex-row md:flex-wrap">
        <h2 className="text-xl m-0">{title}</h2>
        <i className="mb-6 md:m-0 text-xs ">Cập nhật lúc {dayjs().format('YYYY/MM/DD HH:mm:ss')}</i>
      </div>
      <Form.Item className="mb-0 w-full md:w-auto" name="rangeTime">
        <ResponsiveRangePicker allowClear={false} presets={rangePresets} className="w-full" />
      </Form.Item>
    </Form>
  );
};

export default DateFilter;
