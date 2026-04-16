import { Injectable } from '@angular/core';
import { IndexedDbService } from './indexed-db.service';
import { Cliente } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private store = 'clientes';

  constructor(private db: IndexedDbService) {}

  getAll(): Promise<Cliente[]> {
    return this.db.getAll<Cliente>(this.store);
  }

  getById(id: number): Promise<Cliente | undefined> {
    return this.db.getById<Cliente>(this.store, id);
  }

  add(cliente: Cliente): Promise<number> {
    return this.db.add<Cliente>(this.store, cliente);
  }

  update(cliente: Cliente): Promise<void> {
    return this.db.update<Cliente>(this.store, cliente);
  }

  delete(id: number): Promise<void> {
    return this.db.delete(this.store, id);
  }
}
