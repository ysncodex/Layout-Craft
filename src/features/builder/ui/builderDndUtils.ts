import { DragEndEvent } from '@dnd-kit/core';
import { PageLayout } from '../model/types';

export const findComponentLocation = (layout: PageLayout, componentId: string) => {
  for (const section of layout.sections) {
    for (const row of section.rows) {
      for (const column of row.columns) {
        const index = column.components.findIndex((component) => component.id === componentId);
        if (index >= 0) {
          return {
            columnId: column.id,
            index,
          };
        }
      }
    }
  }

  return null;
};

export const findDefaultColumnInRow = (layout: PageLayout, rowId: string) => {
  for (const section of layout.sections) {
    const row = section.rows.find((entry) => entry.id === rowId);
    if (row) {
      return row.columns[0] ?? null;
    }
  }

  return null;
};

export const findDefaultColumnInSection = (layout: PageLayout, sectionId: string) => {
  const section = layout.sections.find((entry) => entry.id === sectionId);
  if (!section) return null;

  for (const row of section.rows) {
    if (row.columns.length > 0) {
      return row.columns[0];
    }
  }

  return null;
};

export const isDropAfter = (event: DragEndEvent) => {
  const { active, over } = event;
  if (!over) return false;

  const activeRect = active.rect.current.translated ?? active.rect.current.initial;
  if (!activeRect) return false;
  const activeCenterY = activeRect.top + activeRect.height / 2;
  const overCenterY = over.rect.top + over.rect.height / 2;

  return activeCenterY > overCenterY;
};
