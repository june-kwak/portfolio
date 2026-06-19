"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const TALLY_FORM_ID = "xXgJDr";
const TALLY_EMBED_SRC = `https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;
const WIDGET_SCRIPT_SRC = "https://tally.so/widgets/embed.js";

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

function loadTallyEmbeds() {
  if (typeof window.Tally !== "undefined") {
    window.Tally.loadEmbeds();
    return;
  }

  document
    .querySelectorAll<HTMLIFrameElement>("iframe[data-tally-src]:not([src])")
    .forEach((iframe) => {
      iframe.src = iframe.dataset.tallySrc ?? "";
    });
}

export function ContactTallyForm() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const load = () => loadTallyEmbeds();

    if (typeof window.Tally !== "undefined") {
      load();
    } else if (document.querySelector(`script[src="${WIDGET_SCRIPT_SRC}"]`) === null) {
      const script = document.createElement("script");
      script.src = WIDGET_SCRIPT_SRC;
      script.onload = load;
      script.onerror = load;
      document.body.appendChild(script);
    } else {
      load();
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://tally.so") return;
      if (typeof event.data !== "string" || !event.data.includes("Tally.FormSubmitted")) {
        return;
      }

      try {
        const { payload } = JSON.parse(event.data) as {
          payload?: { formId?: string };
        };
        if (payload?.formId === TALLY_FORM_ID) {
          setSubmitted(true);
        }
      } catch {
        // ignore malformed messages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-[240px] flex-col items-center justify-center px-4 py-14 text-center sm:min-h-[280px] sm:py-16"
      >
        <CheckCircle2 className="size-10 text-blush-deep" aria-hidden />
        <p className="mt-4 max-w-sm text-base leading-7 text-ink sm:text-lg">
          문의가 접수됐어요. 확인 후 답장드릴게요.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full min-w-0 overflow-hidden rounded-sm",
        "min-h-[280px] sm:min-h-[320px]",
      )}
    >
      <iframe
        data-tally-src={TALLY_EMBED_SRC}
        loading="lazy"
        width="100%"
        height="320"
        className="block w-full border-0"
        title="연락주세요"
      />
    </div>
  );
}
