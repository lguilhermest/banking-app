export enum WebhookEvent {
  PixCashInCompleted = "PixCashInCompleted",
  PixCashOutCompleted = "PixCashOutCompleted",
  PixCashOutRefunded = "PixCashOutRefunded",
  PixCashInRefunded = "PixCashInRefunded",
}

export interface WebhookFormData {
  event: WebhookEvent;
  url: string;
  secret?: string;
}

export interface Webhook {
  id: number;
  event: WebhookEvent;
  url: string;
  account_id: number;
  created_at: string;
  updated_at: string;
}
