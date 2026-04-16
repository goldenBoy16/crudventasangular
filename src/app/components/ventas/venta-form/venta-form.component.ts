import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { VentaService } from '../../../services/venta.service';
import { ClienteService } from '../../../services/cliente.service';
import { ProductoService } from '../../../services/producto.service';
import { Cliente } from '../../../models/cliente.model';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-venta-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './venta-form.component.html'
})
export class VentaFormComponent implements OnInit {
  form!: FormGroup;
  esEdicion = false;
  ventaId!: number;
  loading = false;
  guardado = false;

  clientes: Cliente[] = [];
  productos: Producto[] = [];

  constructor(
    private fb: FormBuilder,
    private ventaService: VentaService,
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    

    this.form = this.fb.group({
      clienteId: ['', Validators.required],
      fecha: [new Date().toISOString().split('T')[0], Validators.required],
      estado: ['pendiente', Validators.required],
      detalles: this.fb.array([], Validators.required)
    });
    [this.clientes, this.productos] = await Promise.all([
      this.clienteService.getAll(),
      this.productoService.getAll()
    ]);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.ventaId = +id;
      await this.cargarVenta();
    } else {
      this.agregarDetalle();
    }
  }

  async cargarVenta() {
    const v = await this.ventaService.getById(this.ventaId);
    if (!v) return;
    this.form.patchValue({ clienteId: v.clienteId, fecha: v.fecha, estado: v.estado });
    v.detalles.forEach(d => {
      this.detalles.push(this.fb.group({
        productoId: [d.productoId, Validators.required],
        cantidad: [d.cantidad, [Validators.required, Validators.min(1)]]
      }));
    });
  }

  get detalles(): FormArray { return this.form.get('detalles') as FormArray; }

  agregarDetalle() {
    this.detalles.push(this.fb.group({
      productoId: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    }));
  }

  eliminarDetalle(i: number) { this.detalles.removeAt(i); }

  getProducto(id: number | string): Producto | undefined {
    return this.productos.find(p => p.id === +id);
  }

  calcularTotal(): number {
    return this.detalles.controls.reduce((sum, ctrl) => {
      const prod = this.getProducto(ctrl.get('productoId')?.value);
      const cant = +ctrl.get('cantidad')?.value || 0;
      return sum + (prod ? prod.precio * cant : 0);
    }, 0);
  }

  get f() { return this.form.controls; }

  async guardar() {
    if (this.form.invalid || this.detalles.length === 0) {
      this.form.markAllAsTouched(); return;
    }
    this.loading = true;

    const cliente = this.clientes.find(c => c.id === +this.form.value.clienteId)!;
    const detallesData = this.detalles.controls.map(ctrl => {
      const prod = this.getProducto(ctrl.get('productoId')?.value)!;
      const cant = +ctrl.get('cantidad')?.value;
      return {
        productoId: prod.id!,
        nombreProducto: prod.nombre,
        cantidad: cant,
        precioUnitario: prod.precio,
        subtotal: prod.precio * cant
      };
    });

    const venta = {
      clienteId: cliente.id!,
      nombreCliente: `${cliente.nombre} ${cliente.apellido}`,
      fecha: this.form.value.fecha,
      estado: this.form.value.estado,
      detalles: detallesData,
      total: this.calcularTotal()
    };

    if (this.esEdicion) {
      await this.ventaService.update({ ...venta, id: this.ventaId });
    } else {
      await this.ventaService.add(venta);
    }

    this.loading = false;
    this.guardado = true;
    setTimeout(() => this.router.navigate(['/ventas']), 1000);
  }
}
