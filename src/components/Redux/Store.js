import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slice/userSlice'

const Store=configureStore({
    reducer:{
       userSlice: userSlice,
    //    authSlice:authSlice,
    //    contactSlice : contactSlice,
    //    homeSlice : homeSlice
    },
})

export default Store