"use client";

import { useEffect } from "react";
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const btn =
  "rounded-md px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40";
const on = "bg-slate-900 text-white hover:bg-slate-900";

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your article content...",
}: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        link: { openOnClick: false, autolink: true },
      }),
      Image,
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none min-h-[360px] px-4 py-3 outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.isEmpty ? "" : editor.getHTML());
    },
  });

  // sync when parent loads/changes the value (e.g. edit existing post)
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML() && !(editor.isEmpty && !value)) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  const s = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: !!editor?.isActive("bold"),
      italic: !!editor?.isActive("italic"),
      underline: !!editor?.isActive("underline"),
      strike: !!editor?.isActive("strike"),
      h2: !!editor?.isActive("heading", { level: 2 }),
      h3: !!editor?.isActive("heading", { level: 3 }),
      h4: !!editor?.isActive("heading", { level: 4 }),
      ul: !!editor?.isActive("bulletList"),
      ol: !!editor?.isActive("orderedList"),
      quote: !!editor?.isActive("blockquote"),
      code: !!editor?.isActive("codeBlock"),
      link: !!editor?.isActive("link"),
    }),
  });

  if (!editor || !s) return null;
  const c = () => editor.chain().focus();
  const t = (a: boolean) => `${btn} ${a ? on : ""}`;

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL (leave empty to remove)", prev || "https://");
    if (url === null) return;
    if (url === "") c().extendMarkRange("link").unsetLink().run();
    else c().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    const src = window.prompt("Image URL");
    if (src) c().setImage({ src, alt: window.prompt("Alt text (SEO)") || "" }).run();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50 p-1.5">
        <button type="button" className={btn} onClick={() => c().undo().run()}>Undo</button>
        <button type="button" className={btn} onClick={() => c().redo().run()}>Redo</button>
        <span className="mx-1 h-5 w-px bg-slate-200" />
        <button type="button" className={t(s.h2)} onClick={() => c().toggleHeading({ level: 2 }).run()}>H2</button>
        <button type="button" className={t(s.h3)} onClick={() => c().toggleHeading({ level: 3 }).run()}>H3</button>
        <button type="button" className={t(s.h4)} onClick={() => c().toggleHeading({ level: 4 }).run()}>H4</button>
        <span className="mx-1 h-5 w-px bg-slate-200" />
        <button type="button" className={t(s.bold)} onClick={() => c().toggleBold().run()}><b>B</b></button>
        <button type="button" className={t(s.italic)} onClick={() => c().toggleItalic().run()}><i>I</i></button>
        <button type="button" className={t(s.underline)} onClick={() => c().toggleUnderline().run()}><u>U</u></button>
        <button type="button" className={t(s.strike)} onClick={() => c().toggleStrike().run()}><s>S</s></button>
        <span className="mx-1 h-5 w-px bg-slate-200" />
        <button type="button" className={t(s.ul)} onClick={() => c().toggleBulletList().run()}>• List</button>
        <button type="button" className={t(s.ol)} onClick={() => c().toggleOrderedList().run()}>1. List</button>
        <button type="button" className={t(s.quote)} onClick={() => c().toggleBlockquote().run()}>Quote</button>
        <button type="button" className={t(s.code)} onClick={() => c().toggleCodeBlock().run()}>Code</button>
        <span className="mx-1 h-5 w-px bg-slate-200" />
        <button type="button" className={btn} onClick={() => c().setTextAlign("left").run()}>Left</button>
        <button type="button" className={btn} onClick={() => c().setTextAlign("center").run()}>Center</button>
        <span className="mx-1 h-5 w-px bg-slate-200" />
        <button type="button" className={t(s.link)} onClick={setLink}>Link</button>
        <button type="button" className={btn} onClick={addImage}>Image</button>
        <button type="button" className={btn} onClick={() => c().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>Table</button>
        <button type="button" className={btn} onClick={() => c().setHorizontalRule().run()}>—</button>
        <button type="button" className={btn} onClick={() => c().unsetAllMarks().clearNodes().run()}>Clear</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}