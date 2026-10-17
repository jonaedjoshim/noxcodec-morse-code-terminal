import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "vite";

let vite;
let morseUtils;

before(async () => {
  vite = await createServer({
    server: {
      middlewareMode: true,
    },
    appType: "custom",
  });

  morseUtils = await vite.ssrLoadModule("/src/utils/morseUtils.js");
});

after(async () => {
  await vite?.close();
});

// --------------------------------------------------
// TEXT TO MORSE TESTS
// --------------------------------------------------

test("converts SOS to Morse code", () => {
  assert.equal(morseUtils.textToMorse("SOS"), "... --- ...");
});

test("converts lowercase text", () => {
  assert.equal(morseUtils.textToMorse("hello"), ".... . .-.. .-.. ---");
});

test("converts words with separators", () => {
  assert.equal(
    morseUtils.textToMorse("HELLO WORLD"),
    ".... . .-.. .-.. --- / .-- --- .-. .-.. -..",
  );
});

test("handles multiple spaces", () => {
  assert.equal(
    morseUtils.textToMorse("HELLO     WORLD"),
    ".... . .-.. .-.. --- / .-- --- .-. .-.. -..",
  );
});

test("handles empty input", () => {
  assert.equal(morseUtils.textToMorse(""), "");
});

test("handles unsupported characters", () => {
  assert.equal(morseUtils.textToMorse("A😊B"), ".- -...");
});

// --------------------------------------------------
// MORSE TO TEXT TESTS
// --------------------------------------------------

test("decodes SOS", () => {
  assert.equal(morseUtils.morseToText("... --- ..."), "SOS");
});

test("decodes multiple words", () => {
  assert.equal(
    morseUtils.morseToText(".... . .-.. .-.. --- / .-- --- .-. .-.. -.."),
    "HELLO WORLD",
  );
});

test("handles extra spaces between Morse letters", () => {
  assert.equal(morseUtils.morseToText("...   ---   ..."), "SOS");
});

test("handles Unicode Morse symbols", () => {
  assert.equal(morseUtils.morseToText("··· ——— ···"), "SOS");
});

test("handles unknown Morse sequences", () => {
  assert.equal(morseUtils.morseToText("... invalid ..."), "S?S");
});

test("handles empty Morse input", () => {
  assert.equal(morseUtils.morseToText(""), "");
});

// --------------------------------------------------
// URL ENCODING TESTS
// --------------------------------------------------

test("encodes and decodes English messages", () => {
  const message = "HELLO AGENT";

  const encoded = morseUtils.encodeMessageToURL(message);

  const decoded = morseUtils.decodeMessageFromURL(encoded);

  assert.equal(decoded, message);
});

test("supports Unicode messages", () => {
  const message = "Hello বাংলাদেশ 🇧🇩";

  const encoded = morseUtils.encodeMessageToURL(message);

  const decoded = morseUtils.decodeMessageFromURL(encoded);

  assert.equal(decoded, message);
});

test("rejects invalid Base64", () => {
  assert.equal(morseUtils.decodeMessageFromURL("invalid%%%base64"), null);
});

// --------------------------------------------------
// ROUND-TRIP TEST
// --------------------------------------------------

test("round-trip text and Morse conversion", () => {
  const original = "NOXCODEC 2026";

  const encoded = morseUtils.textToMorse(original);

  const decoded = morseUtils.morseToText(encoded);

  assert.equal(decoded, original);
});
