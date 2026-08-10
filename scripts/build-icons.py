"""Build favicon / app icons from the KK brand source image."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(
    r"C:\Users\kado\.cursor\projects\c-Users-kado-dev-others-katiekinkel-com\assets\kk-brand-icon-source.png"
)
APP = ROOT / "app"
PUBLIC_ICONS = ROOT / "public" / "icons"
PUBLIC_ASSETS = ROOT / "public" / "assets"


def content_bbox(im: Image.Image) -> tuple[int, int, int, int]:
    """Crop near-white margins so the squircle fills the canvas."""
    px = im.load()
    w, h = im.size
    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 8:
                continue
            if r > 245 and g > 245 and b > 245:
                continue
            found = True
            minx = min(minx, x)
            miny = min(miny, y)
            maxx = max(maxx, x)
            maxy = max(maxy, y)
    if not found:
        return (0, 0, w, h)
    pad = int(min(w, h) * 0.02)
    return (
        max(0, minx - pad),
        max(0, miny - pad),
        min(w, maxx + 1 + pad),
        min(h, maxy + 1 + pad),
    )


def to_square(im: Image.Image) -> Image.Image:
    cropped = im.crop(content_bbox(im))
    side = max(cropped.size)
    square = Image.new("RGBA", (side, side), (255, 255, 255, 0))
    ox = (side - cropped.size[0]) // 2
    oy = (side - cropped.size[1]) // 2
    square.paste(cropped, (ox, oy), cropped)
    return square


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source icon: {SRC}")

    square = to_square(Image.open(SRC).convert("RGBA"))
    PUBLIC_ICONS.mkdir(parents=True, exist_ok=True)
    PUBLIC_ASSETS.mkdir(parents=True, exist_ok=True)
    APP.mkdir(parents=True, exist_ok=True)

    master = square.resize((512, 512), Image.Resampling.LANCZOS)
    master.save(PUBLIC_ASSETS / "kk-brand-icon.png", optimize=True)
    master.save(APP / "icon.png", optimize=True)
    square.resize((180, 180), Image.Resampling.LANCZOS).save(
        APP / "apple-icon.png", optimize=True
    )

    for size in (16, 32, 48, 180, 192, 512):
        square.resize((size, size), Image.Resampling.LANCZOS).save(
            PUBLIC_ICONS / f"icon-{size}.png", optimize=True
        )

    # Pillow derives ICO frames from one large image + sizes=
    ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    ico_src = square.resize((256, 256), Image.Resampling.LANCZOS)
    for dest in (APP / "favicon.ico", PUBLIC_ICONS / "favicon.ico"):
        ico_src.save(dest, format="ICO", sizes=ico_sizes)

    print("OK favicon", (APP / "favicon.ico").stat().st_size, "bytes")
    print("OK app/icon.png", (APP / "icon.png").stat().st_size)
    print("OK app/apple-icon.png", (APP / "apple-icon.png").stat().st_size)
    print("OK public/icons", sorted(p.name for p in PUBLIC_ICONS.iterdir()))


if __name__ == "__main__":
    main()
