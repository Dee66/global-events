import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NifiService {
  private readonly nifiBaseUrl: string;

  constructor() {
    this.nifiBaseUrl = process.env.NIFI_BASE_URL || 'http://nifi:8080/nifi-api';
  }

  async sendData(flowId: string, data: any): Promise<any> {
    const url = `${this.nifiBaseUrl}/process-groups/${flowId}/data`;
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send data to NiFi: ${error instanceof Error ? error.message : error}`);
    }
  }

  async receiveData(flowId: string): Promise<any> {
    const url = `${this.nifiBaseUrl}/process-groups/${flowId}/data`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to receive data from NiFi: ${error instanceof Error ? error.message : error}`);
    }
  }
}