# Envia as variaveis de .env.local para o ambiente de Production na Vercel.
# Uso: powershell -File scripts\push-env-vercel.ps1  (ou apenas .\scripts\push-env-vercel.ps1 dentro do repo)

$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")

$keys = @(
  "DATABASE_URL",
  "R2_ACCOUNT_ID",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET_NAME",
  "R2_PUBLIC_URL",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD_HASH",
  "SESSION_SECRET"
)

$envContent = Get-Content ".env.local"

foreach ($key in $keys) {
  $line = $envContent | Where-Object { $_ -match "^$key=" } | Select-Object -First 1
  if (-not $line) {
    Write-Host "$key`: pulado (nao encontrado em .env.local)"
    continue
  }
  $value = $line.Substring($key.Length + 1)
  if ([string]::IsNullOrEmpty($value)) {
    Write-Host "$key`: pulado (vazio em .env.local)"
    continue
  }
  Write-Host "Adicionando $key..."
  $value | npx vercel env add $key production
}

Write-Host "Concluido. Rode 'npx vercel env ls production' para conferir."
