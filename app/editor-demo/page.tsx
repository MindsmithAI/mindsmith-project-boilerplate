"use client";

import { useState } from "react";
import TextEditorDisplayer, {
  BlockMode,
} from "../components/TextEditorDisplayer";

export default function EditorDemo() {
  const [text, setText] = useState("Try typing here...");
  const [mode, setMode] = useState<BlockMode>(BlockMode.EDIT);

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Text Editor Demo</h1>
        <p className="mb-6">
          This page demonstrates the TextEditorDisplayer component in different
          modes.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setMode(BlockMode.EDIT)}
            className={`px-4 py-2 rounded ${
              mode === BlockMode.EDIT
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Edit Mode
          </button>
          <button
            onClick={() => setMode(BlockMode.VIEW)}
            className={`px-4 py-2 rounded ${
              mode === BlockMode.VIEW
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            View Mode
          </button>
        </div>

        <div className="border p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">
            Currently in: {BlockMode[mode]} mode
          </h2>
          <TextEditorDisplayer
            value={text}
            onChange={setText}
            mode={mode}
            className="w-full p-2"
            placeholder="Type something here..."
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Current Text Value:</h2>
        <pre className="bg-white p-2 rounded border whitespace-pre-wrap">
          {text}
        </pre>
      </div>
    </div>
  );
}
