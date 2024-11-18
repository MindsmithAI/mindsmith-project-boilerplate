import React, { useState } from 'react';

interface TableCellProps {
  content: string | number;
  className?: string;
  index: number;
  rowIndex: number;
  width: number;
  updateCell: (rowIndex: number, cellIndex: number, value: string) => void;
}

const TableCell: React.FC<TableCellProps> = ({ content, className, width }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content);
  const [widthState, setWidth] = useState(width);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <td className={className} onDoubleClick={handleDoubleClick} style={{ position: 'relative', width: `${widthState}px` }}>
      {isEditing ? (
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
      />
      ) : (
      value
      )}
      <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '5px',
        cursor: 'col-resize',
        zIndex: 1,
      }}
      onMouseDown={(e) => {
        const startX = e.clientX;

        const onMouseMove = (moveEvent: MouseEvent) => {
          const newWidth = widthState + (moveEvent.clientX - startX);
          console.log(newWidth);
          setWidth(newWidth);
        };

        const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }}
      />
    </td>
  );
};

export default TableCell;