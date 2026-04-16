import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IndexedDbService {
  private dbName = 'SistemaVentasDB';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  async initDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Object store: Productos
        if (!db.objectStoreNames.contains('productos')) {
          const productosStore = db.createObjectStore('productos', { keyPath: 'id', autoIncrement: true });
          productosStore.createIndex('nombre', 'nombre', { unique: false });
          productosStore.createIndex('categoria', 'categoria', { unique: false });
        }

        // Object store: Clientes
        if (!db.objectStoreNames.contains('clientes')) {
          const clientesStore = db.createObjectStore('clientes', { keyPath: 'id', autoIncrement: true });
          clientesStore.createIndex('email', 'email', { unique: true });
          clientesStore.createIndex('nombre', 'nombre', { unique: false });
        }

        // Object store: Ventas (relaciona clienteId + detalles con productoId)
        if (!db.objectStoreNames.contains('ventas')) {
          const ventasStore = db.createObjectStore('ventas', { keyPath: 'id', autoIncrement: true });
          ventasStore.createIndex('clienteId', 'clienteId', { unique: false });
          ventasStore.createIndex('fecha', 'fecha', { unique: false });
          ventasStore.createIndex('estado', 'estado', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  // ── GENÉRICO: obtener todos ──────────────────────────────────────────────
  async getAll<T>(storeName: string): Promise<T[]> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result as T[]);
      request.onerror = () => reject(request.error);
    });
  }

  // ── GENÉRICO: obtener por ID ─────────────────────────────────────────────
  async getById<T>(storeName: string, id: number): Promise<T | undefined> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result as T);
      request.onerror = () => reject(request.error);
    });
  }

  // ── GENÉRICO: agregar ────────────────────────────────────────────────────
  async add<T>(storeName: string, data: T): Promise<number> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.add(data);
      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  }

  // ── GENÉRICO: actualizar ─────────────────────────────────────────────────
  async update<T>(storeName: string, data: T): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // ── GENÉRICO: eliminar ───────────────────────────────────────────────────
  async delete(storeName: string, id: number): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // ── Obtener por índice ───────────────────────────────────────────────────
  async getByIndex<T>(storeName: string, indexName: string, value: IDBValidKey): Promise<T[]> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);
      request.onsuccess = () => resolve(request.result as T[]);
      request.onerror = () => reject(request.error);
    });
  }
}
