import { createColumn, createDefaultComponent, createRow, createSection } from '../model/factories';
import { BuilderComponent, ComponentType, ComponentUpdate, PageLayout } from '../model/types';

const clampSpan = (span: number) => Math.max(1, Math.min(12, span));

export const setTitleInLayout = (layout: PageLayout, title: string): PageLayout => {
  if (layout.title === title) {
    return layout;
  }

  return {
    ...layout,
    title,
  };
};

export const addSectionToLayout = (layout: PageLayout): PageLayout => ({
  ...layout,
  sections: [...layout.sections, createSection(`Section ${layout.sections.length + 1}`)],
});

export const deleteSectionFromLayout = (layout: PageLayout, sectionId: string): PageLayout => {
  const nextSections = layout.sections.filter((section) => section.id !== sectionId);
  if (nextSections.length === layout.sections.length) {
    return layout;
  }

  return {
    ...layout,
    sections: nextSections,
  };
};

export const addRowToLayout = (layout: PageLayout, sectionId: string): PageLayout => {
  let changed = false;

  const nextSections = layout.sections.map((section) => {
    if (section.id !== sectionId) {
      return section;
    }

    changed = true;
    return {
      ...section,
      rows: [...section.rows, createRow()],
    };
  });

  return changed ? { ...layout, sections: nextSections } : layout;
};

export const deleteRowFromLayout = (
  layout: PageLayout,
  sectionId: string,
  rowId: string
): PageLayout => {
  let changed = false;

  const nextSections = layout.sections.map((section) => {
    if (section.id !== sectionId) {
      return section;
    }

    const nextRows = section.rows.filter((row) => row.id !== rowId);
    if (nextRows.length === section.rows.length) {
      return section;
    }

    changed = true;
    return {
      ...section,
      rows: nextRows,
    };
  });

  return changed ? { ...layout, sections: nextSections } : layout;
};

export const addColumnToLayout = (
  layout: PageLayout,
  sectionId: string,
  rowId: string
): PageLayout => {
  let changed = false;

  const nextSections = layout.sections.map((section) => {
    if (section.id !== sectionId) {
      return section;
    }

    return {
      ...section,
      rows: section.rows.map((row) => {
        if (row.id !== rowId) {
          return row;
        }

        changed = true;
        return {
          ...row,
          columns: [...row.columns, createColumn(6)],
        };
      }),
    };
  });

  return changed ? { ...layout, sections: nextSections } : layout;
};

export const deleteColumnFromLayout = (
  layout: PageLayout,
  sectionId: string,
  rowId: string,
  columnId: string
): PageLayout => {
  let changed = false;

  const nextSections = layout.sections.map((section) => {
    if (section.id !== sectionId) {
      return section;
    }

    return {
      ...section,
      rows: section.rows.map((row) => {
        if (row.id !== rowId) {
          return row;
        }

        const nextColumns = row.columns.filter((column) => column.id !== columnId);
        if (nextColumns.length === row.columns.length) {
          return row;
        }

        changed = true;
        return {
          ...row,
          columns: nextColumns,
        };
      }),
    };
  });

  return changed ? { ...layout, sections: nextSections } : layout;
};

export const setColumnSpanInLayout = (
  layout: PageLayout,
  sectionId: string,
  rowId: string,
  columnId: string,
  span: number
): PageLayout => {
  let changed = false;

  const nextSections = layout.sections.map((section) => {
    if (section.id !== sectionId) {
      return section;
    }

    return {
      ...section,
      rows: section.rows.map((row) => {
        if (row.id !== rowId) {
          return row;
        }

        return {
          ...row,
          columns: row.columns.map((column) => {
            if (column.id !== columnId) {
              return column;
            }

            const nextSpan = clampSpan(span);
            if (column.span === nextSpan) {
              return column;
            }

            changed = true;
            return {
              ...column,
              span: nextSpan,
            };
          }),
        };
      }),
    };
  });

  return changed ? { ...layout, sections: nextSections } : layout;
};

export const addComponentToColumnInLayout = (
  layout: PageLayout,
  columnId: string,
  type: ComponentType,
  targetIndex?: number
): PageLayout => {
  let changed = false;

  const nextSections = layout.sections.map((section) => ({
    ...section,
    rows: section.rows.map((row) => ({
      ...row,
      columns: row.columns.map((column) => {
        if (column.id !== columnId) {
          return column;
        }

        const nextComponents = [...column.components];
        const boundedIndex = Math.max(
          0,
          Math.min(targetIndex ?? nextComponents.length, nextComponents.length)
        );
        nextComponents.splice(boundedIndex, 0, createDefaultComponent(type));
        changed = true;

        return {
          ...column,
          components: nextComponents,
        };
      }),
    })),
  }));

  return changed ? { ...layout, sections: nextSections } : layout;
};

export const moveComponentInLayout = (
  layout: PageLayout,
  sourceColumnId: string,
  targetColumnId: string,
  componentId: string,
  targetIndex: number
): PageLayout => {
  if (sourceColumnId === targetColumnId) {
    const sourceColumn = layout.sections
      .flatMap((section) => section.rows)
      .flatMap((row) => row.columns)
      .find((column) => column.id === sourceColumnId);

    if (sourceColumn) {
      const currentIndex = sourceColumn.components.findIndex(
        (component) => component.id === componentId
      );
      if (currentIndex >= 0 && currentIndex === targetIndex) {
        return layout;
      }
    }
  }

  let movedComponent: BuilderComponent | null = null;
  let insertedComponent = false;

  const removed = layout.sections.map((section) => ({
    ...section,
    rows: section.rows.map((row) => ({
      ...row,
      columns: row.columns.map((column) => {
        if (column.id !== sourceColumnId) {
          return column;
        }

        const nextComponents = column.components.filter((component) => {
          const match = component.id === componentId;
          if (match) {
            movedComponent = component;
          }
          return !match;
        });

        return {
          ...column,
          components: nextComponents,
        };
      }),
    })),
  }));

  if (!movedComponent) {
    return layout;
  }

  const inserted = removed.map((section) => ({
    ...section,
    rows: section.rows.map((row) => ({
      ...row,
      columns: row.columns.map((column) => {
        if (column.id !== targetColumnId) {
          return column;
        }

        const boundedIndex = Math.max(0, Math.min(targetIndex, column.components.length));
        const next = [...column.components];
        next.splice(boundedIndex, 0, movedComponent as BuilderComponent);
        insertedComponent = true;

        return {
          ...column,
          components: next,
        };
      }),
    })),
  }));

  if (!insertedComponent) {
    return layout;
  }

  return {
    ...layout,
    sections: inserted,
  };
};

export const removeComponentFromLayout = (
  layout: PageLayout,
  columnId: string,
  componentId: string
): PageLayout => {
  let changed = false;

  const nextSections = layout.sections.map((section) => ({
    ...section,
    rows: section.rows.map((row) => ({
      ...row,
      columns: row.columns.map((column) => {
        if (column.id !== columnId) {
          return column;
        }

        const nextComponents = column.components.filter(
          (component) => component.id !== componentId
        );
        if (nextComponents.length === column.components.length) {
          return column;
        }

        changed = true;
        return {
          ...column,
          components: nextComponents,
        };
      }),
    })),
  }));

  return changed ? { ...layout, sections: nextSections } : layout;
};

export const updateComponentInLayout = (
  layout: PageLayout,
  componentId: string,
  update: ComponentUpdate
): PageLayout => {
  let changed = false;

  const nextSections = layout.sections.map((section) => ({
    ...section,
    rows: section.rows.map((row) => ({
      ...row,
      columns: row.columns.map((column) => ({
        ...column,
        components: column.components.map((component) => {
          if (component.id !== componentId) {
            return component;
          }

          if (component.type !== update.type) {
            return component;
          }

          changed = true;
          return { ...component, ...update.patch } as BuilderComponent;
        }),
      })),
    })),
  }));

  return changed ? { ...layout, sections: nextSections } : layout;
};
