"use client";

import DOMPurify from "dompurify";
import type { Post } from "@/lib/types";

/* =========================================================
   HTML DETECTION
========================================================= */

const HAS_HTML =
  /<\/?(html|body|div|span|p|br|h[1-6]|ul|ol|li|strong|b|em|i|u|s|a|table|thead|tbody|tr|th|td|blockquote|hr|img)\b[^>]*>/i;

/* =========================================================
   DECODE HTML ENTITIES
========================================================= */

function decodeHtml(value: string): string {
  if (typeof document === "undefined") {
    return value;
  }

  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;

  return textarea.value;
}

/* =========================================================
   DECODE MULTIPLE TIMES
========================================================= */

function deepDecodeHtml(value: string): string {
  let result = value;

  for (let i = 0; i < 5; i++) {
    const decoded = decodeHtml(result);

    if (decoded === result) {
      break;
    }

    result = decoded;
  }

  return result;
}

/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   PLAIN TEXT → HTML
========================================================= */

function plainTextToHtml(value: string): string {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) => {
      const text = paragraph.trim();

      if (!text) {
        return "";
      }

      return `<p>${escapeHtml(text).replace(
        /\n/g,
        "<br />"
      )}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

/* =========================================================
   SANITIZE HTML
========================================================= */

function sanitize(html: string): string {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: {
      html: true,
    },
    ADD_ATTR: ["target", "rel"],
  });
}

/* =========================================================
   REMOVE ARTIFICIAL OUTER WRAPPER
========================================================= */

function unwrapHtml(html: string): string {
  let result = html.trim();

  /*
    Example:

    <p>
      <p>fghfghfg</p>
      <h2>Heading</h2>
    </p>

    becomes:

    <p>fghfghfg</p>
    <h2>Heading</h2>
  */

  const match = result.match(
    /^<(p|div)(?:\s[^>]*)?>([\s\S]*)<\/\1>$/i
  );

  if (match) {
    const inner = match[2].trim();

    if (HAS_HTML.test(inner)) {
      result = inner;
    }
  }

  return result;
}

/* =========================================================
   RECOVER ESCAPED HTML
========================================================= */

function recoverHtml(value: string): string | null {
  if (!value.trim()) {
    return null;
  }

  const decoded = deepDecodeHtml(value).trim();

  if (!HAS_HTML.test(decoded)) {
    return null;
  }

  const unwrapped = unwrapHtml(decoded);

  if (!unwrapped.trim()) {
    return null;
  }

  return unwrapped;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function PostContent({
  content,
}: {
  content: Post["content"];
}) {
  /* =======================================================
     EMPTY
  ======================================================== */

  if (
    content === null ||
    content === undefined
  ) {
    return null;
  }

  /* =======================================================
     OLD ARRAY FORMAT
  ======================================================== */

  if (Array.isArray(content)) {
    const items = content.filter(
      (item): item is string =>
        typeof item === "string" &&
        item.trim().length > 0
    );

    if (!items.length) {
      return null;
    }

    return (
      <div className="blog-content">
        {items.map((item, index) => {
          const recovered = recoverHtml(item);

          if (recovered) {
            return (
              <div
                key={index}
                dangerouslySetInnerHTML={{
                  __html: sanitize(recovered),
                }}
              />
            );
          }

          return (
            <p key={index}>
              {item}
            </p>
          );
        })}
      </div>
    );
  }

  /* =======================================================
     STRING
  ======================================================== */

  const text =
    typeof content === "string"
      ? content.trim()
      : "";

  if (!text) {
    return null;
  }

  /* =======================================================
     RECOVER ESCAPED / DOUBLE-ESCAPED HTML

     Example:

     <p>&lt;p&gt;fghfghfg&lt;/p&gt;</p>

     becomes:

     <p>fghfghfg</p>
  ======================================================== */

  const recoveredHtml = recoverHtml(text);

  if (recoveredHtml) {
    return (
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{
          __html: sanitize(recoveredHtml),
        }}
      />
    );
  }

  /* =======================================================
     OLD PLAIN TEXT
  ======================================================== */

  const html = plainTextToHtml(text);

  return (
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{
        __html: sanitize(html),
      }}
    />
  );
}