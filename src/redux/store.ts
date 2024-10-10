import { configureStore } from '@reduxjs/toolkit'
import propertySlice from './features/propertySlice'
import userSlice from './features/userSlice'
export type RootState = {
   user: ReturnType<typeof userSlice>;
 };

const store = configureStore({
   reducer: {
      properties: propertySlice,
      user: userSlice,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
   }),
})

export default store;