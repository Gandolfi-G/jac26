from pathlib import Path
import textwrap


OUTPUT_DIR = Path("documents/phrases-lieux")

ITEMS = [
    ("Salle des maîtres", "Léa a oublié son carnet en classe. Transmettez ce prénom au QG."),
    ("Salle 209", "Hugo cherche le devoir qu’il devait rendre. Transmettez ce prénom au QG."),
    ("Cafétéria", "Inès a laissé son plateau sans débarrasser. Transmettez ce prénom au QG."),
    ("Salle 333", "Nathan a demandé de l’aide pour retrouver son groupe. Transmettez ce prénom au QG."),
    ("Salle 114", "Emma a rendu un livre avec une page pliée. Transmettez ce prénom au QG."),
    ("Salle 112", "Lucas a trouvé une clé près d’une table. Transmettez ce prénom au QG."),
    ("Escalier au deuxième étage", "Manon a croisé un surveillant en montant les marches. Transmettez ce prénom au QG."),
    ("Toilettes au troisième étage", "Yanis a signalé un robinet resté ouvert. Transmettez ce prénom au QG."),
    ("Salle 308", "Clara a posé une question juste avant la sonnerie. Transmettez ce prénom au QG."),
    ("Infirmerie", "Noé est venu chercher un pansement après la récréation. Transmettez ce prénom au QG."),
    ("Salle des doyens", "Lola a apporté un mot signé par ses parents. Transmettez ce prénom au QG."),
    ("Aula", "Sarah répète son texte avant de monter sur scène. Transmettez ce prénom au QG."),
    ("Escaliers au -1", "Malik a ramassé une trousse tombée dans l’escalier. Transmettez ce prénom au QG."),
]


SLUGS = {
    "Salle des maîtres": "salle_des_maitres",
    "Salle 209": "salle_209",
    "Cafétéria": "cafeteria",
    "Salle 333": "salle_333",
    "Salle 114": "salle_114",
    "Salle 112": "salle_112",
    "Escalier au deuxième étage": "escalier_2e_etage",
    "Toilettes au troisième étage": "toilettes_3e_etage",
    "Salle 308": "salle_308",
    "Infirmerie": "infirmerie",
    "Salle des doyens": "salle_des_doyens",
    "Aula": "aula",
    "Escaliers au -1": "escaliers_moins_1",
}


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


def phrase_lines(phrase: str) -> list[str]:
    instruction = "Transmettez ce prénom au QG."
    if instruction not in phrase:
        return textwrap.wrap(phrase, width=62)

    story = phrase.replace(instruction, "").strip()
    return [*textwrap.wrap(story, width=62), instruction]


def make_pdf(path: Path, lieu: str, phrase: str) -> None:
    width = 841.89
    height = 595.28
    lines = phrase_lines(phrase)
    content_lines = [
        "q",
        f"0.96 0.96 0.94 rg 0 0 {width:.2f} {height:.2f} re f",
        "0.10 0.10 0.10 rg",
    ]

    start_y = height / 2 + (len(lines) - 1) * 22
    for index, line in enumerate(lines):
        content_lines.append(centered_text_line(line, "F1", 30, start_y - index * 44, width))

    footer = f"À placer : {lieu}"
    content_lines.extend(
        [
            "0.36 0.36 0.36 rg",
            centered_text_line(footer, "F1", 11, 42, width),
            "Q",
        ]
    )
    content = "\n".join(content_lines).encode("cp1252")

    objects = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        (
            f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {width:.2f} {height:.2f}] "
            "/Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>"
        ).encode("ascii"),
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
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
    for index, (lieu, phrase) in enumerate(ITEMS, start=1):
        make_pdf(OUTPUT_DIR / f"{index:02d}_{SLUGS[lieu]}.pdf", lieu, phrase)


if __name__ == "__main__":
    main()
