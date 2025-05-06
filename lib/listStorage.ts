// Utility functions for list CRUD in localStorage
export type ListType = 'arrow' | 'circle' | 'funnel' | 'pyramid' | 'semicircle';
export interface ListData {
  id: string;
  type: ListType;
  items: string[];
}

const STORAGE_KEY = 'mindsmith_lists';

function getAllLists(): ListData[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveAllLists(lists: ListData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
}

export function getLists(): ListData[] {
  return getAllLists();
}

export function getList(id: string): ListData | undefined {
  return getAllLists().find(l => l.id === id);
}

export function saveList(list: ListData) {
  const lists = getAllLists();
  const idx = lists.findIndex(l => l.id === list.id);
  if (idx !== -1) {
    lists[idx] = list;
  } else {
    lists.push(list);
  }
  saveAllLists(lists);
}

export function deleteList(id: string) {
  const lists = getAllLists().filter(l => l.id !== id);
  saveAllLists(lists);
}
