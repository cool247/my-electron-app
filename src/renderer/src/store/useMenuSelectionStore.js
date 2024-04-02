import { create } from 'zustand'

export const useMenuSelectionStore = create((set) => ({
  selectedMenu: '',
  openItems: [],
  selectMenu: (menu) => set({ selectedMenu: menu }),
  deselectMenu: () => set({ selectedMenu: '' }),
  toggleOpenItem: (itemIndex) =>
    set((state) => ({
      openItems: state.openItems.includes(itemIndex)
        ? state.openItems.filter((index) => index !== itemIndex)
        : [...state.openItems, itemIndex]
    }))
}))
