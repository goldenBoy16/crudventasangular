#!/bin/bash
# ================================================================
# Script para desplegar en GitHub Pages
# Uso: ./deploy-ghpages.sh TU_USUARIO_GITHUB
# ================================================================

USUARIO=$1
REPO="sistema-ventas"

if [ -z "$USUARIO" ]; then
  echo "❌ Error: Debes pasar tu usuario de GitHub"
  echo "   Uso: ./deploy-ghpages.sh TU_USUARIO"
  exit 1
fi

echo "🔨 Construyendo para producción..."
ng build --configuration=production \
  --base-href "https://$USUARIO.github.io/$REPO/"

echo "🚀 Desplegando en GitHub Pages..."
npx angular-cli-ghpages --dir=dist/$REPO/browser

echo "✅ Listo! Tu app estará en:"
echo "   https://$USUARIO.github.io/$REPO/"
