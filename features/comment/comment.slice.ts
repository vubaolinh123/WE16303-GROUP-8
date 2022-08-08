import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { listComments,detailComments,addComments,editComments,removeComments } from '../../api/comment'
import { Comment } from '../../models/comment'


export const getListComments = createAsyncThunk(
    "comments/getListComments",
    async () => {
        const { data } = await listComments()
        return data
    }
)

export const getDetailComments = createAsyncThunk(
    "comments/getDetailUser",
    async (id: string) => {
        const { data } = await detailComments(id)
        return data
    }
)

export const addComment = createAsyncThunk(
    "comments/addComment",
    async (arr: Comment) => {
        const { data } = await editComments(arr)
        return data
    }
)

export const editComment = createAsyncThunk(
    "comments/editComment",
    async (arr: Comment) => {
        const { data } = await editComments(arr)
        return data
    }
)

export const removeComment = createAsyncThunk(
    'comments/removeComment',
    async (arr: any) => {
         if (Array.isArray(arr)) {
              console.log("arr > 0", arr);

              let dataRemove: Comment[] = []
              for (let i = 0; i < arr.length; i++) {
                   const { data } = await removeComments(arr[i].id)
                   dataRemove.push(data)
              }
              console.log("dataRemove", dataRemove);
              return dataRemove
         } else {
              console.log("arr", arr);

              const { data } = await removeComments(arr)
              return data
         }
    }
)



const userSlide = createSlice({
    name: "users",
    initialState: {
        value: [],
        detail: {},
        breadcrumb: ""
    },
    reducers: {
        changeBreadcrumb(state: any, action: any) {
            state.breadcrumb = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getListComments.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(getDetailComments.fulfilled, (state, action) => {
            state.detail = action.payload
        })
        builder.addCase(addComment.fulfilled, (state: any, action) => {
            state.value = [...state.value, action.payload]
            
       })
        builder.addCase(editComment.fulfilled, (state: any, action) => {
            state.value = state.value.map((item: Comment) => item._id === action.payload._id ? action.payload : item)
        })
        builder.addCase(removeComment.fulfilled, (state: any, action: any) => {
            if (Array.isArray(action.payload)) {
                 const payload = {
                      excludeIds: action.payload.map((item: any) => {
                           return item._id
                      })
                 }
                 console.log("payload", payload);
                 state.value = state.value.filter((item: any) => !payload.excludeIds.includes(item._id))
                 console.log("state.value", state.value);
            } else {
                 state.value = state.value.filter((item: any) => item._id !== action.payload._id)
            }

       })
    },
})

export const { changeBreadcrumb } = userSlide.actions

export default userSlide.reducer

