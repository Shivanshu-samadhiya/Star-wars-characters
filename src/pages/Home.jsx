import React, { useEffect, useState } from 'react';
import { fetchPeople } from '../api';
import CharacterCard from '../components/CharacterCard';
import CharacterModal from '../components/CharacterModal';
import Pagination from '../components/Pagination';
import { formatDate_ddMMyyyy } from '../utils';
import Spinner from '../components/Spinner';

const Home = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [data, setData] = useState({ results: [], count: 0, next: null, previous: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const json = await fetchPeople({ page, search });
      setData(json);
    } catch (e) {
      setError(e.message || 'Error fetching characters');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [page, search]);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar / Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10 border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Star Wars Characters</h1>
          <div className="flex gap-2 items-center">
            <input
              placeholder="Search by name..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="p-2 pl-3 border border-slate-300 rounded-lg w-64 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300 shadow-sm"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {loading && (
          <div className="text-center py-20 flex justify-center items-center">
            <Spinner />
          </div>
        )}
        {error && <div className="text-center text-red-600 py-10">{error}</div>}
        {!loading && !error && data.results.length === 0 && (
          <div className="text-center py-10 text-slate-600">No characters found.</div>
        )}

        {/* Character Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
          {data.results.map(person => (
            <CharacterCard
              key={person.url}
              person={person}
              onOpen={() => {
                setSelectedPerson({
                  ...person,
                  dateAdded: formatDate_ddMMyyyy(new Date())
                });
              }}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <Pagination
            count={data.count}
            page={page}
            pageSize={10}
            onPageChange={(p) => setPage(p)}
            hasNext={Boolean(data.next)}
            hasPrev={Boolean(data.previous)}
          />
        </div>
      </main>

      {/* Modal */}
      {selectedPerson && (
        <CharacterModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}
    </div>
  );
};

export default Home;
