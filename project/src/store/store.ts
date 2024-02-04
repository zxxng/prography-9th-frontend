import { create } from 'zustand';
import type { Sort, View } from 'types/option';

interface State {
  selectedCategory: string[];
  setSelectedCategory: (category: string[]) => void;
  sortOption: Sort;
  setSortOption: (selected: Sort) => void;
  viewCount: View;
  setViewcount: (selected: View) => void;
}

const useStore = create<State>((set) => ({
  selectedCategory: [],
  setSelectedCategory: (category) =>
    set(() => ({ selectedCategory: category })),
  sortOption: 'latest',
  setSortOption: (selected) => set(() => ({ sortOption: selected })),
  viewCount: '4',
  setViewcount: (selected) => set(() => ({ viewCount: selected })),
}));

export default useStore;
