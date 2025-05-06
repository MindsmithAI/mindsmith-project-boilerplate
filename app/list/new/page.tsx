"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { saveList, ListType } from "@/lib/listStorage";

const DEFAULT_TYPE: ListType = "arrow";

function parseMarkdownList(md: string): string[] {
  return md
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.startsWith("- "))
    .map(line => line.slice(2).trim())
    .filter(Boolean);
}

export default function NewListPage() {
  const router = useRouter();
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState("");

  const handleBlank = () => {
    const id = uuidv4();
    saveList({ id, type: DEFAULT_TYPE, items: [""] });
    router.push(`/list/${id}`);
  };

  const handleGenerate = () => {
    const items = parseMarkdownList(markdown);
    if (items.length === 0) {
      setError("Please enter a valid markdown list.");
      return;
    }
    const id = uuidv4();
    saveList({ id, type: DEFAULT_TYPE, items });
    router.push(`/list/${id}`);
  };

  return (
    <div className="max-w-md mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Create a New List</h1>
      <Button className="w-full" onClick={handleBlank}>From blank</Button>
      <div>
        <Textarea
          value={markdown}
          onChange={e => setMarkdown(e.target.value)}
          placeholder="Paste markdown list here...\n- item 1\n- item 2"
          rows={6}
        />
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        <Button className="mt-2 w-full" onClick={handleGenerate}>Generate</Button>
      </div>
    </div>
  );
}
