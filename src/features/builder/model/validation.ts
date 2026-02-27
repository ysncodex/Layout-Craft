import { BuilderComponent, Column, ComponentType, PageLayout, Row, Section } from './types';

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const asString = (value: unknown, fallback = '') =>
  typeof value === 'string' ? value : fallback;

const asNumber = (value: unknown, fallback = 0) =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback;

const asStringArray = (value: unknown) =>
  Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string') : [];

const normalizeComponentType = (value: unknown): ComponentType | null => {
  if (value === 'text') return 'text';
  if (value === 'button') return 'button';
  if (value === 'ratingStars') return 'ratingStars';
  if (value === 'image') return 'image';
  if (value === 'gallery') return 'gallery';
  if (value === 'spacer') return 'spacer';
  if (value === 'pill') return 'pill';
  if (value === 'inputField') return 'inputField';
  if (value === 'iconText') return 'iconText';
  if (value === 'priceTag') return 'priceTag';
  return null;
};

const sanitizeComponent = (value: unknown): BuilderComponent | null => {
  if (!isObject(value)) return null;

  const id = asString(value.id);
  const type = normalizeComponentType(value.type);
  if (!id || !type) return null;

  if (type === 'text') {
    return { id, type, text: asString(value.text) };
  }

  if (type === 'button') {
    const variant =
      value.variant === 'success' || value.variant === 'ghost' || value.variant === 'primary'
        ? value.variant
        : 'primary';
    const size = value.size === 'sm' || value.size === 'md' ? value.size : 'md';

    return {
      id,
      type,
      label: asString(value.label),
      url: asString(value.url),
      variant,
      size,
    };
  }

  if (type === 'ratingStars') {
    const rating = Math.max(0, Math.min(5, Math.round(asNumber(value.rating, 0))));
    const count = Math.max(1, Math.min(10, Math.round(asNumber(value.count, 5))));
    return { id, type, rating, count };
  }

  if (type === 'image') {
    return { id, type, src: asString(value.src), alt: asString(value.alt) };
  }

  if (type === 'gallery') {
    return { id, type, images: asStringArray(value.images) };
  }

  if (type === 'spacer') {
    const height = Math.max(0, Math.min(600, asNumber(value.height, 24)));
    return { id, type, height };
  }

  if (type === 'pill') {
    const tone = value.tone === 'active' ? 'active' : 'default';
    return { id, type, label: asString(value.label), tone };
  }

  if (type === 'inputField') {
    return {
      id,
      type,
      label: asString(value.label),
      placeholder: asString(value.placeholder),
    };
  }

  if (type === 'iconText') {
    return { id, type, icon: asString(value.icon), text: asString(value.text) };
  }

  return {
    id,
    type,
    amount: asString(value.amount),
    suffix: asString(value.suffix),
  };
};

const sanitizeColumn = (value: unknown): Column | null => {
  if (!isObject(value)) return null;

  const id = asString(value.id);
  if (!id) return null;

  const span = Math.max(1, Math.min(12, Math.round(asNumber(value.span, 6))));
  const components = Array.isArray(value.components)
    ? value.components.map(sanitizeComponent).filter((entry): entry is BuilderComponent => entry !== null)
    : [];

  return { id, span, components };
};

const sanitizeRow = (value: unknown): Row | null => {
  if (!isObject(value)) return null;

  const id = asString(value.id);
  if (!id) return null;

  const columns = Array.isArray(value.columns)
    ? value.columns.map(sanitizeColumn).filter((entry): entry is Column => entry !== null)
    : [];

  if (columns.length === 0) return null;

  return {
    id,
    label: asString(value.label) || undefined,
    columns,
  };
};

const sanitizeSection = (value: unknown): Section | null => {
  if (!isObject(value)) return null;

  const id = asString(value.id);
  if (!id) return null;

  const rows = Array.isArray(value.rows)
    ? value.rows.map(sanitizeRow).filter((entry): entry is Row => entry !== null)
    : [];

  if (rows.length === 0) return null;

  return {
    id,
    name: asString(value.name, 'Section'),
    label: asString(value.label) || undefined,
    rows,
  };
};

export type ValidationResult = {
  layout: PageLayout | null;
  repaired: boolean;
  reason?: 'parse-error' | 'invalid-shape' | 'empty-layout';
};

export const validateAndRepairLayout = (input: unknown): ValidationResult => {
  if (!isObject(input)) {
    return { layout: null, repaired: false, reason: 'invalid-shape' };
  }

  const sections = Array.isArray(input.sections)
    ? input.sections.map(sanitizeSection).filter((entry): entry is Section => entry !== null)
    : [];

  if (sections.length === 0) {
    return { layout: null, repaired: false, reason: 'empty-layout' };
  }

  const layout: PageLayout = {
    title: asString(input.title),
    sections,
  };

  const repaired = JSON.stringify(layout) !== JSON.stringify(input);
  return { layout, repaired };
};
