import React from "react";

const ScriptsTable = ({ scripts }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Scripts</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-200">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Strike Difference</th>
              <th className="px-4 py-3">Lot Size</th>
              <th className="px-4 py-3">Expiry Week</th>
              <th className="px-4 py-3">Exchange</th>
              <th className="px-4 py-3">Expiry Type</th>
            </tr>
          </thead>
          <tbody>
            {scripts.map((script) => (
              <tr key={script.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-4 py-3">{script.name}</td>
                <td className="px-4 py-3">{script.value}</td>
                <td className="px-4 py-3">{script.strikeDifference}</td>
                <td className="px-4 py-3">{script.lotSize}</td>
                <td className="px-4 py-3">{script.expiryWeek}</td>
                <td className="px-4 py-3">{script.exchange.value}</td>
                <td className="px-4 py-3">{script.scriptExpiries[0].expiryType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScriptsTable;
