'use client'
import GenerateDialog from "../../components/GenerateDialog"
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'


export default function Home() {
  const router = useRouter()
  
  const handleGenerateNewTable = (value: string) => {
    const id = uuidv4()
    const json = JSON.stringify({ id, value, header: true, colHeader: false })
    
    localStorage.setItem(id, json)
    router.push(`/table/${id}/edit`)
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <GenerateDialog open={false} onGenerate={handleGenerateNewTable} />
    </div>
  );
}
