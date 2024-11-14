import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchMunition } from "../redux/slice/munitionsSlice";

export default function IdfRoom() {
  const user = useAppSelector(state => state.user.user)
  const munitions = useAppSelector(state => state.munitions.munitions)
  const accountDispatch = useAppSelector(state => state.munitions.accountDispatch)
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(user);
    
    dispatch(fetchMunition(user?.Id!))
  }, [accountDispatch])

  return (
    <div>
      {user && <h1>{user.Location}</h1>}
      {munitions && munitions.map(x => <div
        key={x.name}
      >
        {x.name} {x.amount}
        <button

        >Dispatch</button>
      </div>)}
    </div>
  )
}
