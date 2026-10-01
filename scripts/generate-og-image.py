"""Génère public/og-image.png (1200x630) — partage social ABYNÉA."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (250, 250, 250)
INK = (17, 17, 17)
GOLD = (212, 175, 55)
SAND = (243, 239, 233)
LINE = (233, 230, 225)

PLAYFAIR = "/tmp/playfair.ttf"
INTER = "/tmp/inter.ttf"
SERIF_STACK = "Playfair Display, Georgia, serif"


def serif(size, weight=600):
    f = ImageFont.truetype(PLAYFAIR, size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


def sans(size, weight=400):
    f = ImageFont.truetype(INTER, size)
    try:
        f.set_variation_by_axes([14, weight])
    except Exception:
        try:
            f.set_variation_by_axes([weight])
        except Exception:
            pass
    return f


def sparkle(d, cx, cy, r, fill):
    w = r * 0.16

    def q(p0, p1, p2, t):
        return (
            (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
            (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1],
        )

    ctrl = [
        ((cx, cy - r), (cx + w, cy - w), (cx + r, cy)),
        ((cx + r, cy), (cx + w, cy + w), (cx, cy + r)),
        ((cx, cy + r), (cx - w, cy + w), (cx - r, cy)),
        ((cx - r, cy), (cx - w, cy - w), (cx, cy - r)),
    ]
    poly = []
    for p0, p1, p2 in ctrl:
        for i in range(21):
            poly.append(q(p0, p1, p2, i / 20))
    d.polygon(poly, fill=fill)


img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

# Halo doré discret en haut
d.ellipse([W / 2 - 320, -260, W / 2 + 320, 120], fill=SAND)

# Filets latéraux dorés
d.rectangle([0, 0, W, 6], fill=GOLD)

# --- Logotype (même géométrie que Logo.tsx, viewBox 200x50) ---
letters = ["A", "B", "Y", "N", "É", "A"]
pitch, fsize, baseline = 21.4, 27.6, 38.0
first = 100 - (pitch * (len(letters) - 1)) / 2
accent = first + pitch * letters.index("É")

scale = 4.6
lx = W / 2 - (200 * scale) / 2
ly = 118
font_logo = serif(int(fsize * scale), 600)

# Rendu du logotype : on compose sur un calque transparent puis on colle
layer = Image.new("RGBA", (int(200 * scale), int(50 * scale)), (0, 0, 0, 0))
ld = ImageDraw.Draw(layer)
for i, ch in enumerate(letters):
    cx = (first + i * pitch) * scale
    ld.text((cx, baseline * scale), ch, font=font_logo, fill=INK, anchor="ms")
sparkle(ld, (accent + 6) * scale, 6 * scale, 5 * scale, GOLD)
img.paste(layer, (int(lx), int(ly)), layer)

# --- Baseline ---
y = ly + 50 * scale + 26
d.line([W / 2 - 60, y, W / 2 + 60, y], fill=GOLD, width=2)

# --- Tagline (serif, 2 lignes) ---
t1 = "Sublimez votre quotidien"
f1 = serif(66, 500)
d.text((W / 2, y + 78), t1, font=f1, fill=INK, anchor="mm")

t2 = "Bijoux en acier inoxydable waterproof · Coques MagSafe · Petite maroquinerie"
f2 = sans(24, 400)
d.text((W / 2, y + 150), t2, font=f2, fill=(107, 107, 107), anchor="mm")

# --- Bandeau bas : réassurance ---
by = H - 86
d.line([80, by, W - 80, by], fill=LINE, width=1)
items = [
    "Impermeable",
    "Expedition 24/48h",
    "Paiement securise",
    "Retours 14 jours",
]
f3 = sans(21, 500)
fg = sans(21, 400)
total = sum(d.textlength(it, font=f3) for it in items) + 2 * 46 * (len(items) - 1)
x = (W - total) / 2
for i, it in enumerate(items):
    d.text((x, by + 46), it, font=f3, fill=(58, 58, 58), anchor="lm")
    x += d.textlength(it, font=f3)
    if i < len(items) - 1:
        d.text((x + 23, by + 46), "•", font=fg, fill=GOLD, anchor="mm")
        x += 46

img.save("public/og-image.png", optimize=True)
print("og-image.png written", img.size)
