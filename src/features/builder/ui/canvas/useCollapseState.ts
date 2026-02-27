'use client';

import { useCallback, useMemo, useState } from 'react';

export const useCollapseState = () => {
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [collapsedRows, setCollapsedRows] = useState<Record<string, boolean>>({});

  const sectionCollapseState = useMemo(() => collapsedSections, [collapsedSections]);
  const rowCollapseState = useMemo(() => collapsedRows, [collapsedRows]);

  const toggleSection = useCallback((sectionId: string) => {
    setCollapsedSections((previous) => ({
      ...previous,
      [sectionId]: !previous[sectionId],
    }));
  }, []);

  const toggleRow = useCallback((rowId: string) => {
    setCollapsedRows((previous) => ({
      ...previous,
      [rowId]: !previous[rowId],
    }));
  }, []);

  return {
    sectionCollapseState,
    rowCollapseState,
    toggleSection,
    toggleRow,
  };
};
