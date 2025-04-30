import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export const TransactionHeatmap = ({ startDate, endDate, data }) => {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">
        🗓️ 6-Month Transaction Heatmap
      </h2>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={data}
        classForValue={(value) => {
          if (!value || !value.count) return "bg-gray-200";
          if (value.count < 2) return "bg-green-200";
          if (value.count < 5) return "bg-green-400";
          return "bg-green-600";
        }}
        tooltipDataAttrs={(value) => ({
          "data-tip": `${value.date}: ${value.count || 0} txs`,
        })}
        showWeekdayLabels
      />
      <p className="text-sm text-gray-500 mt-2">
        Darker shades indicate higher transaction activity.
      </p>
    </section>
  );
};
