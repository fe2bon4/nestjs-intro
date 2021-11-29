import { Injectable } from '@nestjs/common';
import { CommonDictionary, Store, StoreItem } from './types';
import { v4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
@Injectable()
export class StoreService {
  private client: ClientProxy;

  constructor(private readonly configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8867,
      },
    });
  }

  async createDatabase(database: string) {
    return this.client.send('createDatabase', { database });
  }

  async createTable(database: string, table: string) {
    return this.client.send('createTable', { database, table });
  }

  async list(database: string, table: string) {
    return this.client.send('listItemsFromTable', {
      database,
      table,
      order: {
        start: 0,
        limit: 50,
      },
    });
  }
}
