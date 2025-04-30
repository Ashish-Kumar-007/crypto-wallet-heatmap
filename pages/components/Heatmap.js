import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { addDays } from 'date-fns';

interface HeatmapProps {
  data: { date: string; count: number }[]; // Define the expected structure for data
}

export default function Heatmap({ data = [] }: HeatmapProps) {
  const endDate = new Date();
  const startDate = addDays(endDate, -180);

  // Ensure the data passed to the heatmap has a valid structure
  const formattedData = data.map((item) => ({
    date: item.date || '',
    count: item.count || 0, // Ensure count is a valid number (fallback to 0 if undefined)
  }));

  return (
    <CalendarHeatmap
      startDate={startDate}
      endDate={endDate}
      values={formattedData}
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
