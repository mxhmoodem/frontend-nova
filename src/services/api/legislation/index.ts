/**
 * Legislation Module
 * ==================
 * API integration for legislation/regulatory data.
 * Used by: RegulatoryRadar page
 */

// Types
export type { Legislation, LegislationList } from './legislation.types';

// API
export { legislationApi } from './legislation.api';

// Keys
export { legislationKeys } from './legislation.keys';

// Hooks
export { useLegislation, useLegislationDetail } from './legislation.hooks';
