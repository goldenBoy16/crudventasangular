import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './producto-form.component.html'
})
export class ProductoFormComponent implements OnInit {
  form!: FormGroup;
  esEdicion = false;
  productoId!: number;
  loading = false;
  guardado = false;

  categorias = ['Electrónica','Ropa','Alimentos','Hogar','Deportes','Tecnología','Otros'];

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.productoId = +id;
      this.cargarProducto();
    }
  }

  async cargarProducto() {
    const p = await this.productoService.getById(this.productoId);
    if (p) this.form.patchValue(p);
  }

  get f() { return this.form.controls; }

  async guardar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    const data = this.form.value;
    if (this.esEdicion) {
      await this.productoService.update({ ...data, id: this.productoId });
    } else {
      await this.productoService.add(data);
    }
    this.loading = false;
    this.guardado = true;
    setTimeout(() => this.router.navigate(['/productos']), 1000);
  }
}
