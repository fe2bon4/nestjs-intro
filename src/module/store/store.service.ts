import { Injectable } from '@nestjs/common';
import { CommonDictionary, Store, StoreItem } from './types';
import { v4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StoreService {
  constructor(private readonly configService: ConfigService) {}
  private store: Store = {
    state: [],
  };

  async createTable(id: string): Promise<string> {
    this.store[id] = [];
    return id;
  }

  async insert<T = CommonDictionary>(
    table_id: string,
    item: Partial<StoreItem<T>>,
  ): Promise<string> {
    const date = new Date().getTime();

    item.id = item.id || v4();
    item.created_date = date;
    item.updated_date = date;
    this.store[table_id].push(item as StoreItem<T>);
    return item.id;
  }

  async get<T = CommonDictionary>(
    table_id: string,
    id: string,
  ): Promise<StoreItem<T> | null> {
    return this.store[table_id].find((item) => item.id === id);
  }

  async delete(table_id: string, id: string): Promise<string | null> {
    this.store[table_id] = this.store[table_id].filter(
      (item) => item.id === id,
    );
    return id;
  }
}
