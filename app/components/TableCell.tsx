import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TableCellProps {
  content: string | number
  className?: string
  index: number
  rowIndex: number
  width: number
  updateCell: (rowIndex: number, cellIndex: number, value: string) => void
  handleSetWidth: (index: number, width: number) => void
  handleMoveColumn: (index: number, direction: 'left' | 'right') => void
  handleMoveRow: (index: number, direction: 'up' | 'down') => void
  handleAddColumn: (index: number) => void
  handleAddRow: (index: number) => void
  handleDeleteColumn: (index: number) => void
  handleDeleteRow: (index: number) => void
}

const TableCell: React.FC<TableCellProps> = ({ content, className, width, updateCell, handleDeleteColumn, handleDeleteRow, handleAddColumn, handleAddRow, handleSetWidth, handleMoveColumn, handleMoveRow, rowIndex, index }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleDoubleClick = () => {
    setIsEditing(true)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCell(rowIndex, index, e.target.value)
  };

  const handleBlur = () => {
    setIsEditing(false)
  };

  const handleMouseDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = width + (moveEvent.clientX - startX) *2
      if (newWidth > 50)
        handleSetWidth(index, newWidth)
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    };

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsMenuOpen(true)
  }

  return (
    <td
      className={className}
      onContextMenu={handleRightClick}
      onDoubleClick={handleDoubleClick}
      style={{ position: "relative", width: `${width}px` }}
    >
      {isEditing ? (
        <input
          type="text"
          value={content}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        content
      )}
    <div
      style={{
        position: "absolute",
        top: 0,
        right: "-3px",
        bottom: 0,
        width: "5px",
        cursor: "col-resize",
        zIndex: 5,
      }}
      onMouseDown={(e) => {
        handleMouseDrag(e)
      }}
    />
    <DropdownMenu open={isMenuOpen} onOpenChange={() => setIsMenuOpen(false)}>
      <DropdownMenuTrigger asChild>
        <div className={'menu'}></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleMoveRow(rowIndex, 'up')}>Move Up</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoveRow(rowIndex, 'down')}>Move Down</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoveColumn(index, 'left')}>Move Left</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoveColumn(index, 'right')}>Move Right</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleAddRow(rowIndex)}>Insert Row Above</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAddRow(rowIndex + 1)}>Insert Row Below</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAddColumn(index)}>Insert Column Left</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAddColumn(index + 1)}>Insert Column Right</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDeleteRow(rowIndex)}>Delete Row</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDeleteColumn(index)}>Delete Column</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </td>
  )
}
  

export default TableCell