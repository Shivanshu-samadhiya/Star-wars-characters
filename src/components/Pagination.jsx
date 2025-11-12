import React from 'react';

export default function Pagination({ count=0, page=1, pageSize=10, onPageChange, hasNext, hasPrev }) {
  const total = Math.ceil(count / pageSize);
  const pages = [];
  for (let i = 1; i <= total; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-2">
      <button disabled={!hasPrev} onClick={()=>onPageChange(Math.max(1, page-1))} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
      {pages.slice(0, 10).map(p => (
        <button key={p} onClick={()=>onPageChange(p)} className={`px-3 py-1 border rounded ${p===page ? 'bg-indigo-600 text-white' : ''}`}>{p}</button>
      ))}
      <button disabled={!hasNext} onClick={()=>onPageChange(page+1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
    </div>
  );
}