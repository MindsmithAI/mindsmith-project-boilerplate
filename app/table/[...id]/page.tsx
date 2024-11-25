"use client"
import React from 'react'
import { useParams } from "next/navigation"
import Table from '@/app/components/Table'

const TablePage: React.FC = () => {
    const params = useParams()
    let tableData
    try {
        tableData = JSON.parse(localStorage.getItem(params.id[0]) || '')
    } catch (error) {
        console.error('Error parsing table data from localStorage:', error)
        tableData = ''
    }
    const editMode = params.id[1] === 'edit'

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <Table 
                tableMarkdown={tableData.value} 
                defaultHasHeader={tableData.header} 
                defaultHasColumnHeader={tableData.colHeader}
                defaultWidths={tableData.widths}
                id={tableData.id}
                editMode={editMode}
            />
        </div>
    )
}

export default TablePage