// src/components/CharacterModal.jsx
import React, { useEffect, useState } from 'react';
import { fetchResource } from '../api';
import { cmToMeters } from '../utils';

const CharacterModal = ({ person, onClose }) => {
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadHomeworld() {
      setLoading(true);
      try {
        const hw = await fetchResource(person.homeworld);
        if (mounted) setHomeworld(hw);
      } catch (e) {
        if (mounted) setHomeworld({ name: 'Unknown' });
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadHomeworld();
    return () => { mounted = false; };
  }, [person]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
      <div className="bg-white p-6 w-full max-w-2xl shadow-2xl border border-slate-200 animate-fadeIn scale-100 transition-transform duration-300">
        
        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-wide">
            {person.name}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-red-500 transition-colors duration-200 font-semibold"
          >
            ✕
          </button>
        </div>

        {/* Details */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700">
          <div className="space-y-2">
            <p><strong className="text-slate-800">Height:</strong> {cmToMeters(person.height)}</p>
            <p><strong className="text-slate-800">Mass:</strong> {person.mass === 'unknown' ? 'Unknown' : `${person.mass} kg`}</p>
            <p><strong className="text-slate-800">Birth Year:</strong> {person.birth_year}</p>
            <p><strong className="text-slate-800">Films Count:</strong> {person.films.length}</p>
            <p><strong className="text-slate-800">Date Added:</strong> {person.dateAdded}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-slate-800 text-lg underline decoration-slate-300">
              Homeworld
            </h3>
            {loading && <p className="text-sm text-slate-500">Loading homeworld...</p>}
            {!loading && homeworld && (
              <div className="space-y-1">
                <p><strong>Name:</strong> {homeworld.name}</p>
                <p><strong>Terrain:</strong> {homeworld.terrain || 'Unknown'}</p>
                <p><strong>Climate:</strong> {homeworld.climate || 'Unknown'}</p>
                <p><strong>Population:</strong> {homeworld.population || 'Unknown'}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 text-white rounded-xl shadow-md hover:bg-slate-700 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
