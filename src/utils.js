export function formatDate_ddMMyyyy(date = new Date()) {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

export function cmToMeters(cmStr) {
  if (!cmStr || cmStr === 'unknown' || isNaN(Number(cmStr))) return 'Unknown';
  const m = Number(cmStr) / 100;
  return `${m.toFixed(2)} m`;
}

