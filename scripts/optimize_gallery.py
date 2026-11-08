#!/usr/bin/env python3
"""
Script de optimización y conversión por lotes para la galería exclusiva
de 'Ataurique y Organza' — Triana de los Reyes.

- Lee las 52 fotografías originales desde 'Fotos Ataurique y Organza'
- Corrige orientación EXIF automáticamente
- Redimensiona a máx. 1920px de ancho / 1200px de alto (manteniendo proporción)
- Convierte a formato WebP con calidad 81% (method=6)
- Guarda con nombres estandarizados: foto-01.webp ... foto-52.webp
"""

from __future__ import annotations

import json
import os
import re
from pathlib import Path
from PIL import Image, ImageOps

SOURCE_DIR = Path("Fotos Ataurique y Organza")
OUTPUT_DIR = Path("images/galeria")
QUALITY = 81
MAX_WIDTH = 1920
MAX_HEIGHT = 1200

VALID_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

# Recortes exactos (left, top, right, bottom) sobre la imagen original (post-EXIF)
# para eliminar márgenes blancos/negros de escaneado en las fotografías afectadas.
SCAN_CROPS = {
    1: (72, 76, 1188, 728),
    2: (40, 30, 1248, 792),
    3: (375, 320, 2385, 3605),
    4: (180, 185, 2715, 4125),
    5: (28, 25, 535, 822),
    8: (915, 240, 6440, 4400),
    11: (10, 10, 1045, 1575),
    12: (15, 15, 1670, 2485),
    13: (24, 28, 1765, 2610),
    14: (30, 20, 2305, 3385),
    15: (40, 20, 4700, 6900),
    26: (1150, 25, 6980, 4735),
    27: (5, 5, 365, 502),
    29: (50, 20, 4705, 6910),
    37: (12, 12, 1338, 2385),
    44: (10, 10, 1748, 2190),
    46: (15, 15, 2025, 2485),
    48: (22, 22, 842, 1208),
}


def extract_number(filename: str) -> int | None:
    match = re.match(r"^(\d+)-", filename)
    return int(match.group(1)) if match else None


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    files_by_num = {}
    for entry in SOURCE_DIR.iterdir():
        if entry.is_file() and entry.suffix.lower() in VALID_EXTENSIONS:
            num = extract_number(entry.name)
            if num is not None:
                files_by_num[num] = entry

    print(f"Encontradas {len(files_by_num)} imágenes numeradas.")
    if len(files_by_num) != 52:
        missing = set(range(1, 53)) - set(files_by_num.keys())
        print(f"ADVERTENCIA: Faltan números: {missing}")

    total_original_bytes = 0
    total_optimized_bytes = 0
    metadata = []

    for num in sorted(files_by_num.keys()):
        src_path = files_by_num[num]
        orig_size = src_path.stat().st_size
        total_original_bytes += orig_size

        with Image.open(src_path) as img:
            # Corregir rotación según metadatos EXIF
            img = ImageOps.exif_transpose(img)

            # Convertir directamente a RGB
            if img.mode != "RGB":
                img = img.convert("RGB")

            orig_w, orig_h = img.size

            # Aplicar recorte de márgenes de escaneado si corresponde
            if num in SCAN_CROPS:
                img = img.crop(SCAN_CROPS[num])
            else:
                # Recorte preventivo de seguridad (0.5% / mín. 3 px por lado)
                # para eliminar halos de 1-2 px de capturas o compresión en bordes
                shave_x = max(3, round(img.width * 0.005))
                shave_y = max(3, round(img.height * 0.005))
                img = img.crop((shave_x, shave_y, img.width - shave_x, img.height - shave_y))

            orig_w, orig_h = img.size

            # Unificar tamaño respetando al 100% la relación de aspecto original (sin recortar):
            # - Verticales: todas unificadas a la misma altura (1200 px)
            # - Horizontales / cuadradas: todas unificadas a la misma anchura (1600 px)
            if orig_h > orig_w:
                target_h = 1200
                target_w = round(orig_w * (target_h / orig_h))
                img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
            else:
                target_w = 1600
                target_h = round(orig_h * (target_w / orig_w))
                img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
            new_w, new_h = img.size

            out_filename = f"foto-{num:02d}.webp"
            out_path = OUTPUT_DIR / out_filename

            img.save(out_path, format="WEBP", quality=QUALITY, method=6)

        opt_size = out_path.stat().st_size
        total_optimized_bytes += opt_size

        metadata.append({
            "id": num,
            "src": f"images/galeria/{out_filename}",
            "original_name": src_path.name,
            "width": new_w,
            "height": new_h,
            "size_kb": round(opt_size / 1024, 1),
        })

        print(
            f"[{num:02d}/52] {src_path.name} ({orig_w}x{orig_h}, {orig_size/1024:.1f} KB) "
            f"-> {out_filename} ({new_w}x{new_h}, {opt_size/1024:.1f} KB)"
        )

    total_orig_mb = total_original_bytes / (1024 * 1024)
    total_opt_mb = total_optimized_bytes / (1024 * 1024)
    reduction = (1 - (total_optimized_bytes / total_original_bytes)) * 100

    print("\n" + "=" * 60)
    print(f"Total original:   {total_orig_mb:.2f} MB")
    print(f"Total optimizado: {total_opt_mb:.2f} MB (Límite objetivo: ~15 MB)")
    print(f"Reducción:        {reduction:.1f}%")
    print("=" * 60)


if __name__ == "__main__":
    main()
