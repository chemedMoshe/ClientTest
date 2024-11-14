import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchLogin } from "../redux/slice/userSlice";

export default function Login() {
    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user)
    
  return (
    <div className="login">
        <h1>Login</h1>
        <label> Name:
                <input type="text"
                    onChange={(e) => setName(e.target.value)} />
            </label>
            <label>Password:
                <input type="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </label>
        <button className="login-button"
        onClick={()=> dispatch(fetchLogin({username,password}))}
        disabled={!username || !password}
        >Login</button>
        {user.error && <h1>{"please try again"}</h1>}
    </div>
  )
}
