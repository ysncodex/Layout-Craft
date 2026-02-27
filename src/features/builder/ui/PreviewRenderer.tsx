import React from 'react';
import { PageLayout } from '../model/types';
import { ComponentRenderer } from './ComponentRenderer';

export const PreviewRenderer = ({ layout }: { layout: PageLayout }) => {
  if (!layout.sections || layout.sections.length === 0) {
    return (
      <div className="mx-auto w-full max-w-6xl rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        Layout is empty or malformed. Return to editor and load a valid template.
      </div>
    );
  }

  const getSectionClasses = (sectionName: string) => {
    const name = sectionName.toLowerCase();

    if (name === 'hero') {
      return 'overflow-hidden rounded-none border-0 bg-slate-900 p-0 shadow-none';
    }

    if (name === 'footer') {
      return 'rounded-none border-0 bg-[#f2f2f2] p-6 shadow-none';
    }

    if (name === 'recommended' || name === 'destinations') {
      return 'rounded-none border-0 bg-white px-6 py-8 shadow-none';
    }

    return 'rounded-none border-0 bg-slate-100 px-6 py-8 shadow-none';
  };

  const getColumnClasses = (sectionName: string, rowIndex: number, columnIndex: number) => {
    const name = sectionName.toLowerCase();

    if (name === 'hero') {
      if (rowIndex === 0) {
        if (columnIndex === 0) {
          return 'min-w-0 border-0 bg-transparent p-0 flex items-center justify-start';
        }

        if (columnIndex === 1 || columnIndex === 2) {
          return 'min-w-0 border-0 bg-transparent p-0 flex items-center justify-center';
        }

        if (columnIndex === 3) {
          return 'min-w-0 border-0 bg-transparent p-0 flex items-center justify-end';
        }

        if (columnIndex === 4) {
          return 'min-w-0 border-0 bg-transparent p-0 flex items-center justify-end';
        }

        if (columnIndex === 5) {
          return 'min-w-0 border-0 bg-transparent p-0 flex items-center justify-end';
        }

        return 'min-w-0 border-0 bg-transparent p-0 flex items-center justify-end';
      }

      return 'min-w-0 border-0 bg-transparent p-0';
    }

    if (name === 'offers' && rowIndex === 1) {
      return 'min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm';
    }

    if (name === 'offers' && rowIndex === 2) {
      return 'min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm';
    }

    if (name === 'recommended' && rowIndex === 1) {
      return 'min-w-0 border-0 bg-transparent p-0 text-center';
    }

    if (name === 'recommended' && rowIndex > 1) {
      return 'min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm';
    }

    if (name === 'destinations' && rowIndex === 1) {
      return 'min-w-0 rounded-2xl border border-slate-200 bg-white p-3 text-center';
    }

    if (name === 'footer') {
      return 'min-w-0 border-0 bg-transparent p-0 text-slate-700';
    }

    if (name === 'recommended' && rowIndex === 0 && columnIndex === 0) {
      return 'min-w-0 border-0 bg-transparent p-0 text-center';
    }

    return 'min-w-0 border-0 bg-transparent p-0';
  };

  const isHeroSearchRow = (sectionName: string, rowIndex: number) => {
    return sectionName.toLowerCase() === 'hero' && rowIndex === 5;
  };

  const isRecommendedCategoryRow = (sectionName: string, rowIndex: number) => {
    return sectionName.toLowerCase() === 'recommended' && rowIndex === 1;
  };

  const isHeroCategoryIconRow = (sectionName: string, rowIndex: number) => {
    return sectionName.toLowerCase() === 'hero' && rowIndex === 4;
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-0 bg-white">
      {layout.sections.map((section) => (
        <section key={section.id} className={getSectionClasses(section.name)}>
          {!section.rows || section.rows.length === 0 ? (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
              Section &quot;{section.name}&quot; has no valid rows.
            </div>
          ) : null}

          {section.rows.map((row, rowIndex) => (
            <div
              key={row.id}
              className={`${isHeroSearchRow(section.name, rowIndex) ? 'mb-0 flex flex-wrap items-end justify-center gap-4 px-6 pb-4 md:px-8' : isRecommendedCategoryRow(section.name, rowIndex) ? 'mb-4 flex flex-wrap items-center justify-center gap-2.5' : isHeroCategoryIconRow(section.name, rowIndex) ? 'mb-2 flex flex-wrap items-center justify-center gap-3' : `grid grid-cols-12 ${section.name.toLowerCase() === 'hero' && rowIndex === 0 ? 'gap-2' : 'gap-4'} ${section.name.toLowerCase() === 'hero' ? (rowIndex === 0 ? 'mb-0 items-center bg-slate-950 px-6 py-1.5 md:px-8' : 'mb-2 last:mb-0') : 'mb-4 last:mb-0'}`}`}
            >
              {!row.columns || row.columns.length === 0 ? (
                <div className="col-span-12 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                  Row {rowIndex + 1} in &quot;{section.name}&quot; has no columns.
                </div>
              ) : null}

              {row.columns.map((column, columnIndex) => (
                <div
                  key={column.id}
                  style={
                    isHeroSearchRow(section.name, rowIndex) ||
                    isRecommendedCategoryRow(section.name, rowIndex) ||
                    isHeroCategoryIconRow(section.name, rowIndex)
                      ? undefined
                      : { gridColumn: `span ${column.span} / span ${column.span}` }
                  }
                  className={`${getColumnClasses(section.name, rowIndex, columnIndex)} ${isHeroSearchRow(section.name, rowIndex) ? (columnIndex < 4 ? 'w-full max-w-45' : 'w-auto') : ''} ${isRecommendedCategoryRow(section.name, rowIndex) ? 'w-auto' : ''} ${isHeroCategoryIconRow(section.name, rowIndex) ? 'w-auto min-w-24' : ''}`}
                >
                  <div className="space-y-2.5">
                    {column.components.map((component, componentIndex) => (
                      <ComponentRenderer
                        key={component.id}
                        component={component}
                        previewOnly
                        sectionName={section.name}
                        rowIndex={rowIndex}
                        componentIndex={componentIndex}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};
