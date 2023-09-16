import type { Types } from "./home";

const STORAGE_KEY = "user";

export const getSession = () => localStorage.getItem(STORAGE_KEY);
export const setSession = (name: string) =>
  localStorage.setItem(STORAGE_KEY, name);
export const clearSession = () => localStorage.removeItem(STORAGE_KEY);

export default { getSession, setSession, clearSession };
