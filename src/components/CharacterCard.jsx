// src/components/CharacterCard.jsx
import React, { useEffect, useState } from 'react';
import { fetchResource } from '../api';

export default function CharacterCard({ person, onOpen }) {
  const [speciesName, setSpeciesName] = useState('');
  const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(person.name)}/500/320`;

  // Pastel background colors (unique per card)
  const pastelColors = [
    'bg-rose-100',
    'bg-indigo-100',
    'bg-amber-100',
    'bg-emerald-100',
    'bg-sky-100',
    'bg-lime-100',
    'bg-orange-100',
    'bg-violet-100'
  ];
  const randomBg = pastelColors[person.name.length % pastelColors.length];

  useEffect(() => {
    let mounted = true;
    async function loadSpecies() {
      try {
        if (person.species && person.species.length > 0) {
          const sp = await fetchResource(person.species[0]);
          if (mounted) setSpeciesName(sp.name);
        } else {
          setSpeciesName('Human');
        }
      } catch {
        setSpeciesName('');
      }
    }
    loadSpecies();
    return () => { mounted = false; };
  }, [person]);

  return (
    <div
      className={`relative ${randomBg} text-slate-800 rounded-2xl shadow-md border border-slate-200 overflow-hidden 
      transform transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl`}
    >
      {/* Character Image */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={person.name}
          className="w-full h-60 object-cover rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-xl text-slate-800 tracking-tight mb-1">
          {person.name}
        </h3>

        <p className="text-sm text-slate-700">
          Species: <span className="font-medium text-indigo-700">{speciesName || 'Unknown'}</span>
        </p>

        <div className="mt-5 flex justify-between items-center">
          <button
            onClick={onOpen}
            className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 hover:shadow-lg transition-all duration-300"
          >
            View Details
          </button>

          <span className="text-xs text-slate-600">
            🎬 Films: {person.films.length}
          </span>
        </div>
      </div>
    </div>
  );
}
