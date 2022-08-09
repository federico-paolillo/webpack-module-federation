const AVAILABLE_WORDS = ["pippo", "pluto", "topolino"];
const WHITESPACE = " ";
const EMPTY_STRING = "";

function generateWords(words: number): string {
  return Array(words)
    .fill(EMPTY_STRING)
    .map(
      () => AVAILABLE_WORDS[Math.floor(Math.random() * AVAILABLE_WORDS.length)]
    )
    .join(WHITESPACE);
}

export function garbageDiv(words = 32): HTMLDivElement {
  const div = document.createElement("div");

  div.textContent = generateWords(words);

  return div;
}
