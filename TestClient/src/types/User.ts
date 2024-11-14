import { LocationsEnum } from "./LocationEnum";
import { OrganizationEnum } from "./OrganizationEnum";

export default interface IUser{
    Id?:string
    Name: string;
    Password: string;
    Organization: OrganizationEnum;
    Location?: LocationsEnum;
    
}
