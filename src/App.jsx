import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import HabitCard from './components/HabitCard'
import HabitCreate from './components/HabitCreationForm'
import {  habitDone } from './components/utils'
import './App.css'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
)

function App() {
  const [habits, setHabits] = useState([])
  const [isFormOpen, setFormOpen] = useState(false)

  useEffect(() => {
    getHabits()
  }, [])

  async function getHabits() {
    const { data, error } = await supabase
    .from('habits')
    .select('*, completions(*)')

    if (error) {
      console.error(error)
      return
    }

    setHabits(data)
  }

  const doneHabits = habits.filter((habit) => habitDone(habit))
  const todoHabits = habits.filter((habit) => !habitDone(habit))
  
  return (
    <>
      <div className="page">
      <div className="header">
        <h1>HABIT TRACKER</h1>
        <button className="create" onClick={()=>{ setFormOpen(!isFormOpen) }}>Create habit</button>
      </div>
      <div className="body">
        <div>
          <h2>To Do</h2>
          <ul>
            {todoHabits.map((habit) => (<HabitCard key={habit.id} habit={habit} onCompleted={getHabits}/>))}
          </ul>
        </div>
        <div>
          <h2>Done</h2>
          <ul>
            {doneHabits.map((habit) => (<HabitCard key={habit.id} habit={habit} onCompleted={getHabits}/>))}
          </ul>
        </div>
      </div>
    </div>

    {isFormOpen && (
      <div className="formToOverlay">
        <div className="inner">
          <div className="modalHeader">
            <legend>Habit creation</legend>
            <button className="circleButton" onClick={() => setFormOpen(!isFormOpen)}>x</button>
          </div>
          <HabitCreate/>
        </div>
      </div>
    )}
    </>
  )
}


export default App