'use client';

import React from 'react';
import { Section } from '../../model/types';
import { ColumnDropZone } from './ColumnDropZone';
import { RowHeader } from './RowHeader';
import { RowDropSurface } from './RowDropSurface';
import { SectionHeader } from './SectionHeader';
import { SectionDropSurface } from './SectionDropSurface';

type CollapseMap = Record<string, boolean>;

export const CanvasSectionList = ({
  sections,
  sectionCollapseState,
  rowCollapseState,
  onToggleSection,
  onToggleRow,
  onAddRow,
  onDeleteSection,
  onAddColumn,
  onDeleteRow,
}: {
  sections: Section[];
  sectionCollapseState: CollapseMap;
  rowCollapseState: CollapseMap;
  onToggleSection: (sectionId: string) => void;
  onToggleRow: (rowId: string) => void;
  onAddRow: (sectionId: string) => void;
  onDeleteSection: (sectionId: string) => void;
  onAddColumn: (sectionId: string, rowId: string) => void;
  onDeleteRow: (sectionId: string, rowId: string) => void;
}) => {
  return (
    <>
      {sections.map((section) => (
        <React.Fragment key={section.id}>
          <SectionDropSurface sectionId={section.id}>
            <SectionHeader
              section={section}
              collapsed={!!sectionCollapseState[section.id]}
              onToggle={() => onToggleSection(section.id)}
              onAddRow={() => onAddRow(section.id)}
              onDelete={() => onDeleteSection(section.id)}
            />

            {!sectionCollapseState[section.id] && (
              <div className="space-y-3">
                {section.rows.map((row, rowIndex) => (
                  <RowDropSurface key={row.id} sectionId={section.id} rowId={row.id}>
                    <RowHeader
                      row={row}
                      rowIndex={rowIndex}
                      collapsed={!!rowCollapseState[row.id]}
                      onToggle={() => onToggleRow(row.id)}
                      onAddColumn={() => onAddColumn(section.id, row.id)}
                      onDelete={() => onDeleteRow(section.id, row.id)}
                    />

                    {!rowCollapseState[row.id] && (
                      <div className="grid grid-cols-12 gap-2">
                        {row.columns.map((column) => (
                          <ColumnDropZone
                            key={column.id}
                            sectionId={section.id}
                            rowId={row.id}
                            column={column}
                          />
                        ))}
                      </div>
                    )}
                  </RowDropSurface>
                ))}
              </div>
            )}
          </SectionDropSurface>
        </React.Fragment>
      ))}
    </>
  );
};
