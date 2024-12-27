import { create } from "zustand"

export const useWordStore = create((set) => ({
    words: [],
    setWords: (words) => set({ words }),
    fetchWords: async (videoKey) => {
        const res = await fetch(`/api/words/${videoKey}`);
        const data = await res.json();
        if (data.success) {
            set({ words: data.data });
        }
    },
    deleteWord: async (cardWord) => {
        set((state) => ({ words: state.words.filter((word) => word.word !== cardWord) }));
        return { success: true, message: "success" }
    },
}))