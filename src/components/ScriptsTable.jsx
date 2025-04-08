import React, { useState } from "react";

const ScriptsTable = ({
    scripts,
    sortKey,
    sortOrder,
    onSortChange,
    onOrderChange,
    favorites,
    onToggleFavorite
}) => {
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleExpand = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const handleSort = (key) => {
        if (sortKey === key) {
            onOrderChange(sortOrder === "asc" ? "desc" : "asc");
        } else {
            onSortChange(key);
            onOrderChange("asc");
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
                Scripts
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600 dark:text-gray-200">
                    <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("id")}>
                                ID <SortIcon columnKey="id" />
                            </th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("name")}>
                                Name <SortIcon columnKey="name" />
                            </th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("value")}>
                                Value <SortIcon columnKey="value" />
                            </th>
                            <th className="px-4 py-3">Details</th>
                            <th className="px-4 py-3">Exchange</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scripts.map((script) => (
                            <React.Fragment key={script.id}>
                                <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    <td className="px-4 py-3">{script.id}</td>
                                    <td className="px-4 py-3 font-medium">
                                        {script.name}
                                        {favorites.includes(script.id) && (
                                            <span className="ml-2 text-yellow-500">★</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">{script.value}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => toggleExpand(script.id)}
                                            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200
                                                ${expandedRow === script.id
                                                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                                                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                                }`}
                                        >
                                            {expandedRow === script.id ? "Hide" : "Show"} Details
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium">{script.exchange.value}</div>
                                        <div className="text-xs text-gray-500">{script.exchange.expiryTime}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => onToggleFavorite(script.id)}
                                            className={`p-1 rounded ${favorites.includes(script.id)
                                                ? "text-yellow-500 bg-yellow-50"
                                                : "text-gray-500 hover:bg-gray-100"
                                                }`}
                                        >
                                            {favorites.includes(script.id) ? "★ Favorited" : "☆ Add Favorite"}
                                        </button>
                                    </td>
                                </tr>

                                {expandedRow === script.id && (
                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                        <td colSpan="6" className="px-4 py-3">
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div>
                                                    <h4 className="font-medium">Trading Info</h4>
                                                    <p>Strike Diff: {script.strikeDifference}</p>
                                                    <p>Lot Size: {script.lotSize}</p>
                                                    <p>Expiry Week: {script.expiryWeek}</p>
                                                </div>

                                                <div>
                                                    <h4 className="font-medium">Expiries</h4>
                                                    {script.scriptExpiries?.length > 0 ? (
                                                        <ul className="list-disc pl-5">
                                                            {script.scriptExpiries.map((expiry, idx) => (
                                                                <li key={idx}>
                                                                    {expiry.expiryType} (ID: {expiry.id})
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p>No expiries</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <h4 className="font-medium">Exchange Details</h4>
                                                    <p>ID: {script.exchange.id}</p>
                                                    <p>Name: {script.exchange.value}</p>
                                                    <p>Expiry: {script.exchange.expiryTime}</p>
                                                </div>

                                                <div>
                                                    <h4 className="font-medium">Metadata</h4>
                                                    <p>Script ID: {script.id}</p>
                                                    <p>Value: {script.value}</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScriptsTable;
