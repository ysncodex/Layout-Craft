'use client';

import React, { useEffect } from 'react';
import {
  CollisionDetection,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { BuilderTopbar } from './BuilderTopbar';
import { ComponentPalette } from './ComponentPalette';
import { BuilderCanvas } from './BuilderCanvas';
import { parseDragData } from './dnd';
import { useBuilderStore } from '../store/useBuilderStore';
import {
  findComponentLocation,
  findDefaultColumnInRow,
  findDefaultColumnInSection,
  isDropAfter,
} from './builderDndUtils';

export const BuilderApp = () => {
  const layout = useBuilderStore((state) => state.layout);
  const addComponentToColumn = useBuilderStore((state) => state.addComponentToColumn);
  const moveComponent = useBuilderStore((state) => state.moveComponent);
  const loadLayout = useBuilderStore((state) => state.loadLayout);

  useEffect(() => {
    loadLayout();
  }, [loadLayout]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const collisionDetection: CollisionDetection = (args) => {
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) {
      const activeData = parseDragData(args.active.data.current);

      if (activeData?.kind === 'palette' || activeData?.kind === 'component') {
        const insertCollisions = pointerCollisions.filter((collision) => {
          const container = args.droppableContainers.find((entry) => entry.id === collision.id);
          const data = parseDragData(container?.data.current);
          return data?.kind === 'insert';
        });

        if (insertCollisions.length > 0) {
          return insertCollisions;
        }

        const componentCollisions = pointerCollisions.filter((collision) => {
          const container = args.droppableContainers.find((entry) => entry.id === collision.id);
          const data = parseDragData(container?.data.current);
          return data?.kind === 'component';
        });

        if (componentCollisions.length > 0) {
          return componentCollisions;
        }

        const columnCollisions = pointerCollisions.filter((collision) => {
          const container = args.droppableContainers.find((entry) => entry.id === collision.id);
          const data = parseDragData(container?.data.current);
          return data?.kind === 'column';
        });

        if (columnCollisions.length > 0) {
          return columnCollisions;
        }

        const rowCollisions = pointerCollisions.filter((collision) => {
          const container = args.droppableContainers.find((entry) => entry.id === collision.id);
          const data = parseDragData(container?.data.current);
          return data?.kind === 'row';
        });

        if (rowCollisions.length > 0) {
          return rowCollisions;
        }

        const sectionCollisions = pointerCollisions.filter((collision) => {
          const container = args.droppableContainers.find((entry) => entry.id === collision.id);
          const data = parseDragData(container?.data.current);
          return data?.kind === 'section';
        });

        if (sectionCollisions.length > 0) {
          return sectionCollisions;
        }
      }

      return pointerCollisions;
    }
    return closestCenter(args);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeData = parseDragData(active.data.current);
    const overData = parseDragData(over.data.current);

    if (!activeData) return;

    if (activeData.kind === 'palette') {
      const targetColumnId =
        overData?.kind === 'insert'
          ? overData.columnId
          : overData?.kind === 'column'
            ? overData.columnId
            : overData?.kind === 'component'
              ? overData.columnId
              : overData?.kind === 'row'
                ? (findDefaultColumnInRow(layout, overData.rowId)?.id ?? null)
                : overData?.kind === 'section'
                  ? (findDefaultColumnInSection(layout, overData.sectionId)?.id ?? null)
                  : null;

      if (!targetColumnId) return;

      let targetIndex: number | undefined;

      if (overData?.kind === 'insert') {
        targetIndex = overData.index;
      } else if (overData?.kind === 'component') {
        const overLocation = findComponentLocation(layout, overData.componentId);
        if (overLocation) {
          const insertAfter = isDropAfter(event);
          targetIndex = overLocation.index + (insertAfter ? 1 : 0);
        }
      } else if (overData?.kind === 'row') {
        const defaultColumn = findDefaultColumnInRow(layout, overData.rowId);
        targetIndex = defaultColumn?.components.length ?? 0;
      } else if (overData?.kind === 'section') {
        const defaultColumn = findDefaultColumnInSection(layout, overData.sectionId);
        targetIndex = defaultColumn?.components.length ?? 0;
      }

      addComponentToColumn(targetColumnId, activeData.componentType, targetIndex);
      return;
    }

    if (activeData.kind === 'component') {
      const sourceColumnId = activeData.columnId;
      const sourceComponentId = activeData.componentId;

      let targetColumnId = sourceColumnId;
      let targetIndex = 0;

      if (overData?.kind === 'insert') {
        targetColumnId = overData.columnId;
        targetIndex = overData.index;
      } else if (overData?.kind === 'column') {
        targetColumnId = overData.columnId;
        const targetColumn = layout.sections
          .flatMap((section) => section.rows)
          .flatMap((row) => row.columns)
          .find((column) => column.id === targetColumnId);
        targetIndex = targetColumn?.components.length ?? 0;
      } else if (overData?.kind === 'component') {
        targetColumnId = overData.columnId;
        const location = findComponentLocation(layout, overData.componentId);
        const insertAfter = isDropAfter(event);
        targetIndex = location ? location.index + (insertAfter ? 1 : 0) : 0;
      } else if (overData?.kind === 'row') {
        const defaultColumn = findDefaultColumnInRow(layout, overData.rowId);
        if (!defaultColumn) return;
        targetColumnId = defaultColumn.id;
        targetIndex = defaultColumn.components.length;
      } else if (overData?.kind === 'section') {
        const defaultColumn = findDefaultColumnInSection(layout, overData.sectionId);
        if (!defaultColumn) return;
        targetColumnId = defaultColumn.id;
        targetIndex = defaultColumn.components.length;
      } else {
        return;
      }

      const sourceLocation = findComponentLocation(layout, sourceComponentId);
      if (!sourceLocation) return;

      const adjustedIndex =
        sourceColumnId === targetColumnId && sourceLocation.index < targetIndex
          ? targetIndex - 1
          : targetIndex;

      moveComponent(sourceColumnId, targetColumnId, sourceComponentId, adjustedIndex);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-slate-100">
      <BuilderTopbar />

      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragEnd={handleDragEnd}
      >
        <div className="flex min-h-0 flex-1">
          <ComponentPalette />
          <BuilderCanvas />
        </div>
      </DndContext>
    </div>
  );
};
