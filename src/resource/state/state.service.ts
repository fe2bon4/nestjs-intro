import { Injectable } from '@nestjs/common';
import { StoreService } from 'src/module/store/store.service';

@Injectable()
export class StateService {
  get(id: string): any {
    return id;
  }

  put(id: string): any {
    return id;
  }

  delete(id: string): any {
    return id;
  }
}
