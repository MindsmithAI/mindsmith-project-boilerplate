'use client'
import React, { useEffect } from 'react'
import TableCell from './TableCell'
import { Button } from '@/components/ui/button'
import { ConvertMarkDownToTable, ConvertTableToMarkDown } from '../services/TableService'
import { useRouter } from 'next/navigation'

interface Cell {
  value: string
}

interface TableProps {
  tableMarkdown: string
  defaultHasHeader?: boolean
  defaultHasColumnHeader?: boolean
  defaultWidths?: number[]
  id?: string
  editMode?: boolean
}

const Table: React.FC<TableProps> = ({tableMarkdown, defaultHasHeader, defaultHasColumnHeader, defaultWidths, id, editMode}) => {
  const [rows, setRows] = React.useState<Cell[][]>([])
  const [widths, setWidths] = React.useState<number[]>(defaultWidths || [])
  const [hasHeader, setHasHeader] = React.useState<boolean>(defaultHasHeader || false)
  const [hasColumnHeader, setHasColumnHeader] = React.useState<boolean>(defaultHasColumnHeader || false)
  const router = useRouter();

  React.useEffect(() => {
    if (tableMarkdown) {
      const dataRows = ConvertMarkDownToTable(tableMarkdown)
      setRows(dataRows)
      if (!defaultWidths) {
        setWidths(dataRows[0].map(() => {
          return 100
        }))
      }
    }
  }, [defaultWidths, tableMarkdown])


  useEffect(() => {
    if (id){
      const markdown = ConvertTableToMarkDown(rows)
      const json = JSON.stringify({ id, value: markdown, header: hasHeader, colHeader: hasColumnHeader, widths: widths });
      localStorage.setItem(id, json)
    }
  }, [rows, widths, hasHeader, hasColumnHeader])

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
                className={(hasHeader || (index === 0 && hasColumnHeader)) ? 'table-header' : 'table-cell'}
                updateCell={handleUpdateCell}
                handleSetWidth={handleSetWidth}
                handleMoveColumn={handleMoveColumn}
                handleMoveRow={handleMoveRow}
                handleAddColumn={handleAddColumn}
                handleAddRow={handleAddRow}
                handleDeleteColumn={handleDeleteColumn}
                handleDeleteRow={handleDeleteRow}
                handleToggleColumnHeader={() => setHasColumnHeader(!hasColumnHeader)}
                handleToggleHeader={() => setHasHeader(!hasHeader)}
                editMode={editMode}
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
                  className={(index == 0 && hasColumnHeader) ? 'table-header' : 'table-cell'}
                  handleSetWidth={handleSetWidth}
                  handleMoveColumn={handleMoveColumn}
                  handleMoveRow={handleMoveRow}
                  handleAddColumn={handleAddColumn}
                  handleAddRow={handleAddRow}
                  handleDeleteColumn={handleDeleteColumn}
                  handleDeleteRow={handleDeleteRow}
                  handleToggleColumnHeader={() => setHasColumnHeader(!hasColumnHeader)}
                  handleToggleHeader={() => setHasHeader(!hasHeader)}
                  editMode={editMode}
                />
              ))}
            </tr>
            ))}
        </tbody>
      </table>
      {rows.length > 0 && editMode && (
        <>
          <Button
            className="mt-4 mr-4"
            onClick={() => {
              router.push(`/table/${id}`);
            } }
          >
            Preview Table
          </Button>
          <Button
            variant="secondary"
            className="mt-4 mr-4"
            onClick={() => {
              const markdown = ConvertTableToMarkDown(rows)
              navigator.clipboard.writeText(markdown)
            } }
          >
            Copy table to clipboard
          </Button>
          <Button
            variant="destructive"
            className="mt-4 mr-4"
            onClick={() => {
              localStorage.removeItem(id || '');
              router.push(`/table/new`);
            } }
          >
            Delete Table
          </Button>
        </>
      )}
    </div>
  )
}

export default Table