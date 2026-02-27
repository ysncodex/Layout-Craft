import React from 'react';
import { BuilderComponent, ComponentUpdate } from '../../model/types';

type UpdateComponentFn = (componentId: string, update: ComponentUpdate) => void;

export const renderComponentEditorFields = (
  component: BuilderComponent,
  updateComponent: UpdateComponentFn
) => {
  const stopClick = (event: React.MouseEvent) => event.stopPropagation();

  if (component.type === 'text') {
    return (
      <input
        className="h-8 w-full rounded border border-slate-300 px-2 text-[13px]"
        value={component.text}
        onChange={(event) =>
          updateComponent(component.id, {
            type: 'text',
            patch: { text: event.target.value },
          })
        }
        onClick={stopClick}
      />
    );
  }

  if (component.type === 'button') {
    return (
      <div className="grid gap-2" onClick={stopClick}>
        <input
          className="h-8 rounded border border-slate-300 px-2 text-[13px]"
          value={component.label}
          onChange={(event) =>
            updateComponent(component.id, {
              type: 'button',
              patch: { label: event.target.value },
            })
          }
          placeholder="Button label"
        />
        <input
          className="h-8 rounded border border-slate-300 px-2 text-[13px]"
          value={component.url}
          onChange={(event) =>
            updateComponent(component.id, {
              type: 'button',
              patch: { url: event.target.value },
            })
          }
          placeholder="https://example.com"
        />
        <select
          className="h-8 rounded border border-slate-300 px-2 text-[13px]"
          value={component.variant}
          onChange={(event) =>
            updateComponent(component.id, {
              type: 'button',
              patch: {
                variant: event.target.value as 'primary' | 'success' | 'ghost',
              },
            })
          }
        >
          <option value="primary">Primary</option>
          <option value="success">Success</option>
          <option value="ghost">Ghost</option>
        </select>
        <select
          className="h-8 rounded border border-slate-300 px-2 text-[13px]"
          value={component.size}
          onChange={(event) =>
            updateComponent(component.id, {
              type: 'button',
              patch: {
                size: event.target.value as 'sm' | 'md',
              },
            })
          }
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
        </select>
      </div>
    );
  }

  if (component.type === 'ratingStars') {
    return (
      <div className="grid gap-2" onClick={stopClick}>
        <input
          type="number"
          min={0}
          max={5}
          className="h-8 rounded border border-slate-300 px-2 text-[13px]"
          value={component.rating}
          onChange={(event) =>
            updateComponent(component.id, {
              type: 'ratingStars',
              patch: {
                rating: Number(event.target.value),
              },
            })
          }
          placeholder="Rating"
        />
        <input
          type="number"
          min={1}
          max={10}
          className="h-8 rounded border border-slate-300 px-2 text-[13px]"
          value={component.count}
          onChange={(event) =>
            updateComponent(component.id, {
              type: 'ratingStars',
              patch: {
                count: Number(event.target.value),
              },
            })
          }
          placeholder="Count"
        />
      </div>
    );
  }

  if (component.type === 'spacer') {
    return (
      <input
        type="number"
        min={4}
        max={200}
        className="h-8 w-full rounded border border-slate-300 px-2 text-[13px]"
        value={component.height}
        onChange={(event) =>
          updateComponent(component.id, {
            type: 'spacer',
            patch: { height: Number(event.target.value) },
          })
        }
        onClick={stopClick}
      />
    );
  }

  if (component.type === 'pill') {
    return (
      <div className="grid gap-2" onClick={stopClick}>
        <input
          className="h-8 rounded border border-slate-300 px-2 text-[13px]"
          value={component.label}
          onChange={(event) =>
            updateComponent(component.id, {
              type: 'pill',
              patch: { label: event.target.value },
            })
          }
          placeholder="Label"
        />
        <select
          className="h-8 rounded border border-slate-300 px-2 text-[13px]"
          value={component.tone}
          onChange={(event) =>
            updateComponent(component.id, {
              type: 'pill',
              patch: {
                tone: event.target.value as 'default' | 'active',
              },
            })
          }
        >
          <option value="default">Default</option>
          <option value="active">Active</option>
        </select>
      </div>
    );
  }

  if (component.type === 'inputField') {
    return (
      <div className="grid gap-2" onClick={stopClick}>
        <input
          className="h-8 rounded border border-slate-300 px-2 text-[13px]"
          value={component.label}
          onChange={(event) =>
            updateComponent(component.id, {
              type: 'inputField',
              patch: { label: event.target.value },
            })
          }
          placeholder="Label"
        />
        <input
          className="h-8 rounded border border-slate-300 px-2 text-[13px]"
          value={component.placeholder}
          onChange={(event) =>
            updateComponent(component.id, {
              type: 'inputField',
              patch: { placeholder: event.target.value },
            })
          }
          placeholder="Placeholder"
        />
      </div>
    );
  }

  if (component.type === 'iconText') {
    return (
      <div className="grid gap-2" onClick={stopClick}>
        <input
          className="h-8 rounded border border-slate-300 px-2 text-[13px]"
          value={component.icon}
          onChange={(event) =>
            updateComponent(component.id, {
              type: 'iconText',
              patch: { icon: event.target.value },
            })
          }
          placeholder="📍"
        />
        <input
          className="h-8 rounded border border-slate-300 px-2 text-[13px]"
          value={component.text}
          onChange={(event) =>
            updateComponent(component.id, {
              type: 'iconText',
              patch: { text: event.target.value },
            })
          }
          placeholder="Los Angeles"
        />
      </div>
    );
  }

  if (component.type === 'priceTag') {
    return (
      <div className="grid gap-2" onClick={stopClick}>
        <input
          className="h-8 rounded border border-slate-300 px-2 text-[13px]"
          value={component.amount}
          onChange={(event) =>
            updateComponent(component.id, {
              type: 'priceTag',
              patch: { amount: event.target.value },
            })
          }
          placeholder="$49.00"
        />
        <input
          className="h-8 rounded border border-slate-300 px-2 text-[13px]"
          value={component.suffix}
          onChange={(event) =>
            updateComponent(component.id, {
              type: 'priceTag',
              patch: { suffix: event.target.value },
            })
          }
          placeholder="/ night"
        />
      </div>
    );
  }

  return null;
};
