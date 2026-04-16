export interface DetalleVenta {
  productoId: number;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Venta {
  id?: number;
  clienteId: number;
  nombreCliente: string;
  fecha: string;
  detalles: DetalleVenta[];
  total: number;
  estado: 'pendiente' | 'completada' | 'cancelada';
}
