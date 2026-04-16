import { Injectable } from '@angular/core';
import { IndexedDbService } from './indexed-db.service';
import { Venta } from '../models/venta.model';

@Injectable({ providedIn: 'root' })
export class VentaService {
  private store = 'ventas';

  constructor(private db: IndexedDbService) {}

  getAll(): Promise<Venta[]> {
    return this.db.getAll<Venta>(this.store);
  }

  getById(id: number): Promise<Venta | undefined> {
    return this.db.getById<Venta>(this.store, id);
  }

  getByCliente(clienteId: number): Promise<Venta[]> {
    return this.db.getByIndex<Venta>(this.store, 'clienteId', clienteId);
  }

  add(venta: Venta): Promise<number> {
    return this.db.add<Venta>(this.store, venta);
  }

  update(venta: Venta): Promise<void> {
    return this.db.update<Venta>(this.store, venta);
  }

  delete(id: number): Promise<void> {
    return this.db.delete(this.store, id);
  }
}
