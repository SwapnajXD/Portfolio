from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

# Colors pulled directly from the site's .dark theme (globals.css)
BG = "#15171A"
SURFACE = "#1D2025"
BORDER = "#2D3138"
TEXT_PRIMARY = "#F2F2F0"
TEXT_MUTED = "#9A9DA3"
ACCENT = "#F6821F"
ACCENT_SECONDARY = "#3B82F6"

FONT_DIR = "/usr/share/fonts/truetype/dejavu/"
mono = lambda size: ImageFont.truetype(FONT_DIR + "DejaVuSansMono.ttf", size)
mono_bold = lambda size: ImageFont.truetype(FONT_DIR + "DejaVuSansMono-Bold.ttf", size)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# Subtle dot grid background
dot_color = "#1C1F24"
step = 28
for x in range(0, W, step):
    for y in range(0, H, step):
        draw.ellipse([x, y, x + 1.4, y + 1.4], fill=dot_color)

# Soft accent glow blob (top-right), drawn as translucent-ish layered circles
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gdraw = ImageDraw.Draw(glow)
for r, a in [(320, 10), (240, 14), (160, 18)]:
    gdraw.ellipse([W - 260 - r, -260, W - 260 + r, -260 + 2 * r], fill=(246, 130, 31, a))
img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
draw = ImageDraw.Draw(img)

# Terminal window
term_x0, term_y0, term_x1, term_y1 = 90, 95, 1110, 535
radius = 14

def rounded_rect(d, box, r, fill=None, outline=None, width=1):
    d.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)

rounded_rect(draw, [term_x0, term_y0, term_x1, term_y1], radius, fill=SURFACE, outline=BORDER, width=2)

# Title bar
bar_h = 46
rounded_rect(draw, [term_x0, term_y0, term_x1, term_y0 + bar_h], radius, fill="#22262C")
draw.rectangle([term_x0, term_y0 + radius, term_x1, term_y0 + bar_h], fill="#22262C")

# Traffic light dots
dot_r = 7
dot_y = term_y0 + bar_h // 2
for i, c in enumerate(["#FF5F56", "#FFBD2E", "#27C93F"]):
    cx = term_x0 + 28 + i * 24
    draw.ellipse([cx - dot_r, dot_y - dot_r, cx + dot_r, dot_y + dot_r], fill=c)

# Title bar text
tb_font = mono(16)
tb_text = "swapnaj@portfolio: ~"
draw.text((term_x0 + 120, dot_y), tb_text, font=tb_font, fill=TEXT_MUTED, anchor="lm")

# Content padding
pad_x = term_x0 + 46
cy = term_y0 + bar_h + 44

def line(text, font, fill, x=None, dy=0):
    global cy
    draw.text((x if x is not None else pad_x, cy), text, font=font, fill=fill)
    cy += font.size + dy

prompt_font = mono(20)
big_font = mono_bold(56)
tag_font = mono(24)
small_font = mono(18)

# $ whoami
draw.text((pad_x, cy), "$ ", font=prompt_font, fill=ACCENT_SECONDARY)
draw.text((pad_x + 22, cy), "whoami", font=prompt_font, fill=TEXT_MUTED)
cy += 40

# swapnaj (big)
draw.text((pad_x, cy), "swapnaj", font=big_font, fill=ACCENT)
cy += 78

# tagline
draw.text((pad_x, cy), "Cloud & DevOps Engineering", font=tag_font, fill=TEXT_PRIMARY)
cy += 50

# $ cat stack.txt
draw.text((pad_x, cy), "$ ", font=prompt_font, fill=ACCENT_SECONDARY)
draw.text((pad_x + 22, cy), "cat stack.txt", font=prompt_font, fill=TEXT_MUTED)
cy += 42

# tech chips
chips = ["Next.js", "AWS", "Docker", "PostgreSQL", "Python", "Nginx"]
chip_font = mono(17)
chip_x = pad_x
chip_y = cy
chip_h = 34
for chip in chips:
    tw = draw.textlength(chip, font=chip_font)
    cw = tw + 28
    if chip_x + cw > term_x1 - 46:
        chip_x = pad_x
        chip_y += chip_h + 12
    rounded_rect(
        draw,
        [chip_x, chip_y, chip_x + cw, chip_y + chip_h],
        chip_h / 2,
        fill=BG,
        outline=ACCENT_SECONDARY,
        width=1,
    )
    draw.text((chip_x + 14, chip_y + chip_h / 2), chip, font=chip_font, fill=TEXT_PRIMARY, anchor="lm")
    chip_x += cw + 12

# blinking cursor block at end of last chip row
draw.rectangle([chip_x + 4, chip_y + 4, chip_x + 14, chip_y + chip_h - 4], fill=ACCENT)

# bottom-right domain tag
domain_font = mono(20)
domain_text = "swapnaj.dev"
tw = draw.textlength(domain_text, font=domain_font)
draw.text((term_x1 - 30 - tw, term_y1 - 40), domain_text, font=domain_font, fill=TEXT_MUTED)
draw.ellipse([term_x1 - 44 - tw, term_y1 - 34, term_x1 - 38 - tw, term_y1 - 28], fill=ACCENT_SECONDARY)

img.save("/home/claude/og-image.png")
print("saved", img.size)