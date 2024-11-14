import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DataStatus, MunitionState } from "../../types/redux"

const initialData: MunitionState = {
    status: DataStatus.IDLE,
    error: undefined,
    munitions: null,
    dispatch: []
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


export const fetchDispatch = createAsyncThunk('munition/dispatch',
    async (iduser: string, thunkApi) => {
        try {

            const res: Response = await fetch('http://localhost:2029/api/dispatch/', {
                method: 'PUT',
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



const minitionSlice = createSlice({
    name: 'munition',
    initialState: initialData,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<MunitionState>) => {
        builder.addCase(fetchMunition.pending, (state, action) => {
            state.status = DataStatus.LOADING
            state.error = undefined
            state.munitions = null
        })
            .addCase(fetchMunition.fulfilled, (state, action: PayloadAction<{ data: { name: string, amount: number } }>) => {

                state.status = DataStatus.SUCCESS
                state.error = undefined
                state.munitions = action.payload.data as unknown as [{ name: string, amount: number }]
            })
            .addCase(fetchMunition.rejected, (state, action) => {
                state.status = DataStatus.FAILED
                state.error = action.error as string
                state.munitions = null
            })
            .addCase(fetchDispatch.pending, (state, action) => {
                state.status = DataStatus.LOADING
                state.error = undefined
                
            })
            .addCase(fetchDispatch.fulfilled, (state, action: PayloadAction<{ data: [{ name: string, status: string }] }>) => {

                state.status = DataStatus.SUCCESS
                state.error = undefined
                state.dispatch = action.payload.data as unknown as [{ name: string, status: string }]
            })
    }
})


export default minitionSlice