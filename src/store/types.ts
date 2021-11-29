export enum EStoreItemStatus {
  DRAFT,
  ACTIVE,
  INACTIVE,
  ARCHIVED,
}

export type StoreItem<T extends Record<string, any> = any> = {
  id: string;
  created_date: number;
  updated_date: number;
  status: EStoreItemStatus;
  attribute: T;
};

export type Store = {
  [key: string]: Array<StoreItem<any>>;
};

export type CommonDictionary = Record<string, any>;
