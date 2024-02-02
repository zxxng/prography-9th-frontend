import { create } from 'zustand';

interface State {
  selectedCategory: string[];
  setSelectedCategory: (category: string[]) => void;
}

const useStore = create<State>((set) => ({
  selectedCategory: ['Beef'],
  setSelectedCategory: (category) =>
    set(() => ({ selectedCategory: category })),
}));

export default useStore;
