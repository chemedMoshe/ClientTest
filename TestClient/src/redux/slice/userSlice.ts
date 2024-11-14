import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DataStatus, userState } from "../../types/redux"
import IUser from "../../types/User"

const initialData: userState = {
    error: undefined,
    status: DataStatus.IDLE,
    user: null

}

export const fetchLogin = createAsyncThunk('user/login',
    async (user: { username: string, password: string }, thunkApi) => {
        try {
            const res: Response = await fetch('http://localhost:2029/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    user
                )
            })
            if (!res.ok) {
                return thunkApi.rejectWithValue('Cannot login, please try again')
            }
            const data = await res.json()

            localStorage.setItem('token', data.token)

            return thunkApi.fulfillWithValue(data)
        } catch (error) {
            return thunkApi.rejectWithValue('Cannot login, please try again')
        }
    }
)


export const fetchRegister = createAsyncThunk('user/register',
    async (user: IUser, thunkApi) => {
        try {
            const res: Response = await fetch('http://localhost:2029/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
            if (!res.ok) {
                thunkApi.rejectWithValue('Cannot register, please try again')
            }
            const data = await res.json()
            return thunkApi.fulfillWithValue(data)
        } catch (error) {
            thunkApi.rejectWithValue('Cannot register, please try again')
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: initialData,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
        builder.addCase(fetchLogin.pending, (state, action) => {
            state.status = DataStatus.LOADING
            state.error = undefined
            state.user = null
        })
            .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.status = DataStatus.SUCCESS
                state.error = undefined
                state.user = action.payload as unknown as IUser
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.status = DataStatus.FAILED
                state.error = action.error as string
                state.user = null
            })
            .addCase(fetchRegister.pending, (state, action) => {
                state.status = DataStatus.LOADING
                state.user = null
                state.error = undefined

            })
            .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.status = DataStatus.SUCCESS
                state.user = action.payload!
                state.error = undefined


            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.status = DataStatus.FAILED
                state.error = action.error as string

            })
    }
})

export default userSlice