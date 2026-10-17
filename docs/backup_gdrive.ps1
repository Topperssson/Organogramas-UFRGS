<#
.SYNOPSIS
    Script de backup incremental e aditivo para o Google Drive via Rclone para o Organogramas UFRGS.
.DESCRIPTION
    Copia todos os planos curriculares salvos, simulações, código estático e assets
    preservando a integridade do repositório na nuvem.
#>

[CmdletBinding()]
param(
    [string]$SourcePath = "",
    [string]$RemoteDestination = "gdrive:backup-dev/backup-organogramas-ufrgs",
    [string]$FilterFile = ""
)

if ([string]::IsNullOrWhiteSpace($SourcePath)) {
    $SourcePath = Split-Path $PSScriptRoot -Parent
}
if ([string]::IsNullOrWhiteSpace($FilterFile)) {
    $FilterFile = Join-Path $PSScriptRoot "rclone_filters.txt"
}

# Garantir Path com o Rclone caso rodado fora de um terminal padrão
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

if (-not (Get-Command rclone -ErrorAction SilentlyContinue)) {
    Write-Error "Rclone não foi encontrado no PATH. Verifique a instalação."
    exit 1
}

if (-not (Test-Path $FilterFile)) {
    Write-Error "Arquivo de filtros não encontrado: $FilterFile"
    exit 1
}

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Iniciando Backup Organogramas UFRGS: $SourcePath -> $RemoteDestination" -ForegroundColor Cyan
Write-Host "Data/Hora: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

rclone copy $SourcePath $RemoteDestination `
    --filter-from $FilterFile `
    --fast-list `
    --transfers 4 `
    --checkers 8 `
    -P `
    -v

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nBackup do Organogramas UFRGS concluído com sucesso!" -ForegroundColor Green
} else {
    Write-Host "`nErro durante o processo de backup. Código: $LASTEXITCODE" -ForegroundColor Red
}
