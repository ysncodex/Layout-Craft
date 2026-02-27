import { PageLayout } from './types';

export type LoadLayoutResult = {
  layout: PageLayout | null;
  repaired: boolean;
  malformed: boolean;
};

export interface LayoutRepository {
  loadLayout: () => LoadLayoutResult;
  saveLayout: (layout: PageLayout) => boolean;
}
