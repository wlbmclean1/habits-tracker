
import { createClient } from '@supabase/supabase-js'


const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
)

export default function HabitCreate() {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { data, error } = await supabase
      .from('habits')
      .insert({
        name: formData.get("name"),
        frequency_type: formData.get("radio"),
        target_count: formData.get("target")
      });

    if (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <br></br>
        <label className='lab' htmlFor="name">Enter name: </label>
        <input type="text" name="name" id="name" required />
        <br></br>
        <br></br>
        <label className='lab' htmlFor="radio">Enter frequency: </label>
        <div className='radioButs'>
          <label><input type="radio" name="radio" value="weekly" />Weekly</label>
          <label><input type="radio" name="radio" value="monthly" />Monthly</label>          
        </div>
        <br></br>
        <label className='lab' htmlFor="target">Enter target count: </label>
        <input type="number" name="target" id="target" />
        <button type="submit">Create</button>
      </form>
    </>
  );
}

