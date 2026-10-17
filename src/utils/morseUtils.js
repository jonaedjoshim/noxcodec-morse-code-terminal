import morseData from "../data/morseData.json";

/**
 * NOXCODEC — Morse Translation Engine
 *
 * Supports:
 * - International Morse Code
 * - English letters (A-Z)
 * - Numbers (0-9)
 * - Common punctuation
 * - Word separators
 * - Unicode-safe shareable URLs
 */

// --------------------------------------------------
// CONSTANTS
// --------------------------------------------------

export const MORSE_SEPARATOR = " ";
export const WORD_SEPARATOR = "/";

const reverseMorse = Object.fromEntries(
  Object.entries(morseData)
    .filter(([character]) => character !== " ")
    .map(([character, code]) => [code, character]),
);

// --------------------------------------------------
// TEXT → MORSE
// --------------------------------------------------

/**
 * Convert plain text into Morse code.
 *
 * Examples:
 *
 * "SOS"         → "... --- ..."
 * "HELLO WORLD" → ".... . .-.. .-.. --- / .-- --- .-. .-.. -.."
 *
 * Unsupported characters are ignored.
 * Multiple whitespace characters are treated
 * as a single word separator.
 */

export function textToMorse(text) {
  if (typeof text !== "string" || !text.trim()) {
    return "";
  }

  const normalizedText = text.toUpperCase().trim().replace(/\s+/g, " ");

  const words = normalizedText.split(" ");

  const encodedWords = words
    .map((word) => {
      return Array.from(word)
        .map((character) => morseData[character] ?? "")
        .filter(Boolean)
        .join(MORSE_SEPARATOR);
    })
    .filter(Boolean);

  return encodedWords.join(` ${WORD_SEPARATOR} `);
}

// --------------------------------------------------
// MORSE → TEXT
// --------------------------------------------------

/**
 * Convert Morse code into plain text.
 *
 * Examples:
 *
 * "... --- ..." → "SOS"
 *
 * ".... . .-.. .-.. ---" → "HELLO"
 *
 * Unknown Morse sequences are represented by "?".
 *
 * A forward slash separates words.
 */

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

  const decodedWords = words.map((word) => {
    return word
      .split(" ")
      .filter(Boolean)
      .map((code) => reverseMorse[code] ?? "?")
      .join("");
  });

  return decodedWords.join(" ");
}

// --------------------------------------------------
// URL ENCODING
// --------------------------------------------------

/**
 * Encode a message for URL sharing.
 *
 * Uses Base64 encoding with UTF-8 support.
 *
 * IMPORTANT:
 * Base64 is encoding, NOT encryption.
 */

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

// --------------------------------------------------
// URL DECODING
// --------------------------------------------------

/**
 * Decode a Base64 encoded URL message.
 *
 * Returns null if decoding fails.
 */

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

// --------------------------------------------------
// SHARE URL GENERATION
// --------------------------------------------------

/**
 * Generate a shareable translator URL.
 *
 * Example:
 *
 * https://example.com/translator?msg=U09T
 */

export function generateShareURL(message) {
  const encodedMessage = encodeMessageToURL(message);

  const url = new URL("/translator", window.location.origin);

  url.searchParams.set("msg", encodedMessage);

  return url.toString();
}

// --------------------------------------------------
// READ MESSAGE FROM URL
// --------------------------------------------------

/**
 * Read an encoded message from URL parameters.
 *
 * Returns:
 * - Decoded string when valid
 * - null when missing or invalid
 */

export function readMessageFromURL() {
  const params = new URLSearchParams(window.location.search);

  const encodedMessage = params.get("msg");

  if (!encodedMessage) {
    return null;
  }

  return decodeMessageFromURL(encodedMessage);
}
