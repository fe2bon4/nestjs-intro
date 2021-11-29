import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
enum EStoreItemStatus {
  DRAFT,
  ACTIVE,
  INACTIVE,
  ARCHIVED,
}

type StoreItem<T extends Record<string, any> = any> = {
  id: string;
  created_date: number;
  updated_date: number;
  status: EStoreItemStatus;
  attribute: T;
};

type Store = {
  [key: string]: Array<StoreItem<any>>;
};

type CommonDictionary = Record<string, any>;

@Injectable()
export class StoreService {
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
