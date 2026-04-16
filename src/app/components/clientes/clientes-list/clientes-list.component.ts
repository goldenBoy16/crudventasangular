import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente.model';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './clientes-list.component.html',
  styles: [`.search-box { max-width: 320px; }`]
})
export class ClientesListComponent implements OnInit {
  clientes: Cliente[] = [];
  filtrados: Cliente[] = [];
  busqueda = '';
  loading = true;
  clienteAEliminar: Cliente | null = null;

  constructor(private clienteService: ClienteService) {}

  async ngOnInit() { await this.cargar(); }

  async cargar() {
    this.loading = true;
    this.clientes = await this.clienteService.getAll();
    this.filtrar();
    this.loading = false;
  }

  filtrar() {
    const q = this.busqueda.toLowerCase();
    this.filtrados = this.clientes.filter(c =>
      c.nombre.toLowerCase().includes(q) ||
      c.apellido.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  }

  confirmarEliminar(c: Cliente) { this.clienteAEliminar = c; }

  async eliminar() {
    if (this.clienteAEliminar?.id) {
      await this.clienteService.delete(this.clienteAEliminar.id);
      this.clienteAEliminar = null;
      await this.cargar();
    }
  }
}
