import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import { useEffect } from 'react';
import { OrganizationEnum } from '../types/OrganizationEnum';

export default function NavBar() {
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user)
   
   useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    //return user.user?.Location?
   // navigate('/'):navigate('/')
  }, [user])
   
  const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
        return (
    <div className="navbar">
            {localStorage.getItem('token') ? (
                <>
                    {user.user?.Organization== OrganizationEnum.IDF  && (
                        <NavLink to={"/idfroom"}>DefendPage</NavLink> )
                    }    
                    {!(user.user?.Organization== OrganizationEnum.IDF)  && (
                        <NavLink to={"/controlroom"}>AtteckPage</NavLink> )
                    }
                    <button
                    className='logout'
                     onClick={() =>logout()}>Logout</button>
                </>
            ) : (
                <>
                    <NavLink to={"/login"}>Login</NavLink>
                    <NavLink to={"/register"}>Register</NavLink>
                </>
            )}
        </div>
    );
}

