export type MarketFileType = 'pdf' | 'docx' | 'csv' | 'xlsx' | 'pptx';

export interface MarketItem {
  id: string;
  title: string;
  description?: string | null;
  source: string;
  file_type: MarketFileType;
  created_at: string;
  updated_at: string;
}

export interface MarketListResponse {
  data: MarketItem[];
  count: number;
}

export interface MarketObject {
  id: string;
  bucket: string;
  key: string;
  metadata: Record<string, string>;
  content_type?: string | null;
  content_base64: string;
}

export interface MarketObjectResponse {
  data: MarketObject;
}
