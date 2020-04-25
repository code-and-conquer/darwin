export enum FeedbackType {
  ERROR = 'error',
  INFO = 'info',
}

export interface Feedback {
  type: FeedbackType;
  content: unknown[];
}
