from PIL import Image, ImageDraw, ImageFont

FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
GOLD = (212, 175, 55, 255)
INK = (17, 17, 17, 255)
BG = (250, 250, 250, 255)
LINE = (233, 230, 225, 255)


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
        for i in range(0, 21):
            poly.append(q(p0, p1, p2, i / 20))
    d.polygon(poly, fill=fill)


def render(size):
    S = size * 4
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    pad = S * 0.015
    r = S * 0.22
    d.rounded_rectangle(
        [pad, pad, S - pad, S - pad],
        radius=r,
        fill=BG,
        outline=LINE,
        width=max(1, int(S * 0.031)),
    )
    f = ImageFont.truetype(FONT, int(S * 0.66))
    bbox = d.textbbox((0, 0), "A", font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(
        (S / 2 - tw / 2 - bbox[0], S / 2 - th / 2 - bbox[1] + S * 0.02),
        "A",
        font=f,
        fill=INK,
    )
    sparkle(d, S * 0.735, S * 0.265, S * 0.115, GOLD)
    return img.resize((size, size), Image.LANCZOS)


sizes = [16, 32, 48, 64]
imgs = [render(s) for s in sizes]
imgs[0].save("src/app/favicon.ico", format="ICO", sizes=[(s, s) for s in sizes])
render(32).save("public/favicon-32.png")
render(180).save("src/app/apple-icon.png")
print("ok")
