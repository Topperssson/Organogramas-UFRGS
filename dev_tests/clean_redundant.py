import ctypes
from ctypes import wintypes
import os
from pathlib import Path

# Windows SHFileOperation to send to Recycle Bin safely
FO_DELETE = 0x0003
FOF_ALLOWUNDO = 0x0040
FOF_NOCONFIRMATION = 0x0010
FOF_SILENT = 0x0004

class SHFILEOPSTRUCTW(ctypes.Structure):
    _fields_ = [
        ("hwnd", wintypes.HWND),
        ("wFunc", wintypes.UINT),
        ("pFrom", wintypes.LPCWSTR),
        ("pTo", wintypes.LPCWSTR),
        ("fFlags", wintypes.WORD),
        ("fAnyOperationsAborted", wintypes.BOOL),
        ("hNameMappings", wintypes.LPVOID),
        ("lpszProgressTitle", wintypes.LPCWSTR),
    ]

def send_to_recycle_bin(path_str: str) -> bool:
    if not os.path.exists(path_str):
        return False
    # Path must be double null-terminated
    double_null_path = os.path.abspath(path_str) + "\0\0"
    fileop = SHFILEOPSTRUCTW()
    fileop.wFunc = FO_DELETE
    fileop.pFrom = double_null_path
    fileop.fFlags = FOF_ALLOWUNDO | FOF_NOCONFIRMATION | FOF_SILENT
    result = ctypes.windll.shell32.SHFileOperationW(ctypes.byref(fileop))
    return result == 0
base_dir = Path(__file__).resolve().parent.parent

# Redundant files that were already copied to dist/engenharia-controle-automacao/
redundant_files = [
    "app.js",
    "curriculum_data.js",
    "curriculum_data.json",
    "index.html",
    "styles.css"
]

redundant_dirs = [
    ".pytest_cache",
    "__pycache__"
]

recycled = []

for filename in redundant_files:
    target = base_dir / filename
    if target.is_file():
        if send_to_recycle_bin(str(target)):
            recycled.append(f"Arquivo: {filename}")
            print(f"[LIXEIRA] Arquivo redundante enviado à lixeira: {filename}")
        else:
            print(f"[ERRO] Falha ao enviar à lixeira: {filename}")

for dirname in redundant_dirs:
    target = base_dir / dirname
    if target.is_dir():
        if send_to_recycle_bin(str(target)):
            recycled.append(f"Diretório: {dirname}")
            print(f"[LIXEIRA] Cache redundante enviado à lixeira: {dirname}")
        else:
            print(f"[ERRO] Falha ao enviar à lixeira: {dirname}")

print(f"\nTotal de itens redundantes reciclados com segurança: {len(recycled)}")
