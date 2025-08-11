import { Message } from '../types/Message';

const API_BASE_URL = import.meta.env.VITE_API_URL;

class MessageService {
  async getAllMessages(): Promise<Message[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/slack/scheduled-messages`);
    console.log("Fetching from:", `${API_BASE_URL}/slack/scheduled-messages`);
    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON, got ${contentType}`);
    }

    const data = await response.json();
    return data.data || []; // match backend's { success, data }
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}

  async getMessageById(id: string): Promise<Message> {
    try {
      const response = await fetch(`${API_BASE_URL}/slack/messages/${id}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching message:', error);
      throw error;
    }
  }

  async deleteMessage(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/slack/messages/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }
}

export const messageService = new MessageService();
