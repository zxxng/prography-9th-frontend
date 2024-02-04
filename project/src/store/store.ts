import { create } from 'zustand';
import type { Sort, View } from 'types/option';

interface State {
  sortOption: Sort;
  setSortOption: (selected: Sort) => void;
  viewCount: View;
  setViewcount: (selected: View) => void;
}

const useStore = create<State>((set) => ({
  sortOption: 'latest',
  setSortOption: (selected) => set(() => ({ sortOption: selected })),
  viewCount: 4,
  setViewcount: (selected) => set(() => ({ viewCount: selected })),
}));

export default useStore;
