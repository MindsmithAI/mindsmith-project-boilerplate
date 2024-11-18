'use client'
import React from 'react';
import TableCell from './TableCell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TableProps {
  tableData: string
}

const Table: React.FC<TableProps> = ({tableData}) => {
  const [headers, setHeaders] = React.useState<{ title: string, width: number }[]>([]);
  const [rows, setRows] = React.useState<{value: string, width: number}[][]>([]);

  React.useEffect(() => {
    if (tableData) {
      const lines = tableData.split('\n');
      const headerLine = lines[0];
      const headerTitles = headerLine.split('|').map(title => title.trim()).filter(title => title);
      setHeaders(headerTitles.map(title => ({ title: title, width: 100 })));
      const dataRows = lines.slice(2);
      
      setRows(dataRows.map(row => {
        const values = row.split('|').map(value => ({ value: value.trim(), width: 100 })).filter(value => value.value);
        return values;
      }));
      
    }
  }, [tableData]);

  function handleAddColumn(): void {
    setHeaders([...headers, { title: 'New Column', width: 100 }]);
    setRows(rows.map(row => [...row, {value: '', width: 100}]));
  }

  function handleAddRow(): void {
    setRows([...rows, Array(headers.length).fill('')]);
  }

  const handleUpdateHeader = (cellIndex: number, rowIndex: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[cellIndex] = { title: value, width: 100 };
    setHeaders(newHeaders);
  }

  const handleUpdateCell = (rowIndex: number, cellIndex: number, value: string) => {
    const newRows = [...rows];
    newRows[rowIndex][cellIndex] = {value: value, width: 100};
    setRows(newRows);
  }

  return (
    <div>
      <Card >
        <table style={{width: '800px', tableLayout: 'fixed'}}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <TableCell key={index} index={index} rowIndex={0} content={header.title} width={header.width} className={'table-header'} updateCell={handleUpdateHeader} />
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, index) => (
                  <TableCell key={index} index={index} rowIndex={rowIndex} updateCell={handleUpdateCell} content={cell.value} width={cell.width} className={'table-cell'} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Button className="mt-4 mr-4" onClick={handleAddColumn}>Add Column</Button>
      <Button className="mt-4" onClick={handleAddRow}>Add Row</Button>
    </div>
  );
};

export default Table;