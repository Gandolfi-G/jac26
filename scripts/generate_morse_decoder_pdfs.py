from pathlib import Path


OUTPUT_DIR = Path("documents/decodeurs-morse")

MORSE = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
}

PARTS = [
    ("A-G", ["A", "B", "C", "D", "E", "F", "G"]),
    ("H-N", ["H", "I", "J", "K", "L", "M", "N"]),
    ("O-T", ["O", "P", "Q", "R", "S", "T"]),
    ("U-Z", ["U", "V", "W", "X", "Y", "Z"]),
]


def pdf_escape(text: str) -> str:
    data = text.encode("cp1252")
    out = []
    for byte in data:
        char = chr(byte)
        if char in ("\\", "(", ")"):
            out.append("\\" + char)
        elif byte < 32 or byte > 126:
            out.append(f"\\{byte:03o}")
        else:
            out.append(char)
    return "".join(out)


def text_width_approx(text: str, font_size: int) -> float:
    return len(text) * font_size * 0.48


def text_line(text: str, font: str, size: int, x: float, y: float) -> str:
    return f"BT /{font} {size} Tf {x:.2f} {y:.2f} Td ({pdf_escape(text)}) Tj ET"


def centered_text_line(text: str, font: str, size: int, y: float, page_width: float) -> str:
    x = (page_width - text_width_approx(text, size)) / 2
    return text_line(text, font, size, x, y)


def make_pdf(path: Path, part_number: int, label: str, letters: list[str]) -> None:
    width = 841.89
    height = 595.28
    content_lines = [
        "q",
        f"0.97 0.96 0.92 rg 0 0 {width:.2f} {height:.2f} re f",
        "0.08 0.08 0.08 rg",
        centered_text_line(f"Décodeur Morse {part_number}/4", "F1", 36, 505, width),
        centered_text_line(f"Lettres {label}", "F1", 22, 465, width),
        "0.18 0.18 0.18 rg",
        centered_text_line(
            "Il faut réunir les 4 décodeurs pour pouvoir décoder tout le message.",
            "F1",
            16,
            430,
            width,
        ),
        "0.08 0.08 0.08 rg",
    ]

    start_y = 350
    line_gap = 44
    left_x = 265
    for index, letter in enumerate(letters):
        y = start_y - index * line_gap
        content_lines.append(text_line(letter, "F2", 28, left_x, y))
        content_lines.append(text_line(MORSE[letter], "F2", 28, left_x + 95, y))

    content_lines.extend(
        [
            "0.36 0.36 0.36 rg",
            centered_text_line("Point = son court    Trait = son long", "F1", 14, 50, width),
            "Q",
        ]
    )
    content = "\n".join(content_lines).encode("cp1252")

    objects = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        (
            f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {width:.2f} {height:.2f}] "
            "/Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>"
        ).encode("ascii"),
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>",
        f"<< /Length {len(content)} >>\nstream\n".encode("ascii") + content + b"\nendstream",
    ]

    chunks = [b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n"]
    offsets = [0]
    for number, obj in enumerate(objects, start=1):
        offsets.append(sum(len(chunk) for chunk in chunks))
        chunks.append(f"{number} 0 obj\n".encode("ascii") + obj + b"\nendobj\n")

    xref_start = sum(len(chunk) for chunk in chunks)
    chunks.append(f"xref\n0 {len(objects) + 1}\n".encode("ascii"))
    chunks.append(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        chunks.append(f"{offset:010d} 00000 n \n".encode("ascii"))
    chunks.append(
        (
            f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\n"
            f"startxref\n{xref_start}\n%%EOF\n"
        ).encode("ascii")
    )

    path.write_bytes(b"".join(chunks))


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for index, (label, letters) in enumerate(PARTS, start=1):
        make_pdf(OUTPUT_DIR / f"{index:02d}_decodeur_morse_{label.lower()}.pdf", index, label, letters)


if __name__ == "__main__":
    main()
