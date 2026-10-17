import { useEffect } from "react";

const DEFAULT_TITLE = "NoxCodec — Morse Code Intelligence Terminal";

const DEFAULT_DESCRIPTION =
  "NoxCodec is a free Morse code translator. Convert text to Morse, decode signals, play Morse audio, and explore interactive Morse code references.";

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}) {
  useEffect(() => {
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}
