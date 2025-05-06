"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { getList, ListData } from "@/lib/listStorage";
import { Button } from "@/components/ui/button";
import List from "@/app/components/List";

export default function ListPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const listId = params?.listId as string;
  const [list, setList] = useState<ListData | null>(null);

  useEffect(() => {
    if (listId) {
      const l = getList(listId);
      if (l) setList(l);
    }
  }, [listId]);

  if (!list) return <div className="p-8 text-center">Loading...</div>;


  return (
    <div className="max-w-4xl mx-auto py-10 px-2">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="outline" onClick={() => router.push(`/list/${listId}`)}>
          Edit
        </Button>
        <h1 className="text-2xl font-bold flex-1">List Preview</h1>
      </div>
      <div>
        <List
          items={list.items}
          variant={list.type}
          width="100%"
          height={400} />
      </div>
    </div>
  );
}
