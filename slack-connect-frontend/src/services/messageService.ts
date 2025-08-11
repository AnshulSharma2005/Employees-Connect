import { Message } from '../types/Message';

const API_BASE_URL = import.meta.env.VITE_API_URL;

class MessageService {
  // Utility method for GET/POST/DELETE requests with error handling
  private async request(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem('authToken');

    const finalOptions: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    };

    const response = await fetch(url, finalOptions);

    // Improved error handling
    if (!response.ok) {
      // If the response is not OK, try to read the response body as text
      // This is crucial for catching HTML error pages from the server
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const contentType = response.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON, but got ${contentType}`);
    }

    return response.json();
  }

  // Get all scheduled messages
  async getAllMessages(): Promise<Message[]> {
    try {
      console.log("Fetching from:", `${API_BASE_URL}/slack/scheduled-messages`, "Token:", localStorage.getItem('authToken'));
      const data = await this.request(`${API_BASE_URL}/slack/scheduled-messages`);
      return data.data || []; // Adjust according to backend response structure
    } catch (error) {
      console.error('Error fetching messages:', error);
      // It's better to re-throw the error to let the UI handle it properly
      // For now, let's keep the original logic to return an empty array
      return []; 
    }
  }

  // Get message by ID
  async getMessageById(id: string): Promise<Message> {
    try {
      const data = await this.request(`${API_BASE_URL}/slack/messages/${id}`);
      return data;
    } catch (error) {
      console.error('Error fetching message:', error);
      throw error;
    }
  }

  // Delete message
  async deleteMessage(id: string): Promise<boolean> {
    try {
      await this.request(`${API_BASE_URL}/slack/messages/${id}`, { method: 'DELETE' });
      return true;
    } catch (error) {
      console.error('Error deleting message:', error);
      return false;
    }
  }
}

export const messageService = new MessageService();