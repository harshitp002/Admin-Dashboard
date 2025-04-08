import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScripts } from "../features/scripts/scriptsSlice";
import { scripts, exchanges } from "../features/scripts/scriptsData";

import ScriptsTable from "./ScriptsTable";
import ExchangesTable from "./ExchangesTable";

const ScriptsExchanges = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setScripts({ scripts, exchanges }));
  }, [dispatch]);

  const storedScripts = useSelector((state) => state.data.scripts);
  const storedExchanges = useSelector((state) => state.data.exchanges);


  const [scriptsSearch, setScriptsSearch] = useState("");
  const [exchangesSearch, setExchangesSearch] = useState("");
  const [scriptsPage, setScriptsPage] = useState(1);
  const [exchangesPage, setExchangesPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortKey, setSortKey] = useState("name");
  const [favorites, setFavorites] = useState([]);

  const scriptsPerPage = 5;
  const exchangesPerPage = 4;

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const filteredScripts = storedScripts.filter(
    (item) =>
      item.name.toLowerCase().includes(scriptsSearch.toLowerCase()) ||
      item.value.toLowerCase().includes(scriptsSearch.toLowerCase())
  );

  const sortedScripts = [...filteredScripts].sort((a, b) => {
    const valA = a[sortKey]?.toString().toLowerCase();
    const valB = b[sortKey]?.toString().toLowerCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedScripts = sortedScripts.slice(
    (scriptsPage - 1) * scriptsPerPage,
    scriptsPage * scriptsPerPage
  );

  const totalScriptPages = Math.ceil(filteredScripts.length / scriptsPerPage);

  const filteredExchanges = storedExchanges.filter(
    (item) =>
      item.value.toLowerCase().includes(exchangesSearch.toLowerCase()) ||
      item.id.toString().includes(exchangesSearch)
  );

  const paginatedExchanges = filteredExchanges.slice(
    (exchangesPage - 1) * exchangesPerPage,
    exchangesPage * exchangesPerPage
  );

  const totalExchangePages = Math.ceil(filteredExchanges.length / exchangesPerPage);

  const handleNewExchange = () => {
    alert("New Exchange button clicked! Implement modal/form next.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Scripts and Exchanges
      </h1>

      {/* // FOR SCRIPT TABLE */}
      <div className="bg-white shadow rounded-xl p-4 mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          <h2 className="text-xl font-semibold">Scripts Table</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search Scripts..."
              className="border border-gray-300 rounded px-3 py-1.5 w-full sm:w-60"
              value={scriptsSearch}
              onChange={(e) => {
                setScriptsSearch(e.target.value);
                setScriptsPage(1);
              }}
            />
            <button
              onClick={() => setFavorites([])}
              className="border border-gray-300 px-4 py-1.5 rounded hover:bg-gray-100"
            >
              Clear Favorites
            </button>
          </div>
        </div>

        <ScriptsTable
          scripts={paginatedScripts}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSortChange={setSortKey}
          onOrderChange={setSortOrder}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />

        {/* Scripts pagination */}
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setScriptsPage((p) => Math.max(p - 1, 1))}
            disabled={scriptsPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ◀
          </button>
          <span className="px-2 py-1 text-sm">
            {scriptsPage} of {totalScriptPages}
          </span>
          <button
            onClick={() => setScriptsPage((p) => Math.min(p + 1, totalScriptPages))}
            disabled={scriptsPage === totalScriptPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Exchanges table */}
      <div className="bg-white shadow rounded-xl p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          <h2 className="text-xl font-semibold">Exchanges Table</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search Exchanges..."
              className="border border-gray-300 rounded px-3 py-1.5 w-full sm:w-60"
              value={exchangesSearch}
              onChange={(e) => {
                setExchangesSearch(e.target.value);
                setExchangesPage(1);
              }}
            />
            <button
              onClick={handleNewExchange}
              className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
            >
              New Exchange
            </button>
          </div>
        </div>

        <ExchangesTable
          exchanges={paginatedExchanges}
          searchValue={exchangesSearch}
          onSearch={setExchangesSearch}
        />

        {/* exchanges pagination */}
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setExchangesPage((p) => Math.max(p - 1, 1))}
            disabled={exchangesPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ◀
          </button>
          <span className="px-2 py-1 text-sm">
            {exchangesPage} of {totalExchangePages}
          </span>
          <button
            onClick={() => setExchangesPage((p) => Math.min(p + 1, totalExchangePages))}
            disabled={exchangesPage === totalExchangePages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScriptsExchanges;

