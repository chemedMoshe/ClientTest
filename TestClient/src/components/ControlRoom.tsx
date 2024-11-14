import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchGetDispatch, fetchMunition, fetchNewDispatch } from '../redux/slice/munitionsSlice';
import { useEffect, useState } from 'react';
import { LocationsEnum } from '../types/LocationEnum';
import { socket } from '../main';

export default function ControlRoom() {
  const user = useAppSelector(state => state.user)
  const munitions = useAppSelector(state => state.munitions.munitions)
  const dispatchForUser = useAppSelector(state => state.munitions.dispatch)
  const accountDispatch = useAppSelector(state => state.munitions.accountDispatch)
  const dispatch = useAppDispatch();
  const [location, setlocation] = useState('')
  useEffect(() => {

    dispatch(fetchMunition(user?.user?.Id!))
    dispatch(fetchGetDispatch(user?.user?.Id!))
  }, [accountDispatch])

 
  return (
    <div>
      {munitions && munitions.map(x => <div
        key={x.name}
      >
        {x.name} {x.amount}
        <button
          onClick={() =>{
            socket.emit('dispatch',  location )
             dispatch(fetchNewDispatch({ 
              id: user?.user?.Id!,
               missiles: x.name, location 
              }
            ))
          }
          }
          disabled={!location && x.amount< 0}
        >Dispatch</button>
        </div>)}

      
        <label>Location:
        <select onChange={(e) => setlocation(e.target.value)}>
          <option disabled >Select</option>
          <option value={LocationsEnum.south}>South</option>
          <option value={LocationsEnum.north}>North</option>
          <option value={LocationsEnum.center}>Center</option>
          <option value={LocationsEnum.JudeaAndSamaria}>JudeaAndSamaria</option>
        </select>
        </label>
      
      {dispatchForUser && dispatchForUser.map((x, i) => <p key={i}>{x.name} {x.status} </p>)}
    </div>
  )
}
