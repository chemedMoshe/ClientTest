import { useState } from "react"
import { OrganizationEnum } from "../types/OrganizationEnum"
import { useAppDispatch } from "../redux/store"
import { fetchRegister } from "../redux/slice/userSlice"
import { LocationsEnum } from "../types/LocationEnum"

export default function Register() {
    const [Name, setName] = useState('')
    const [Password, setPassword] = useState('')
    const [Organization, setOrganization] = useState('')
    const [Location, setlocation] = useState('')
    const dispatch = useAppDispatch();
    return (
        <div className='register'>
            <h1>Register</h1>
            <label> Name:
                <input type="text"
                    onChange={(e) => setName(e.target.value)} />
            </label>
            <label>Password:
                <input type="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                Organization:
                <select
                    onChange={(e) => setOrganization(e.target.value)}>
                    <option disabled>Select</option>
                    <option value={"IDF"}>IDF</option>
                    <option value={"Hezbollah"}>Hezbollah</option>
                    <option value={"Hamas"}>Hamas</option>
                    <option value={"IRGC"}>IRGC</option>
                    <option value={"Houthis"}>Houthis</option>
                </select>
            </label>
            {Organization == OrganizationEnum.IDF && <label>
                Location:
                <select
                    onChange={(e) => setlocation(e.target.value)}>
                    <option disabled>Select</option>
                    <option value="IDF - North">North</option>
                    <option value="IDF - South">South</option>
                    <option value="IDF - Center">Center</option>
                    <option value="IDF - West Bank">JudeaAndSamaria</option>
                </select>
            </label>}
            <button
                onClick={() => dispatch(fetchRegister(
                    {
                        Name: Name,
                        Password,
                        Organization: Organization as OrganizationEnum,
                        Location: Location as LocationsEnum
                    }))}
            >Register</button>
        </div>
    )
}




