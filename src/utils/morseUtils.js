import morseData from "../data/morseData.json";

export const MORSE_SEPARATOR = " ";
export const WORD_SEPARATOR = "/";

const reverseMorse = Object.fromEntries(
  Object.entries(morseData)
    .filter(([character]) => character !== " ")
    .map(([character, code]) => [code, character]),
);

export function textToMorse(text) {
  if (typeof text !== "string" || !text.trim()) {
    return "";
  }

  const normalizedText = text.toUpperCase().trim().replace(/\s+/g, " ");

  const words = normalizedText.split(" ");

  const encodedWords = words
    .map((word) =>
      Array.from(word)
        .map((character) => morseData[character] ?? "")
        .filter(Boolean)
        .join(MORSE_SEPARATOR),
    )
    .filter(Boolean);

  return encodedWords.join(` ${WORD_SEPARATOR} `);
}

export function morseToText(morse) {
  if (typeof morse !== "string" || !morse.trim()) {
    return "";
  }

  const normalizedMorse = morse
    .trim()
    .replace(/[·•]/g, ".")
    .replace(/[—–−]/g, "-")
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s+/g, " ");

  const words = normalizedMorse.split(" / ");

  const decodedWords = words.map((word) =>
    word
      .split(" ")
      .filter(Boolean)
      .map((code) => reverseMorse[code] ?? "?")
      .join(""),
  );

  return decodedWords.join(" ");
}

export function encodeMessageToURL(message) {
  if (typeof message !== "string") {
    return "";
  }

  const bytes = new TextEncoder().encode(message);

  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join(
    "",
  );

  return encodeURIComponent(btoa(binary));
}

export function decodeMessageFromURL(encoded) {
  if (typeof encoded !== "string" || !encoded) {
    return null;
  }

  try {
    const binary = atob(decodeURIComponent(encoded));

    const bytes = Uint8Array.from(binary, (character) =>
      character.charCodeAt(0),
    );

    return new TextDecoder("utf-8", {
      fatal: true,
    }).decode(bytes);
  } catch {
    return null;
  }
}

export function generateShareURL(message) {
  const encodedMessage = encodeMessageToURL(message);

  const url = new URL("/translator", window.location.origin);

  url.searchParams.set("msg", encodedMessage);

  return url.toString();
}

export function readMessageFromURL() {
  const params = new URLSearchParams(window.location.search);

  const encodedMessage = params.get("msg");

  if (!encodedMessage) {
    return null;
  }

  return decodeMessageFromURL(encodedMessage);
}
