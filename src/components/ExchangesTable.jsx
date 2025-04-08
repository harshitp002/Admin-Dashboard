import React from "react";

const ExchangesTable = ({ exchanges }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Exchanges</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-200">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Exchange Name</th>
              <th className="px-4 py-3">Expiry Time</th>
            </tr>
          </thead>
          <tbody>
            {exchanges.map((exchange) => (
              <tr key={exchange.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-4 py-3">{exchange.id}</td>
                <td className="px-4 py-3">{exchange.value}</td>
                <td className="px-4 py-3">{exchange.expiryTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExchangesTable;
