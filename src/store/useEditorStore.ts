import { create } from 'zustand';

interface EditorState {
  selectedElementId: string | null;
  setSelectedElement: (id: string | null) => void;
  // You can add more UI state here later, like device viewport (desktop/mobile)
}

export const useEditorStore = create<EditorState>((set) => ({
  selectedElementId: null,
  setSelectedElement: (id) => set({ selectedElementId: id }),
}));
