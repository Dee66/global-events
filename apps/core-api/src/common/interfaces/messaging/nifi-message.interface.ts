export interface NifiMessage {
  flowFileId: string;
  attributes: Record<string, any>;
  content: Buffer | string;
  timestamp?: string;
}