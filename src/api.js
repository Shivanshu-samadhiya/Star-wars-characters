const BASE = 'https://swapi.dev/api';

export async function fetchPeople({ page = 1, search = '' } = {}) {
  const url = `${BASE}/people/?page=${page}&search=${encodeURIComponent(search)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch people');
  return res.json(); 
}

export async function fetchResource(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch resource: ${url}`);
  return res.json();
}
