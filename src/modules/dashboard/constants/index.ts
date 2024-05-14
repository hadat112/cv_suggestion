import dayjs from 'dayjs';

const today = dayjs();

export const rangePresets: any = [
  {
    label: 'Hôm qua',
    value: [today.add(-1, 'd'), today.add(-1, 'd')],
  },
  { label: 'Hôm nay', value: [today, today] },
  {
    label: 'Tuần trước',
    value: [today.add(-1, 'w').startOf('week'), today.add(-1, 'w').endOf('week')],
  },
  {
    label: 'Tuần này',
    value: [today.startOf('week'), today],
  },
  {
    label: 'Tháng trước',
    value: [today.add(-1, 'M').startOf('month'), today.add(-1, 'M').endOf('month')],
  },
  {
    label: 'Tháng này',
    value: [today.startOf('month'), today],
  },
  {
    label: 'Năm trước',
    value: [today.subtract(1, 'year').startOf('year'), today.subtract(1, 'year').endOf('year')],
  },
  {
    label: 'Năm nay',
    value: [today.startOf('year'), today],
  },
];
