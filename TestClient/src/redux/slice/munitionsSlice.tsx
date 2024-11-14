import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DataStatus, MunitionState } from "../../types/redux"

const initialData: MunitionState = {
    status: DataStatus.IDLE,
    error: undefined,
    munitions: null,
    dispatch: [],
    accountDispatch:0
}

export const fetchMunition = createAsyncThunk('munition',
    async (iduser: string, thunkApi) => {
        try {

            const res: Response = await fetch('http://localhost:2029/api/details/users', {
                method: 'POST',
                headers: { authorization: localStorage.getItem('token')!, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idUser: iduser
                })

            })
            if (!res.ok) {
                return thunkApi.rejectWithValue('please try again')
            }

            const data = await res.json()

            return thunkApi.fulfillWithValue(data)
        } catch (error) {
            return thunkApi.rejectWithValue('Cannot get, please try again')
        }
    }
)


export const fetchGetDispatch = createAsyncThunk('munition/dispatch',
    async (iduser: string, thunkApi) => {
        try {

            const res: Response = await fetch('http://localhost:2029/api/dispatch/', {
                method: 'PUT',
                headers: { authorization: localStorage.getItem('token')!, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: iduser
                })

            })
            if (!res.ok) {
                return thunkApi.rejectWithValue('please try again')
            }

            const data = await res.json()

            return thunkApi.fulfillWithValue(data)
        } catch (error) {
            return thunkApi.rejectWithValue('Cannot get, please try again')
        }
    }
)

export const fetchNewDispatch = createAsyncThunk('munition/newdispatch',
    async (dispatch: { id: string, missiles: string,location:string }, thunkApi) => {
        try {

            const res: Response = await fetch('http://localhost:2029/api/dispatch/', {
                method: 'POST',
                headers: { authorization: localStorage.getItem('token')!, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: dispatch.id,
                    missiles: dispatch.missiles,
                    location:dispatch.location
                })

            })
            if (!res.ok) {
                return thunkApi.rejectWithValue('please try again')
            }
            const data = await res.json()
            return thunkApi.fulfillWithValue(data)
        } catch (error) {
            return thunkApi.rejectWithValue('Cannot get, please try again')
        }
                })
        
 

const minitionSlice = createSlice({
    name: 'munition',
    initialState: initialData,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<MunitionState>) => {
        builder.addCase(fetchMunition.pending, (state, action) => {
            state.status = DataStatus.LOADING
            state.error = undefined
           
        })
            .addCase(fetchMunition.fulfilled, (state, action: PayloadAction<{ data: { name: string, amount: number } }>) => {

                state.status = DataStatus.SUCCESS
                state.error = undefined
                state.munitions = action.payload.data as unknown as [{ name: string, amount: number }]
            })
            .addCase(fetchMunition.rejected, (state, action) => {
                state.status = DataStatus.FAILED
                state.error = action.error as string
              
            })
            .addCase(fetchGetDispatch.pending, (state, action) => {
                state.status = DataStatus.LOADING
                state.error = undefined

            })
            .addCase(fetchGetDispatch.fulfilled, (state, action: PayloadAction<[{ name: string, status: string }] >) => {

                state.status = DataStatus.SUCCESS
                state.error = undefined
                state.dispatch = action.payload as unknown as [{id:string, name: string, status: string }]
            })
            .addCase(fetchNewDispatch .pending, (state, action) => {
                state.status = DataStatus.LOADING
                state.error = undefined
               
            })
            .addCase(fetchNewDispatch.fulfilled, (state, action) => {

                state.status = DataStatus.SUCCESS
                state.error = undefined
                state.accountDispatch = state.accountDispatch+1
            })
            .addCase(fetchNewDispatch.rejected, (state, action) => {
               state.status = DataStatus.FAILED
                state.error = action.error as string
                
    })
    }
})


export default minitionSlice