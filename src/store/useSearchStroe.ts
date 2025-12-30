import { create } from 'zustand';

interface SearchState {
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
    searchKeyword: '',
    setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
}));
