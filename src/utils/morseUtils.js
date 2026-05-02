import morseData from '../data/morseData.json';

// Build reverse map: morse → character
const reverseMorse = Object.fromEntries(
  Object.entries(morseData).map(([char, code]) => [code, char])
);

/**
 * Convert plain text to Morse code.
 * Letters are separated by spaces, words by ' / '.
 */
export function textToMorse(text) {
  if (!text) return '';
  return text
    .toUpperCase()
    .split('')
    .map((char) => {
      if (morseData[char] !== undefined) return morseData[char];
      return ''; // unknown chars are dropped
    })
    .filter((code, i, arr) => {
      // collapse consecutive '/' (word separators)
      if (code === '/' && arr[i - 1] === '/') return false;
      return code !== '';
    })
    .join(' ')
    .replace(/ \/ /g, ' / ')
    .trim();
}

/**
 * Convert Morse code back to plain text.
 * Expects letters separated by spaces, words by ' / '.
 */
export function morseToText(morse) {
  if (!morse) return '';
  return morse
    .trim()
    .split(' / ')
    .map((word) =>
      word
        .split(' ')
        .map((code) => {
          if (code === '') return '';
          const char = reverseMorse[code];
          return char !== undefined ? char : '?';
        })
        .join('')
    )
    .join(' ');
}

/**
 * Encode a message to a safe URL parameter.
 */
export function encodeMessageToURL(message) {
  return encodeURIComponent(btoa(unescape(encodeURIComponent(message))));
}

/**
 * Decode a URL parameter back to a message.
 */
export function decodeMessageFromURL(encoded) {
  try {
    return decodeURIComponent(escape(atob(decodeURIComponent(encoded))));
  } catch {
    return null;
  }
}

/**
 * Generate a shareable URL with the encoded message.
 */
export function generateShareURL(message) {
  const encoded = encodeMessageToURL(message);
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}?msg=${encoded}`;
}

/**
 * Read message from the current URL parameters.
 */
export function readMessageFromURL() {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('msg');
  if (!encoded) return null;
  return decodeMessageFromURL(encoded);
}
