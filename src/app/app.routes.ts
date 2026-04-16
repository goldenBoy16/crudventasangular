import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductosListComponent } from './components/productos/productos-list/productos-list.component';
import { ProductoFormComponent } from './components/productos/producto-form/producto-form.component';
import { ClientesListComponent } from './components/clientes/clientes-list/clientes-list.component';
import { ClienteFormComponent } from './components/clientes/cliente-form/cliente-form.component';
import { VentasListComponent } from './components/ventas/ventas-list/ventas-list.component';
import { VentaFormComponent } from './components/ventas/venta-form/venta-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  // CRUD 1 - Productos
  { path: 'productos', component: ProductosListComponent },
  { path: 'productos/nuevo', component: ProductoFormComponent },
  { path: 'productos/editar/:id', component: ProductoFormComponent },

  // CRUD 2 - Clientes
  { path: 'clientes', component: ClientesListComponent },
  { path: 'clientes/nuevo', component: ClienteFormComponent },
  { path: 'clientes/editar/:id', component: ClienteFormComponent },

  // CRUD 3 - Ventas
  { path: 'ventas', component: VentasListComponent },
  { path: 'ventas/nueva', component: VentaFormComponent },
  { path: 'ventas/editar/:id', component: VentaFormComponent },

  { path: '**', redirectTo: 'dashboard' }
];
