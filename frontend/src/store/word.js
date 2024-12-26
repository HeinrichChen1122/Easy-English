import { create } from "zustand"

export const useWordStore = create((set) => ({
    words: [],
    setWords: (words) => set({ words }),
    fetchWords: async (videoKey) => {
        const res = await fetch(`/api/words/${videoKey}`);
        const data = await res.json();
        set({ words: data.data });
    }
}))