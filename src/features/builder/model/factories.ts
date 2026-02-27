import { BuilderComponent, Column, ComponentType, PageLayout, Row, Section } from './types';
import { TemplateComponent, travelLandingTemplate } from './templates/travelLandingTemplate';

const makeId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const createDefaultComponent = (type: ComponentType): BuilderComponent => {
  const id = makeId();

  if (type === 'text') {
    return { id, type, text: '' };
  }

  if (type === 'button') {
    return { id, type, label: '', url: '', variant: 'primary', size: 'md' };
  }

  if (type === 'ratingStars') {
    return {
      id,
      type,
      rating: 4,
      count: 5,
    };
  }

  if (type === 'image') {
    return {
      id,
      type,
      src: '',
      alt: '',
    };
  }

  if (type === 'gallery') {
    return {
      id,
      type,
      images: [],
    };
  }

  if (type === 'pill') {
    return {
      id,
      type,
      label: 'Label',
      tone: 'default',
    };
  }

  if (type === 'inputField') {
    return {
      id,
      type,
      label: 'Field',
      placeholder: 'Select...',
    };
  }

  if (type === 'iconText') {
    return {
      id,
      type,
      icon: '📍',
      text: 'Los Angeles',
    };
  }

  if (type === 'priceTag') {
    return {
      id,
      type,
      amount: '$49.00',
      suffix: '/ night',
    };
  }

  return {
    id,
    type: 'spacer',
    height: 24,
  };
};

export const createColumn = (span = 6): Column => ({
  id: makeId(),
  span,
  components: [],
});

export const createRow = (): Row => ({
  id: makeId(),
  label: 'Row',
  columns: [createColumn(6), createColumn(6)],
});

export const createSection = (name?: string): Section => ({
  id: makeId(),
  name: name ?? 'Section',
  label: name ?? 'Section',
  rows: [createRow()],
});

export const createInitialLayout = (): PageLayout => ({
  title: '',
  sections: [createSection()],
});

const createComponentFromTemplate = (component: TemplateComponent): BuilderComponent => ({
  id: makeId(),
  ...component,
});

const createTravelTemplateColumn = (span: number, components: TemplateComponent[]): Column => ({
  id: makeId(),
  span,
  components: components.map(createComponentFromTemplate),
});

const createTravelTemplateRow = (
  columns: { span: number; components: TemplateComponent[] }[],
  label?: string
): Row => ({
  id: makeId(),
  label,
  columns: columns.map((column) => createTravelTemplateColumn(column.span, column.components)),
});

const createTravelTemplateSection = (
  name: string,
  rows: { label?: string; columns: { span: number; components: TemplateComponent[] }[] }[],
  label?: string
): Section => ({
  id: makeId(),
  name,
  label,
  rows: rows.map((row) => createTravelTemplateRow(row.columns, row.label)),
});

export const createTravelLandingLayout = (): PageLayout => ({
  title: travelLandingTemplate.title,
  sections: travelLandingTemplate.sections.map((section) =>
    createTravelTemplateSection(section.name, section.rows, section.label)
  ),
});
