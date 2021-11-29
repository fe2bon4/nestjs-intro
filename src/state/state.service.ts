import { Injectable } from '@nestjs/common';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class StateService {
  constructor(private readonly store: StoreService) {}
  get(id: string): any {
    return this.store.get('state', id);
  }

  put(id: string): any {
    return this.store.insert('state', { id });
  }

  delete(id: string): any {
    return this.store.delete('state', id);
  }
}
