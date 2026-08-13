#!/usr/bin/env bash
# Envia as variáveis de .env.local para o ambiente de Production na Vercel.
# Uso: bash scripts/push-env-vercel.sh
set -e

cd "$(dirname "$0")/.."

for key in DATABASE_URL R2_ACCOUNT_ID R2_ACCESS_KEY_ID R2_SECRET_ACCESS_KEY R2_BUCKET_NAME R2_PUBLIC_URL ADMIN_EMAIL ADMIN_PASSWORD_HASH SESSION_SECRET; do
  value=$(grep -E "^${key}=" .env.local | head -1 | cut -d'=' -f2-)
  if [ -z "$value" ]; then
    echo "$key: pulado (vazio em .env.local)"
    continue
  fi
  printf '%s' "$value" | npx vercel env add "$key" production
done

echo "Concluído. Rode 'npx vercel env ls production' para conferir."
