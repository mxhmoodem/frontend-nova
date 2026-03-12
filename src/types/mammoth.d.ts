declare module 'mammoth' {
  export interface ConvertToHtmlResult {
    value: string;
    messages: Array<{
      type: string;
      message: string;
    }>;
  }

  export interface ConvertToMarkdownResult {
    value: string;
    messages: Array<{
      type: string;
      message: string;
    }>;
  }

  export interface Options {
    arrayBuffer?: ArrayBuffer;
    path?: string;
  }

  export function convertToHtml(options: Options): Promise<ConvertToHtmlResult>;
  export function convertToMarkdown(
    options: Options
  ): Promise<ConvertToMarkdownResult>;
  export function extractRawText(options: Options): Promise<{ value: string }>;
}
