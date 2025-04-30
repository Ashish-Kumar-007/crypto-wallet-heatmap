// components/Heatmap.tsx
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { addDays } from 'date-fns';

export default function Heatmap({ data }) {
  const endDate = new Date();
  const startDate = addDays(endDate, -180);

  return (
    <CalendarHeatmap
      startDate={startDate}
      endDate={endDate}
      values={data}
      classForValue={(value) => {
        if (!value) return 'color-empty';
        if (value.count < 2) return 'color-scale-1';
        if (value.count < 5) return 'color-scale-2';
        return 'color-scale-3';
      }}
      tooltipDataAttrs={(value) => ({
        'data-tip': `${value.date}: ${value.count || 0} txs`,
      })}
    />
  );
}
