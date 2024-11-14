import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchDispatch, fetchMunition } from '../redux/slice/munitionsSlice';
import { useEffect } from 'react';

export default function ControlRoom() {
    const user = useAppSelector(state => state.user)
    const munitions = useAppSelector(state => state.munitions.munitions)
    const d = useAppSelector(state => state.munitions.dispatch)
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(fetchMunition(user?.user?.Id!))
      dispatch(fetchDispatch(user?.user?.Id!)).then(()=> console.log(d))
    },[])
       
      
        

  return (
    <div>
      {munitions && munitions.map(x => <p key={x.name}>{x.name} {x.amount} </p>)}
      {d && d.map(x => <p key={x.name}>{x.name} {x.status} </p>)}
    </div>
  )
}
