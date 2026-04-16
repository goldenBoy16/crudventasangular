import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../../services/venta.service';
import { Venta } from '../../../models/venta.model';

@Component({
  selector: 'app-ventas-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './ventas-list.component.html',
  styles: [`.search-box { max-width: 320px; }`]
})
export class VentasListComponent implements OnInit {
  ventas: Venta[] = [];
  filtradas: Venta[] = [];
  busqueda = '';
  loading = true;
  ventaAEliminar: Venta | null = null;
  ventaDetalle: Venta | null = null;

  constructor(private ventaService: VentaService) {}

  async ngOnInit() { await this.cargar(); }

  async cargar() {
    this.loading = true;
    this.ventas = await this.ventaService.getAll();
    this.filtrar();
    this.loading = false;
  }

  filtrar() {
    const q = this.busqueda.toLowerCase();
    this.filtradas = this.ventas.filter(v =>
      v.nombreCliente.toLowerCase().includes(q) ||
      String(v.id).includes(q)
    );
  }

  verDetalle(v: Venta) { this.ventaDetalle = v; }
  confirmarEliminar(v: Venta) { this.ventaAEliminar = v; }

  async eliminar() {
    if (this.ventaAEliminar?.id) {
      await this.ventaService.delete(this.ventaAEliminar.id);
      this.ventaAEliminar = null;
      await this.cargar();
    }
  }

  badgeClass(estado: string) {
    return {
      'bg-success': estado === 'completada',
      'bg-warning text-dark': estado === 'pendiente',
      'bg-danger': estado === 'cancelada'
    };
  }
}
