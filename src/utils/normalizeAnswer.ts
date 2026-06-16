export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase("fr-FR")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[’']/g, " ")
    .replace(/\s+/g, " ");
}

export function normalizeWhat3Words(value: string): string {
  return normalizeAnswer(value)
    .replace(/[.,/|;:-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compactAnswer(value: string): string {
  return normalizeAnswer(value).replace(/[\s.,/|;:-]+/g, "");
}

export function answersMatch(expected: string, submitted: string, isWhat3Words = false): boolean {
  if (isWhat3Words) {
    return normalizeWhat3Words(expected) === normalizeWhat3Words(submitted);
  }

  return (
    normalizeAnswer(expected) === normalizeAnswer(submitted) ||
    compactAnswer(expected) === compactAnswer(submitted)
  );
}
