import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { countThisPeriod , habitDone } from './utils'
import '../App.css'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
)

export default function HabitCard({habit, onCompleted}) {

  const completed = countThisPeriod(habit)
  let isDone = habitDone(habit)

  async function markDone() {
    const { error } = await supabase
      .from('completions')
      .insert({ habit_id: habit.id })

    if (error) {
      console.error(error)
      return
    }

    onCompleted()
  }

  return (
    <div className="card">
      <li><span class="highlight">Name:</span> {habit.name}</li>
      <li><span class="highlight">Target:</span> {habit.target_count} / {habit.frequency_type}</li>
      <button onClick={markDone}>Mark as done</button>
      <ProgressBar bgcolor="green" completed={(completed/habit.target_count)*100}/>
      <h5>{isDone ? "Well Done!" : "Keep going..."}</h5>
    </div>

  );

}

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;
  
  const containerStyles = {
    height: 20,
    width: '80%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: '2% 10% 2% 10%'
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    transition: 'width 1s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

