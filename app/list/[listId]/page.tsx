"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getList, saveList, ListType, ListData } from "@/lib/listStorage";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { TextAreaEditor } from "@/lib/TextAreaEditor";
import List from "@/app/components/List";
import { Plus } from "lucide-react";

const LIST_TYPES: { label: string; value: ListType }[] = [
  { label: "Arrow", value: "arrow" },
  { label: "Circle", value: "circle" },
  { label: "Funnel", value: "funnel" },
  { label: "Pyramid", value: "pyramid" },
  { label: "Semicircle", value: "semicircle" },
];

export default function ListEditorPage() {
  const router = useRouter();
  const params = useParams();
  const listId = params?.listId as string;
  const [list, setList] = useState<ListData | null>(null);

  useEffect(() => {
    if (listId) {
      const l = getList(listId);
      if (l) setList(l);
    }
  }, [listId]);

  const handleItemsChange = (items: string[]) => {
    if (!list) return;
    const updated = { ...list, items };
    setList(updated);
    saveList(updated);
  };

  const handleTypeChange = (type: ListType) => {
    if (!list) return;
    const updated = { ...list, type };
    setList(updated);
    saveList(updated);
  };

  if (!list) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold flex-1">Edit List</h1>
        <Button variant="outline" onClick={() => router.push(`/list/${listId}/preview`)}>
          Preview
        </Button>
      </div>
      <div>
        <label className="block mb-1 font-medium">List Type</label>
        <Select value={list.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LIST_TYPES.map(t => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="flex items-center justify-center">
          {list.items.length === 0 && (
            <div className="text-sm text-gray-500 mb-2">
              No items yet. Please enter items below.
            </div>
          )}
          {list.items.length > 0 && (
            <List
              items={list.items}
              variant={list.type}
              width="100%"
              height={400}
              editable
              handleListChange={handleItemsChange}
            />
          )}
          <Button
            variant="outline"
            onClick={() => {
              const updatedItems = [...list.items, ""];
              handleItemsChange(updatedItems);
            }}
            className="rounded-full aspect-square"
          >
            <Plus size={16} className="-m-4"/>
          </Button>
        </div>
      </div>
    </div>
  );
}
