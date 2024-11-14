import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchMunition } from "../redux/slice/munitionsSlice";
import { socket } from "../main";

export default function IdfRoom() {
  const user = useAppSelector(state => state.user.user)
  const munitions = useAppSelector(state => state.munitions.munitions)
  const accountDispatch = useAppSelector(state => state.munitions.accountDispatch)
  const dispatch = useAppDispatch();
 const [alarms , setAlarms] = useState('')

  socket.on('alarm', (data) => {
    setAlarms(data)
  })
  useEffect(() => {
    
    dispatch(fetchMunition(user?.Id!))
  }, [accountDispatch])

  return (
    <div>
      {alarms == user?.Location && <h1>'alarm', `alarm in {alarms}</h1>}
      {user && <h1>{user.Location}</h1>}
      {munitions && munitions.map(x => <div
        key={x.name}
      >
        {x.name} {x.amount}
        <button
onClick={()=>{}
 
      }
        >Dispatch</button>
      </div>)}
    </div>
  )
}
