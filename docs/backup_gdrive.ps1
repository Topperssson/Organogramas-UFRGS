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
    [string]$FilterFile = "",
    [switch]$DryRun
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

$Timestamp = Get-Date -Format 'yyyy-MM-dd_HH-mm-ss'
$ArchiveDestination = "$RemoteDestination/archive/$Timestamp"

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Iniciando Backup Organogramas UFRGS (Sync + Archive)" -ForegroundColor Cyan
Write-Host "Origem:   $SourcePath" -ForegroundColor DarkCyan
Write-Host "Destino:  $RemoteDestination" -ForegroundColor DarkCyan
Write-Host "Arquivo:  $ArchiveDestination" -ForegroundColor DarkCyan
Write-Host "Data/Hora: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor DarkCyan
if ($DryRun) {
    Write-Host "[MODO SIMULAÇÃO ATIVADO (--dry-run)]" -ForegroundColor Yellow
}
Write-Host "=================================================" -ForegroundColor Cyan

$rcloneArgs = @(
    "sync",
    $SourcePath,
    $RemoteDestination,
    "--backup-dir", $ArchiveDestination,
    "--exclude", "archive/**",
    "--filter-from", $FilterFile,
    "--fast-list",
    "--transfers", "4",
    "--checkers", "8",
    "-P",
    "-v"
)

if ($DryRun) {
    $rcloneArgs += "--dry-run"
}

& rclone @rcloneArgs

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nBackup do Organogramas UFRGS concluído com sucesso!" -ForegroundColor Green
} else {
    Write-Host "`nErro durante o processo de backup. Código: $LASTEXITCODE" -ForegroundColor Red
}
