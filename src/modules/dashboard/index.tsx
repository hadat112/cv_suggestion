import { formatNumber } from '@/utils/functions';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Card } from './components/Card';
import DateFilter from './components/DateFilter';

export default function Dashboard() {
  const [_date, setDate] = useState({
    from: dayjs(),
    to: dayjs().startOf('month'),
  });

  const queryClient = useQueryClient();

  return (
    <div className="h-full flex flex-col gap-4 md:gap-6">
      <DateFilter setDate={setDate} title="DASHBOARD" />
      <div className="w-full grid gap-4 grid-cols-2 lg:grid-cols-4 px-4">
        <Card value={38} title="Tổng CV" />
        <Card value={formatNumber(2333)} title="Số CV có TA" />
        <Card value={formatNumber(412213826)} title="Số CV >3 năm kinh nghiệm" />
        <Card value="68.27%" title="Tỉ lệ CV có TA" />
      </div>
      <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['user-info'] })}>reload</Button>
    </div>
  );
}
