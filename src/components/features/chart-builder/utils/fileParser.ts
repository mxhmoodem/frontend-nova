/**
 * File Parser Utilities
 * Handles parsing of CSV, XLSX, and JSON files
 */

import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { ParsedData } from '../types';

export const parseCSV = (file: File): Promise<ParsedData> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const columns = results.meta.fields || [];
        const rows = results.data as Record<string, unknown>[];
        const preview = rows.slice(0, 10);

        resolve({
          columns,
          rows,
          preview,
        });
      },
      error: (error) => {
        reject(new Error(`CSV parsing failed: ${error.message}`));
      },
    });
  });
};

export const parseXLSX = (file: File): Promise<ParsedData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: null,
        }) as unknown[][];

        if (jsonData.length === 0) {
          reject(new Error('Excel file is empty'));
          return;
        }

        const columns = jsonData[0].map((col: unknown) => String(col));
        const dataRows = jsonData.slice(1);

        const rows = dataRows.map((row) => {
          const obj: Record<string, unknown> = {};
          columns.forEach((col, index) => {
            obj[col] = row[index];
          });
          return obj;
        });

        const preview = rows.slice(0, 10);

        resolve({
          columns,
          rows,
          preview,
        });
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        reject(new Error(`Excel parsing failed: ${message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsArrayBuffer(file);
  });
};

export const parseJSON = (file: File): Promise<ParsedData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);

        if (!Array.isArray(jsonData)) {
          reject(new Error('JSON must be an array of objects'));
          return;
        }

        if (jsonData.length === 0) {
          reject(new Error('JSON file is empty'));
          return;
        }

        const columns = Object.keys(jsonData[0]);
        const rows = jsonData;
        const preview = rows.slice(0, 10);

        resolve({
          columns,
          rows,
          preview,
        });
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        reject(new Error(`JSON parsing failed: ${message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

export const parseFile = async (file: File): Promise<ParsedData> => {
  const extension = file.name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'csv':
      return parseCSV(file);
    case 'xlsx':
    case 'xls':
      return parseXLSX(file);
    case 'json':
      return parseJSON(file);
    default:
      throw new Error(`Unsupported file type: ${extension}`);
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const validateFile = (
  file: File
): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['csv', 'xlsx', 'xls', 'json'];
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (!extension || !allowedTypes.includes(extension)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload CSV, XLSX, or JSON files.',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 10MB limit.',
    };
  }

  return { valid: true };
};
