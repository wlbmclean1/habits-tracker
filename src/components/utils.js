import { startOfWeek, isAfter, isSameMonth, startOfMonth, parseISO } from "date-fns";

export function countThisPeriod(habit)
{
    const now = new Date()
    console.log(now)
    if (habit.frequency_type == "weekly"){
        const mon = startOfWeek(now, { weekStartsOn: 1 })        
        return habit.completions.filter(entry => 
            isAfter(parseISO(entry.completed_at), mon)).length;
    }
    else if (habit.frequency_type == "monthly"){
        const start = startOfMonth(now)
        
        return filtered = habit.completions.filter(entry =>
            isSameMonth(start,parseISO(entry.completed_at))).length;
    }
}

export function habitDone(habit){
    return countThisPeriod(habit)>=habit.target_count
}