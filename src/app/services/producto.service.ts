import { Injectable } from '@angular/core';
import { IndexedDbService } from './indexed-db.service';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private store = 'productos';

  constructor(private db: IndexedDbService) {}

  getAll(): Promise<Producto[]> {
    return this.db.getAll<Producto>(this.store);
  }

  getById(id: number): Promise<Producto | undefined> {
    return this.db.getById<Producto>(this.store, id);
  }

  add(producto: Producto): Promise<number> {
    return this.db.add<Producto>(this.store, producto);
  }

  update(producto: Producto): Promise<void> {
    return this.db.update<Producto>(this.store, producto);
  }

  delete(id: number): Promise<void> {
    return this.db.delete(this.store, id);
  }
}
