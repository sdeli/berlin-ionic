export function createQueryString(params: Record<string, string | number | boolean>): string {
  return new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  ).toString();
}

export function highlightChosenWord(chosenWord: string, text: string) {
  const highlightedChosenWord = `<strong>${chosenWord}</strong>`;

  return text.replace(new RegExp(chosenWord, 'gi'), (match) => {
    // If the matched word is uppercase, return the replacement in uppercase
    if (match === match.toUpperCase()) {
      return `<strong>${chosenWord.toUpperCase()}</strong>`;
    }
    // If the matched word is capitalized, capitalize the replacement
    else if (match[0] === match[0].toUpperCase()) {
      return `<strong>${chosenWord.charAt(0).toUpperCase() + chosenWord.slice(1)}</strong>`;
    }
    // Otherwise, return the replacement as lowercase
    return highlightedChosenWord;
  });
}