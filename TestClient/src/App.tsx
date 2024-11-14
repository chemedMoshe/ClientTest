import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Pages from "./components/Pages";
import Register from "./components/Register";
import { useAppSelector } from "./redux/store";

export default function App() {
  const user = useAppSelector(state => state.user.user)
  return (
    <div className="app">
     
      <div className="nav">
      <NavBar/>
      </div>
      <div className="page">
      <Pages/>
      </div>
    </div>
  )
}
