import { Card } from "@/components/ui/card";
import Table from "./components/Table";
import { Button } from "@/components/ui/button";


export default function Home() {
  const tableData = `| Name   | Age | City      |
  |--------|-----|-----------|
  | John   | 25  | New York  |
  | Jane   | 30  | San Francisco |
  | Bob    | 22  | Chicago   |`;
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Button className="mr-4">Reset Table</Button>
      <Table tableData={tableData}/>
    </div>
  );
}
