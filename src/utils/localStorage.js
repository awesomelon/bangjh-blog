export function getValueFromLocalStorage(key) {
  if (typeof window === 'undefined') return false;
  const value = window.localStorage.getItem(key);
  return value !== null ? JSON.parse(value) : false;
}

export function setValueToLocalStorage(key, value) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}
