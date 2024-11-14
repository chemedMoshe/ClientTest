import IUser from "./User";

export enum DataStatus{
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    IDLE = 'IDLE'
}

export interface userState{
    error:string|undefined,
    status:DataStatus,
    user:IUser|null
}

export interface MunitionState  {
    status: DataStatus,
    error: undefined|string,
    munitions: null|[{name:string, amount:number}],
    dispatch:[{id:string,name:string,status:string}]|[]
    accountDispatch:number
    
}