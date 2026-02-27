import { ComponentType } from '../model/types';

export type PaletteDragData = {
  kind: 'palette';
  componentType: ComponentType;
};

export type ComponentDragData = {
  kind: 'component';
  componentId: string;
  columnId: string;
};

export type ColumnDropData = {
  kind: 'column';
  columnId: string;
};

export type InsertDropData = {
  kind: 'insert';
  columnId: string;
  index: number;
};

export type RowDropData = {
  kind: 'row';
  sectionId: string;
  rowId: string;
};

export type SectionDropData = {
  kind: 'section';
  sectionId: string;
};

export type AnyDragData =
  | PaletteDragData
  | ComponentDragData
  | ColumnDropData
  | InsertDropData
  | RowDropData
  | SectionDropData;

export const parseDragData = (value: unknown): AnyDragData | null => {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as { kind?: string };

  if (candidate.kind === 'palette') {
    return value as PaletteDragData;
  }

  if (candidate.kind === 'component') {
    return value as ComponentDragData;
  }

  if (candidate.kind === 'column') {
    return value as ColumnDropData;
  }

  if (candidate.kind === 'insert') {
    return value as InsertDropData;
  }

  if (candidate.kind === 'row') {
    return value as RowDropData;
  }

  if (candidate.kind === 'section') {
    return value as SectionDropData;
  }

  return null;
};
