import { beforeEach, describe, expect, it } from 'vitest';
import { createInitialLayout } from '../model/factories';
import { LAYOUT_STORAGE_KEY } from '../model/storage';
import { useBuilderStore } from './useBuilderStore';

class LocalStorageMock {
  private readonly store = new Map<string, string>();

  getItem(key: string) {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.store.set(key, value);
  }

  removeItem(key: string) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

const localStorageMock = new LocalStorageMock();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

const resetStore = () => {
  useBuilderStore.setState({
    layout: createInitialLayout(),
    pastLayouts: [],
    futureLayouts: [],
  });
  localStorage.clear();
};

describe('useBuilderStore', () => {
  beforeEach(() => {
    resetStore();
  });

  it('moves components between columns', () => {
    const store = useBuilderStore.getState();
    const sectionId = store.layout.sections[0].id;
    const rowId = store.layout.sections[0].rows[0].id;
    const sourceColumn = store.layout.sections[0].rows[0].columns[0];
    const targetColumn = store.layout.sections[0].rows[0].columns[1];

    store.addComponentToColumn(sourceColumn.id, 'text');
    const textId = useBuilderStore.getState().layout.sections[0].rows[0].columns[0].components[0]?.id;
    expect(textId).toBeTruthy();

    useBuilderStore.getState().moveComponent(sourceColumn.id, targetColumn.id, textId as string, 0);

    const next = useBuilderStore.getState().layout;
    const updatedSource = next.sections
      .find((section) => section.id === sectionId)
      ?.rows.find((row) => row.id === rowId)
      ?.columns.find((column) => column.id === sourceColumn.id);
    const updatedTarget = next.sections
      .find((section) => section.id === sectionId)
      ?.rows.find((row) => row.id === rowId)
      ?.columns.find((column) => column.id === targetColumn.id);

    expect(updatedSource?.components).toHaveLength(0);
    expect(updatedTarget?.components[0]?.id).toBe(textId);
  });

  it('supports undo and redo for state changes', () => {
    const store = useBuilderStore.getState();
    const initialCount = store.layout.sections.length;

    store.addSection();
    expect(useBuilderStore.getState().layout.sections.length).toBe(initialCount + 1);

    useBuilderStore.getState().undo();
    expect(useBuilderStore.getState().layout.sections.length).toBe(initialCount);

    useBuilderStore.getState().redo();
    expect(useBuilderStore.getState().layout.sections.length).toBe(initialCount + 1);
  });

  it('validates and repairs malformed layout on load', () => {
    const malformed = {
      title: 'Broken',
      sections: [
        {
          id: 'section-1',
          name: 'Hero',
          rows: [
            {
              id: 'row-1',
              columns: [
                {
                  id: 'column-1',
                  span: 99,
                  components: [
                    {
                      id: 'component-1',
                      type: 'button',
                      label: 'Go',
                      url: '#',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(malformed));

    useBuilderStore.getState().loadLayout();

    const loaded = useBuilderStore.getState().layout;
    const loadedColumn = loaded.sections[0]?.rows[0]?.columns[0];
    const loadedButton = loadedColumn?.components[0];

    expect(loaded.title).toBe('Broken');
    expect(loadedColumn?.span).toBe(12);
    expect(loadedButton?.type).toBe('button');
    if (loadedButton?.type === 'button') {
      expect(loadedButton.variant).toBe('primary');
      expect(loadedButton.size).toBe('md');
    }
  });

  it('saves only validated layout payloads', () => {
    useBuilderStore.getState().setTitle('Validated layout');

    const saved = useBuilderStore.getState().saveLayout();
    expect(saved).toBe(true);

    const raw = localStorage.getItem(LAYOUT_STORAGE_KEY);
    expect(raw).not.toBeNull();

    const parsed = raw ? (JSON.parse(raw) as { title?: string }) : null;
    expect(parsed?.title).toBe('Validated layout');
  });

  it('caps history stack to the configured limit', () => {
    for (let index = 1; index <= 130; index += 1) {
      useBuilderStore.getState().setTitle(`Title ${index}`);
    }

    const state = useBuilderStore.getState();
    expect(state.pastLayouts.length).toBe(100);
    expect(state.layout.title).toBe('Title 130');
    expect(state.pastLayouts[0]?.title).toBe('Title 30');
  });
});
