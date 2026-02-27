'use client';

import { BuilderComponent } from '../model/types';
import {
  RenderContext,
  renderButtonComponent,
  renderGalleryComponent,
  renderIconTextComponent,
  renderImageComponent,
  renderInputFieldComponent,
  renderPillComponent,
  renderPriceTagComponent,
  renderRatingStarsComponent,
  renderSpacerComponent,
  renderTextComponent,
} from './componentRenderer/renderHelpers';

export const ComponentRenderer = ({
  component,
  previewOnly,
  sectionName,
  rowIndex,
  componentIndex,
}: {
  component: BuilderComponent;
  previewOnly: boolean;
  sectionName?: string;
  rowIndex?: number;
  componentIndex?: number;
}) => {
  const renderContext: RenderContext = {
    sectionName,
    rowIndex,
    componentIndex,
    previewOnly,
  };

  if (component.type === 'text') {
    return renderTextComponent(component, renderContext);
  }

  if (component.type === 'button') {
    return renderButtonComponent(component, renderContext);
  }

  if (component.type === 'ratingStars') {
    return renderRatingStarsComponent(component);
  }

  if (component.type === 'image') {
    return renderImageComponent(component, renderContext);
  }

  if (component.type === 'gallery') {
    return renderGalleryComponent(component);
  }

  if (component.type === 'pill') {
    return renderPillComponent(component, renderContext);
  }

  if (component.type === 'inputField') {
    return renderInputFieldComponent(component);
  }

  if (component.type === 'iconText') {
    return renderIconTextComponent(component, renderContext);
  }

  if (component.type === 'priceTag') {
    return renderPriceTagComponent(component);
  }

  return renderSpacerComponent(component);
};
