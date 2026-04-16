# 🛒 Sistema de Ventas — Angular + IndexedDB + Bootstrap

Aplicación web desarrollada para el **Examen Tercer Parcial de Tecnologías en Internet**.

## 🎯 Descripción

Sistema de ventas con 3 módulos CRUD completamente funcionales, persistencia local con **IndexedDB**, diseño con **Bootstrap 5** y navegación con **Angular Router**.

## 📋 Entidades y relaciones

```
Producto (1) ──── (N) DetalleVenta (N) ──── (1) Venta (N) ──── (1) Cliente
```

| CRUD | Entidad | Relación |
|------|---------|----------|
| CRUD 1 | **Productos** | Entidad Principal |
| CRUD 2 | **Clientes** | Entidad Relacionada |
| CRUD 3 | **Ventas** | Relaciona Productos y Clientes (1:N) |

## ✅ Requisitos cubiertos

- [x] CRUD 1 – Productos (crear, listar, editar, eliminar)
- [x] CRUD 2 – Clientes (crear, listar, editar, eliminar)
- [x] CRUD 3 – Ventas con detalles (crear, listar, editar, eliminar)
- [x] Relaciones entre entidades (clienteId, productoId en ventas)
- [x] Persistencia con **IndexedDB** (sin backend)
- [x] Servicio genérico `IndexedDbService` para todas las operaciones
- [x] **Angular** con componentes standalone, servicios, routing
- [x] **Bootstrap 5** + Bootstrap Icons
- [x] Diseño responsivo
- [x] Dashboard con estadísticas en tiempo real
- [x] Búsqueda/filtro en todos los listados
- [x] Validación de formularios reactivos
- [x] Modales de confirmación para eliminar
- [x] Vista de detalle de ventas con tabla de productos

## 🚀 Instalación y ejecución local

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/sistema-ventas.git
cd sistema-ventas

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
ng serve

# 4. Abrir en el navegador
http://localhost:4200
```

## 📦 Publicar en GitHub Pages

```bash
# 1. Build para producción con base-href de GitHub Pages
ng build --configuration=production --base-href "https://TU_USUARIO.github.io/sistema-ventas/"

# 2. Instalar angular-cli-ghpages (solo primera vez)
npm install -g angular-cli-ghpages

# 3. Desplegar a GitHub Pages
npx angular-cli-ghpages --dir=dist/sistema-ventas/browser
```

## 🗂️ Estructura del proyecto

```
src/app/
├── models/
│   ├── producto.model.ts       # Interface Producto
│   ├── cliente.model.ts        # Interface Cliente
│   └── venta.model.ts          # Interface Venta + DetalleVenta
├── services/
│   ├── indexed-db.service.ts   # Servicio genérico IndexedDB
│   ├── producto.service.ts     # CRUD Productos
│   ├── cliente.service.ts      # CRUD Clientes
│   └── venta.service.ts        # CRUD Ventas
└── components/
    ├── navbar/                 # Barra de navegación
    ├── dashboard/              # Panel de estadísticas
    ├── productos/
    │   ├── productos-list/     # Lista + búsqueda + eliminar
    │   └── producto-form/      # Crear / Editar
    ├── clientes/
    │   ├── clientes-list/
    │   └── cliente-form/
    └── ventas/
        ├── ventas-list/        # Lista + detalle + eliminar
        └── venta-form/         # Crear / Editar con múltiples productos
```

## 🛠️ Tecnologías

- **Angular 17** (Standalone Components)
- **IndexedDB** (persistencia local en el navegador)
- **Bootstrap 5** + Bootstrap Icons
- **Reactive Forms** (validación de formularios)
- **Angular Router** (navegación entre vistas)
- **TypeScript**

## 👥 Integrantes del grupo

- Integrante 1 — CRUD Productos
- Integrante 2 — CRUD Clientes  
- Integrante 3 — CRUD Ventas
