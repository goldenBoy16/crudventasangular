# Sistema de Ventas — Angular + IndexedDB + Bootstrap

Aplicación web para el **Examen Tercer Parcial de Tecnologías en Internet**.

# Estructura del proyecto

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