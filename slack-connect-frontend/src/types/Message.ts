export interface Message {
  id?: string | number;
  text?: string;
  user?: string;
  channel?: string;
  timestamp?: string | number;
  createdAt?: string;
  updatedAt?: string;
}