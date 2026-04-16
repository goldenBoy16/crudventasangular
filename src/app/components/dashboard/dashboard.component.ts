import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { ClienteService } from '../../services/cliente.service';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styles: [`
    .card-stat { transition: transform 0.2s; cursor: pointer; }
    .card-stat:hover { transform: translateY(-4px); }
    .icon-box { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; }
  `]
})
export class DashboardComponent implements OnInit {
  totalProductos = 0;
  totalClientes = 0;
  totalVentas = 0;
  ingresoTotal = 0;
  ventasRecientes: any[] = [];

  constructor(
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private ventaService: VentaService
  ) {}

  async ngOnInit() {
    const [productos, clientes, ventas] = await Promise.all([
      this.productoService.getAll(),
      this.clienteService.getAll(),
      this.ventaService.getAll()
    ]);
    this.totalProductos = productos.length;
    this.totalClientes = clientes.length;
    this.totalVentas = ventas.length;
    this.ingresoTotal = ventas.filter(v => v.estado === 'completada').reduce((s, v) => s + v.total, 0);
    this.ventasRecientes = ventas.slice(-5).reverse();
  }
}
