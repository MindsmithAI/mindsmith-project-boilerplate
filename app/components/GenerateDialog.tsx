import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { sampleTable } from '../services/TableService'

interface GenerateDialogProps {
  open: boolean
  onGenerate: (value: string) => void
}

const GenerateDialog: React.FC<GenerateDialogProps> = ({ onGenerate }) => {
  const [value, setValue] = React.useState<string>('')
  return (
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <DialogFooter>
          <Button type="submit" onClick={() => {onGenerate(value)}}>Generate Table</Button>
          
          <Button className={'ml-4'} variant="secondary" onClick={() => onGenerate(sampleTable)}>Or Use Template</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default GenerateDialog