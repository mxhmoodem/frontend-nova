/**
 * Legislation Module Types
 * ========================
 * Type definitions for legislation data.
 * Used by: RegulatoryRadar page
 */

import type { FileType } from '../shared';

/**
 * Legislation document
 */
export interface Legislation {
  id: string;
  title: string;
  description: string | null;
  source: string;
  file_type: FileType;
  created_at: string;
  updated_at: string;
}

/**
 * List of legislation documents
 */
export type LegislationList = Legislation[];
