'use client';

import { create } from 'zustand';
import { createInitialLayout, createTravelLandingLayout } from '../model/factories';
import { localStorageLayoutRepository } from '../infra/localStorageLayoutRepository';
import { ComponentType, ComponentUpdate, PageLayout } from '../model/types';
import {
  addColumnToLayout,
  addComponentToColumnInLayout,
  addRowToLayout,
  addSectionToLayout,
  deleteColumnFromLayout,
  deleteRowFromLayout,
  deleteSectionFromLayout,
  moveComponentInLayout,
  removeComponentFromLayout,
  setColumnSpanInLayout,
  setTitleInLayout,
  updateComponentInLayout,
} from './layoutTransforms';

type BuilderStore = {
  layout: PageLayout;
  pastLayouts: PageLayout[];
  futureLayouts: PageLayout[];
  setTitle: (title: string) => void;
  loadTravelLandingTemplate: () => void;
  addSection: () => void;
  deleteSection: (sectionId: string) => void;
  addRow: (sectionId: string) => void;
  deleteRow: (sectionId: string, rowId: string) => void;
  addColumn: (sectionId: string, rowId: string) => void;
  deleteColumn: (sectionId: string, rowId: string, columnId: string) => void;
  setColumnSpan: (sectionId: string, rowId: string, columnId: string, span: number) => void;
  addComponentToColumn: (columnId: string, type: ComponentType, targetIndex?: number) => void;
  moveComponent: (
    sourceColumnId: string,
    targetColumnId: string,
    componentId: string,
    targetIndex: number
  ) => void;
  removeComponent: (columnId: string, componentId: string) => void;
  updateComponent: (componentId: string, update: ComponentUpdate) => void;
  undo: () => void;
  redo: () => void;
  saveLayout: () => boolean;
  loadLayout: () => void;
};

const UPDATE_HISTORY_DEBOUNCE_MS = 450;
const MAX_HISTORY_ENTRIES = 100;

const cloneLayout = (layout: PageLayout): PageLayout => {
  if (typeof globalThis.structuredClone === 'function') {
    return globalThis.structuredClone(layout);
  }

  return JSON.parse(JSON.stringify(layout)) as PageLayout;
};

const pushPastLayout = (pastLayouts: PageLayout[], currentLayout: PageLayout) =>
  [...pastLayouts, cloneLayout(currentLayout)].slice(-MAX_HISTORY_ENTRIES);

const pushFutureLayout = (futureLayouts: PageLayout[], currentLayout: PageLayout) =>
  [cloneLayout(currentLayout), ...futureLayouts].slice(0, MAX_HISTORY_ENTRIES);

const commitLayoutChange = (
  state: BuilderStore,
  nextLayout: PageLayout,
  options?: { pushHistory?: boolean }
) => {
  if (nextLayout === state.layout) {
    return state;
  }

  if (options?.pushHistory === false) {
    return {
      layout: nextLayout,
      pastLayouts: state.pastLayouts,
      futureLayouts: state.futureLayouts,
    };
  }

  return {
    layout: nextLayout,
    pastLayouts: pushPastLayout(state.pastLayouts, state.layout),
    futureLayouts: [],
  };
};

let lastComponentEditAt = 0;
let lastComponentEditId: string | null = null;

const shouldCreateHistoryCheckpoint = (componentId: string) => {
  const now = Date.now();
  const shouldPush =
    lastComponentEditId !== componentId || now - lastComponentEditAt > UPDATE_HISTORY_DEBOUNCE_MS;

  lastComponentEditId = componentId;
  lastComponentEditAt = now;

  return shouldPush;
};

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  layout: createInitialLayout(),
  pastLayouts: [],
  futureLayouts: [],

  setTitle: (title) =>
    set((state) => commitLayoutChange(state, setTitleInLayout(state.layout, title))),

  loadTravelLandingTemplate: () =>
    set((state) => commitLayoutChange(state, createTravelLandingLayout())),

  addSection: () => set((state) => commitLayoutChange(state, addSectionToLayout(state.layout))),

  deleteSection: (sectionId) =>
    set((state) => commitLayoutChange(state, deleteSectionFromLayout(state.layout, sectionId))),

  addRow: (sectionId) =>
    set((state) => commitLayoutChange(state, addRowToLayout(state.layout, sectionId))),

  deleteRow: (sectionId, rowId) =>
    set((state) => commitLayoutChange(state, deleteRowFromLayout(state.layout, sectionId, rowId))),

  addColumn: (sectionId, rowId) =>
    set((state) => commitLayoutChange(state, addColumnToLayout(state.layout, sectionId, rowId))),

  deleteColumn: (sectionId, rowId, columnId) =>
    set((state) =>
      commitLayoutChange(state, deleteColumnFromLayout(state.layout, sectionId, rowId, columnId))
    ),

  setColumnSpan: (sectionId, rowId, columnId, span) =>
    set((state) =>
      commitLayoutChange(
        state,
        setColumnSpanInLayout(state.layout, sectionId, rowId, columnId, span)
      )
    ),

  addComponentToColumn: (columnId, type, targetIndex) =>
    set((state) =>
      commitLayoutChange(
        state,
        addComponentToColumnInLayout(state.layout, columnId, type, targetIndex)
      )
    ),

  moveComponent: (sourceColumnId, targetColumnId, componentId, targetIndex) =>
    set((state) =>
      commitLayoutChange(
        state,
        moveComponentInLayout(
          state.layout,
          sourceColumnId,
          targetColumnId,
          componentId,
          targetIndex
        )
      )
    ),

  removeComponent: (columnId, componentId) =>
    set((state) =>
      commitLayoutChange(state, removeComponentFromLayout(state.layout, columnId, componentId))
    ),

  updateComponent: (componentId, update) =>
    set((state) => {
      const pushHistory = shouldCreateHistoryCheckpoint(componentId);
      return commitLayoutChange(state, updateComponentInLayout(state.layout, componentId, update), {
        pushHistory,
      });
    }),

  undo: () =>
    set((state) => {
      if (state.pastLayouts.length === 0) {
        return state;
      }

      const previous = state.pastLayouts[state.pastLayouts.length - 1];
      return {
        layout: previous,
        pastLayouts: state.pastLayouts.slice(0, -1),
        futureLayouts: pushFutureLayout(state.futureLayouts, state.layout),
      };
    }),

  redo: () =>
    set((state) => {
      if (state.futureLayouts.length === 0) {
        return state;
      }

      const [next, ...rest] = state.futureLayouts;
      return {
        layout: next,
        pastLayouts: pushPastLayout(state.pastLayouts, state.layout),
        futureLayouts: rest,
      };
    }),

  saveLayout: () => {
    const layout = get().layout;
    return localStorageLayoutRepository.saveLayout(layout);
  },

  loadLayout: () => {
    const result = localStorageLayoutRepository.loadLayout();
    if (!result.layout) {
      return;
    }

    set({
      layout: result.layout,
      pastLayouts: [],
      futureLayouts: [],
    });
  },
}));
