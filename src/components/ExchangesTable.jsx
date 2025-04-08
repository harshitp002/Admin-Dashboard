import React, { useState, useEffect } from "react";

const ExchangesTable = ({ exchanges }) => {
    const [sortedExchanges, setSortedExchanges] = useState([...exchanges]);
    const [sortKey, setSortKey] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const sorted = [...exchanges].sort((a, b) => {
            const valA = a[sortKey];
            const valB = b[sortKey];

            if (typeof valA === 'string' && typeof valB === 'string') {
                return sortOrder === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            } else {
                return sortOrder === "asc"
                    ? valA - valB
                    : valB - valA;
            }
        });

        setSortedExchanges(sorted);
    }, [exchanges, sortKey, sortOrder]);

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    const SortIcon = ({ columnKey }) => (
        <span className="ml-1">
            {sortKey === columnKey ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
        </span>
    );

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                Exchanges
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600 dark:text-gray-200">
                    <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("id")}>
                                ID <SortIcon columnKey="id" />
                            </th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("value")}>
                                Exchange Name <SortIcon columnKey="value" />
                            </th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("expiryTime")}>
                                Expiry Time <SortIcon columnKey="expiryTime" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedExchanges.map((exchange) => (
                            <tr key={exchange.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                <td className="px-4 py-3">{exchange.id}</td>
                                <td className="px-4 py-3 font-medium">{exchange.value}</td>
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