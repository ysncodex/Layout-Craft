import { describe, expect, it } from 'vitest';
import { createInitialLayout } from '../model/factories';
import {
  addSectionToLayout,
  addComponentToColumnInLayout,
  addRowToLayout,
  deleteSectionFromLayout,
  moveComponentInLayout,
  removeComponentFromLayout,
  setColumnSpanInLayout,
  setTitleInLayout,
  updateComponentInLayout,
} from './layoutTransforms';

const getFirstRow = (layout: ReturnType<typeof createInitialLayout>) => layout.sections[0].rows[0];

describe('layoutTransforms', () => {
  it('returns same layout for unknown section or row targets', () => {
    const layout = createInitialLayout();

    const afterDeleteUnknownSection = deleteSectionFromLayout(layout, 'missing-section');
    expect(afterDeleteUnknownSection).toBe(layout);

    const afterAddRowUnknownSection = addRowToLayout(layout, 'missing-section');
    expect(afterAddRowUnknownSection).toBe(layout);
  });

  it('clamps column span to 1..12', () => {
    const layout = createInitialLayout();
    const sectionId = layout.sections[0].id;
    const rowId = getFirstRow(layout).id;
    const columnId = getFirstRow(layout).columns[0].id;

    const high = setColumnSpanInLayout(layout, sectionId, rowId, columnId, 999);
    expect(high.sections[0].rows[0].columns[0].span).toBe(12);

    const low = setColumnSpanInLayout(layout, sectionId, rowId, columnId, -100);
    expect(low.sections[0].rows[0].columns[0].span).toBe(1);
  });

  it('bounds insert index when adding component to a column', () => {
    const layout = createInitialLayout();
    const columnId = getFirstRow(layout).columns[0].id;

    const withFirst = addComponentToColumnInLayout(layout, columnId, 'text');
    const withSecondAtFront = addComponentToColumnInLayout(withFirst, columnId, 'button', -10);

    const components = withSecondAtFront.sections[0].rows[0].columns[0].components;
    expect(components).toHaveLength(2);
    expect(components[0].type).toBe('button');
    expect(components[1].type).toBe('text');
  });

  it('does not remove component when move target column is missing', () => {
    const layout = createInitialLayout();
    const sourceColumnId = getFirstRow(layout).columns[0].id;

    const withComponent = addComponentToColumnInLayout(layout, sourceColumnId, 'text');
    const componentId = withComponent.sections[0].rows[0].columns[0].components[0].id;

    const moved = moveComponentInLayout(
      withComponent,
      sourceColumnId,
      'missing-target-column',
      componentId,
      0
    );

    expect(moved).toBe(withComponent);
    expect(moved.sections[0].rows[0].columns[0].components).toHaveLength(1);
    expect(moved.sections[0].rows[0].columns[0].components[0].id).toBe(componentId);
  });

  it('returns same layout when update type does not match component type', () => {
    const layout = createInitialLayout();
    const columnId = getFirstRow(layout).columns[0].id;
    const withText = addComponentToColumnInLayout(layout, columnId, 'text');
    const textId = withText.sections[0].rows[0].columns[0].components[0].id;

    const mismatched = updateComponentInLayout(withText, textId, {
      type: 'button',
      patch: { label: 'Book', url: '#' },
    });

    expect(mismatched).toBe(withText);
  });

  it('returns same layout when removing a missing component', () => {
    const layout = createInitialLayout();
    const columnId = getFirstRow(layout).columns[0].id;

    const removed = removeComponentFromLayout(layout, columnId, 'missing-component');
    expect(removed).toBe(layout);
  });

  it('returns same layout when title is unchanged', () => {
    const layout = createInitialLayout();
    const same = setTitleInLayout(layout, layout.title);

    expect(same).toBe(layout);
  });

  it('returns same layout when span resolves to current value', () => {
    const layout = createInitialLayout();
    const sectionId = layout.sections[0].id;
    const rowId = getFirstRow(layout).id;
    const columnId = getFirstRow(layout).columns[0].id;

    const same = setColumnSpanInLayout(layout, sectionId, rowId, columnId, 6);
    expect(same).toBe(layout);
  });

  it('returns same layout when moving a component to same position', () => {
    const layout = createInitialLayout();
    const columnId = getFirstRow(layout).columns[0].id;
    const withComponent = addComponentToColumnInLayout(layout, columnId, 'text');
    const componentId = withComponent.sections[0].rows[0].columns[0].components[0].id;

    const moved = moveComponentInLayout(withComponent, columnId, columnId, componentId, 0);
    expect(moved).toBe(withComponent);
  });

  it('preserves identity for unchanged branches on targeted span updates', () => {
    const layout = addSectionToLayout(createInitialLayout());
    const sectionId = layout.sections[0].id;
    const rowId = layout.sections[0].rows[0].id;
    const targetColumnId = layout.sections[0].rows[0].columns[0].id;

    const untouchedSection = layout.sections[1];
    const untouchedSiblingColumn = layout.sections[0].rows[0].columns[1];

    const updated = setColumnSpanInLayout(layout, sectionId, rowId, targetColumnId, 9);

    expect(updated).not.toBe(layout);
    expect(updated.sections[1]).toBe(untouchedSection);
    expect(updated.sections[0].rows[0].columns[1]).toBe(untouchedSiblingColumn);
    expect(updated.sections[0].rows[0].columns[0]).not.toBe(layout.sections[0].rows[0].columns[0]);
  });
});
