import { formatNumber } from '@/utils/functions';
import { Card } from './components/Card';
import { useState } from 'react';
import DateFilter from './components/DateFilter';
import dayjs from 'dayjs';

export default function Dashboard() {
  const [date, setDate] = useState({
    from: dayjs(),
    to: dayjs().startOf('month'),
  });

  return (
    <div className="h-full flex flex-col gap-4 md:gap-6 p-4">
      <DateFilter setDate={setDate} title="DASHBOARD" />
      <div className="w-full grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card value={38} title="Tổng CV" />
        <Card value={formatNumber(2333)} title="Số CV có TA" />
        <Card value={formatNumber(412213826)} title="Số CV >3 năm kinh nghiệm" />
        <Card value="68.27%" title="Tỉ lệ CV có TA" />
      </div>
    </div>
  );
}
