"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const MAX_LENGTH = 100;

type Comment = {
  id: number;
  text: string;
  createdAt: string;
};

function formatTime(isoString: string) {
  const d = new Date(isoString);
  return d.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function CommentSection() {
  const [draft, setDraft] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const remaining = MAX_LENGTH - draft.length;
  const canSubmit = draft.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setComments((prev) => [
      ...prev,
      { id: Date.now(), text: draft.trim(), createdAt: new Date().toISOString() },
    ]);
    setDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit();
  };

  return (
    <section
      id="comments"
      aria-labelledby="comments-heading"
      className="relative mx-auto w-full max-w-3xl px-6 pb-24 sm:pb-32"
    >
      <div className="torn-paper relative rotate-1 px-8 py-10 sm:px-12 sm:py-14">
        <div className="-rotate-1">
          <p className="font-display text-lg text-blush-deep">Leave a note</p>
          <h2
            id="comments-heading"
            className="mt-1 font-display text-4xl text-ink sm:text-5xl"
          >
            코멘트
          </h2>

          {/* 입력 영역 */}
          <div className="mt-8">
            <div className="relative">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value.slice(0, MAX_LENGTH))}
                onKeyDown={handleKeyDown}
                placeholder="방문자 노트를 남겨주세요 :)"
                maxLength={MAX_LENGTH}
                rows={3}
                className="resize-none border-blush-deep/20 bg-blush/20 text-sm text-ink placeholder:text-ink/35 focus-visible:border-blush-deep/50 focus-visible:ring-blush-deep/20"
              />
              <span
                className={`absolute bottom-2.5 right-3 text-xs tabular-nums transition-colors ${
                  remaining <= 10 ? "text-blush-deep" : "text-ink/30"
                }`}
              >
                {remaining}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-ink/40">⌘ Enter로도 남길 수 있어요</p>
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                size="sm"
                className="gap-1.5 rounded-full border border-blush-deep/20 bg-blush-deep px-4 text-xs text-paper shadow-[0_3px_0_oklch(0.52_0.16_350)] transition-transform hover:bg-blush-deep/90 active:translate-y-px active:shadow-none disabled:opacity-40"
              >
                <Send className="size-3" />
                남기기
              </Button>
            </div>
          </div>

          {/* 코멘트 목록 */}
          {comments.length > 0 && (
            <ul className="mt-8 space-y-3" aria-label="남겨진 코멘트 목록">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="rounded-sm border border-blush-deep/10 bg-blush/30 px-4 py-3"
                >
                  <p className="text-sm leading-6 text-ink/85">{comment.text}</p>
                  <p className="mt-1 text-xs text-ink/35">{formatTime(comment.createdAt)}</p>
                </li>
              ))}
            </ul>
          )}

          {comments.length === 0 && (
            <p className="mt-8 text-center text-xs text-ink/30">
              아직 남겨진 코멘트가 없어요. 첫 번째 노트를 써보세요!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
