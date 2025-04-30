export default function TopActiveDays ({ data }) {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          📅 Most Active Days
        </h2>
        <div className="space-y-3">
          {data
            .slice()
            .sort((a, b) => b.count - a.count)
            .slice(0, 7)
            .map((entry) => (
              <div key={entry.date}>
                <div className="flex justify-between text-sm font-medium text-gray-700">
                  <span>{entry.date}</span>
                  <span>{entry.count} txs</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(entry.count * 10, 100)}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      </section>
    );
  };
  