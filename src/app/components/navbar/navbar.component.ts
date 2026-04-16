import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" routerLink="/dashboard">
          <i class="bi bi-shop me-2"></i>Tienda doña "GREGO"
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">
                <i class="bi bi-speedometer2 me-1"></i>Inicio
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/productos" routerLinkActive="active">
                <i class="bi bi-box-seam me-1"></i>Productos
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/clientes" routerLinkActive="active">
                <i class="bi bi-people me-1"></i>Clientes
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/ventas" routerLinkActive="active">
                <i class="bi bi-cart3 me-1"></i>Ventas
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar-brand { font-size: 1.3rem; }
    .nav-link.active { font-weight: 600; background: rgba(255,255,255,0.15); border-radius: 6px; }
  `]
})
export class NavbarComponent {}
