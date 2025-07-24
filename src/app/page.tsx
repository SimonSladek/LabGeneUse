'use client'

import { useEffect, useState } from 'react'
// Opravit cestu a název importu
import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'  // ← ⬅️ DŮLEŽITÉ!

interface Task {
  id: string
  title: string
  is_complete: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    console.log('useEffect se spustil')  // Log při spuštění useEffect

    async function fetchTasks() {
      console.log('fetchTasks voláno')    // Log při volání fetchTasks

      const { data, error } = await supabase
      .from<'task', Task>('task')
     .select('*')


      console.log('Načtená data:', data)    // Log načtených dat
      console.log('Chyba:', error)          // Log případné chyby

      if (error) {
        console.error('Chyba při načítání úkolů:', error)
      } else {
        setTasks(data ?? [])
      }
    }

    fetchTasks()
  }, [])

  return (
    <main className="flex items-center justify-center min-h-screen bg-white text-black flex-col p-8">
      <h1 className="text-4xl font-bold mb-8">LabGeneUse Tasks 🚀</h1>

      {/* 🔹 Tlačítko s odkazem na novou stránku */}
      <Link href="/vedecci">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-8 hover:bg-blue-600 transition">
          Jít na vědce
        </button>
      </Link>

      {/* Seznam úkolů */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.is_complete} readOnly />
            <span className="ml-2">{task.title}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}