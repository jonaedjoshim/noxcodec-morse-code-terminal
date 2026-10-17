export async function copyToClipboard(text) {
  if (typeof text !== "string" || !text) {
    return false;
  }

  try {
    if (!navigator.clipboard?.writeText) {
      return false;
    }

    await navigator.clipboard.writeText(text);

    return true;
  } catch (error) {
    console.warn("[NOXCODEC] Clipboard operation failed:", error);
    return false;
  }
}
