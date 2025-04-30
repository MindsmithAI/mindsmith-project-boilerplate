import { useState } from "react";
import TextEditorDisplayer, {
  BlockMode,
} from "../components/TextEditorDisplayer";

export default function DemoPage() {
  const [editorValue, setEditorValue] = useState<string>("");

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">TextEditorDisplayer Demo</h1>
      <div className="border rounded p-2 mb-4">
        <TextEditorDisplayer
          value={editorValue}
          onChange={setEditorValue}
          mode={BlockMode.EDIT}
          placeholder="Start typing here..."
          className="min-h-[100px]"
        />
      </div>
      <h2 className="text-lg font-semibold mb-2">State Value (JSON):</h2>
      <pre className="bg-gray-100 p-2 rounded border text-sm">
        {JSON.stringify(editorValue)}
      </pre>
    </div>
  );
}
