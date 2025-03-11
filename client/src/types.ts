export interface WebhookResponse {
  id: string;
  event: string;
  repository: string;
  sender: string;
  timestamp: string;
  payload: any;
}