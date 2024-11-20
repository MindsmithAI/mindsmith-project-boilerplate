'use client'
import React from 'react'
import TableCell from './TableCell'
import { Button } from '@/components/ui/button'
import { ConvertMarkDownToTable, ConvertTableToMarkDown } from '../services/TableService'
import { DialogHeader, DialogFooter } from '@/components/ui/dialog'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'

interface Cell {
  value: string
}

interface TableProps {
  tableMarkdown: string
}

const Table: React.FC<TableProps> = ({tableMarkdown}) => {
  const [rows, setRows] = React.useState<Cell[][]>([])
  const [widths, setWidths] = React.useState<number[]>([])
  const [tableData, setTableData] = React.useState<string>(tableMarkdown)
  const [dialogValue, setDialogValue] = React.useState<string>('')

  React.useEffect(() => {
    if (tableData) {
      const dataRows = ConvertMarkDownToTable(tableData)
      setRows(dataRows)

      setWidths(dataRows[0].map(() => {
        return 100
      }))
    }
  }, [tableData])

  const handleAddColumn = (index?: number) =>  {
    const columnIndex = index ?? rows[0].length
    const newRows = rows.map(row => {
      const newRow = [...row]
      newRow.splice(columnIndex, 0, { value: '' })
      return newRow
    });
    const newWidths = [...widths]
    newWidths.splice(columnIndex, 0, 100)
  
    setRows(newRows)
    setWidths(newWidths)
  }
  
  const handleAddRow = (index?: number) => {
    const rowIndex = index ?? rows.length
    const newRow = Array(rows[0].length).fill('')
    const newRows = [...rows]
    newRows.splice(rowIndex, 0, newRow)
  
    setRows(newRows)
  }
  
  const handleMoveRow = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === rows.length - 1)) {
      return
    }
  
    const newRows = [...rows]
    const offset = direction === 'up' ? -1 : 1
  
    const temp = newRows[index]
    newRows[index] = newRows[index + offset]
    newRows[index + offset] = temp
  
    setRows(newRows)
  };

  const handleMoveColumn = (index: number, direction: 'left' | 'right') => {
    if ((direction === 'left' && index === 0) || 
        (direction === 'right' && index === rows[0].length - 1)) {
      return
    }
  
    const newRows = [...rows]
    const offset = direction === 'left' ? -1 : 1
  
    newRows.forEach(row => {
      const temp = row[index]
      row[index] = row[index + offset]
      row[index + offset] = temp
    })
  
    setRows(newRows)
  };

  const handleUpdateCell = (rowIndex: number, cellIndex: number, value: string) => {
    const newRows = [...rows]
    newRows[rowIndex][cellIndex] = {value: value}
    setRows(newRows)
  }

  const handleSetWidth = (index: number, width: number) => {
    const newWidths = [...widths]
    newWidths[index] = width
    setWidths(newWidths)
  }

  let totalWidth = 0
  widths.forEach(element => {
    totalWidth += element
  })

  const handleDeleteColumn = (index: number) => {
    const newRows = rows.map(row => {
      const newRow = [...row]
      newRow.splice(index, 1)
      return newRow
    })
    const newWidths = [...widths]
    newWidths.splice(index, 1)
  
    setRows(newRows)
    setWidths(newWidths)
  }

  const handleDeleteRow = (index: number) => {
    const newRows = [...rows]
    newRows.splice(index, 1)
  
    setRows(newRows)
  }

  return (
    <div>
      <table style={{tableLayout: 'fixed', width: totalWidth}}>
        <thead>
          <tr>
            {rows[0]?.map((header, index) => (
              <TableCell
                key={index}
                index={index}
                rowIndex={0}
                content={header.value}
                width={widths[index]}
                className={'table-header'}
                updateCell={handleUpdateCell}
                handleSetWidth={handleSetWidth}
                handleMoveColumn={handleMoveColumn}
                handleMoveRow={handleMoveRow}
                handleAddColumn={handleAddColumn}
                handleAddRow={handleAddRow}
                handleDeleteColumn={handleDeleteColumn}
                handleDeleteRow={handleDeleteRow}
              />
            ))}
          </tr>
        </thead>
        <tbody>
            {rows.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex + 1}>
              {row.map((cell, index) => (
                <TableCell
                  key={index}
                  index={index}
                  rowIndex={rowIndex + 1}
                  updateCell={handleUpdateCell}
                  content={cell.value}
                  width={widths[index]}
                  className={'table-cell'}
                  handleSetWidth={handleSetWidth}
                  handleMoveColumn={handleMoveColumn}
                  handleMoveRow={handleMoveRow}
                  handleAddColumn={handleAddColumn}
                  handleAddRow={handleAddRow}
                  handleDeleteColumn={handleDeleteColumn}
                  handleDeleteRow={handleDeleteRow}
                />
              ))}
            </tr>
            ))}
        </tbody>
      </table>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">New Table</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Table</DialogTitle>
            <DialogDescription>
              You can generate a new table by pasting markdown here.
            </DialogDescription>
          </DialogHeader>
          <textarea
            rows={10}
            className="w-full p-2 border rounded"
            onChange={(e) => setDialogValue(e.target.value)}
          />
          <DialogFooter>
            <Button type="submit" onClick={() => {setTableData(dialogValue)}}>Generate Table</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {rows.length > 0 && (
        <Button
          variant="outline"
          className="mt-4 ml-4 mr-4"
          onClick={() => {
            const markdown = ConvertTableToMarkDown(rows)
            navigator.clipboard.writeText(markdown)
          }}
        >
          Copy table to clipboard
        </Button>
      )}
    </div>
  )
}

export default Table