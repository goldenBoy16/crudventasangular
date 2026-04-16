import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './productos-list.component.html',
  styles: [`.search-box { max-width: 320px; }`]
})
export class ProductosListComponent implements OnInit {
  productos: Producto[] = [];
  filtrados: Producto[] = [];
  busqueda = '';
  loading = true;
  productoAEliminar: Producto | null = null;

  constructor(private productoService: ProductoService) {}

  async ngOnInit() {
    await this.cargar();
  }

  async cargar() {
    this.loading = true;
    this.productos = await this.productoService.getAll();
    this.filtrar();
    this.loading = false;
  }

  filtrar() {
    const q = this.busqueda.toLowerCase();
    this.filtrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q)
    );
  }

  confirmarEliminar(p: Producto) { this.productoAEliminar = p; }

  async eliminar() {
    if (this.productoAEliminar?.id) {
      await this.productoService.delete(this.productoAEliminar.id);
      this.productoAEliminar = null;
      await this.cargar();
    }
  }
}
