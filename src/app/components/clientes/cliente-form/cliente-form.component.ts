import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent implements OnInit {
  form!: FormGroup;
  esEdicion = false;
  clienteId!: number;
  loading = false;
  guardado = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      direccion: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.clienteId = +id;
      this.cargarCliente();
    }
  }

  async cargarCliente() {
    const c = await this.clienteService.getById(this.clienteId);
    if (c) this.form.patchValue(c);
  }

  get f() { return this.form.controls; }

  async guardar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    const data = this.form.value;
    if (this.esEdicion) {
      await this.clienteService.update({ ...data, id: this.clienteId });
    } else {
      await this.clienteService.add(data);
    }
    this.loading = false;
    this.guardado = true;
    setTimeout(() => this.router.navigate(['/clientes']), 1000);
  }
}
