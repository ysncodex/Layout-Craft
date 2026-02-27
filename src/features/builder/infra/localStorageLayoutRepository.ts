import { LayoutRepository } from '../model/layoutRepository';
import { LAYOUT_STORAGE_KEY } from '../model/storage';
import { PageLayout } from '../model/types';
import { validateAndRepairLayout } from '../model/validation';

const hasLocalStorage = () => typeof globalThis.localStorage !== 'undefined';

const persistLayout = (layout: PageLayout): boolean => {
  try {
    globalThis.localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layout));
    return true;
  } catch {
    return false;
  }
};

export const localStorageLayoutRepository: LayoutRepository = {
  loadLayout: () => {
    if (!hasLocalStorage()) {
      return { layout: null, repaired: false, malformed: false };
    }

    const raw = globalThis.localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (!raw) {
      return { layout: null, repaired: false, malformed: false };
    }

    try {
      const parsed = JSON.parse(raw) as unknown;
      const validated = validateAndRepairLayout(parsed);

      if (!validated.layout) {
        return { layout: null, repaired: false, malformed: true };
      }

      if (validated.repaired) {
        persistLayout(validated.layout);
      }

      return { layout: validated.layout, repaired: validated.repaired, malformed: false };
    } catch {
      return { layout: null, repaired: false, malformed: true };
    }
  },

  saveLayout: (layout: PageLayout) => {
    if (!hasLocalStorage()) {
      return false;
    }

    const validated = validateAndRepairLayout(layout);
    if (!validated.layout) {
      return false;
    }

    return persistLayout(validated.layout);
  },
};
