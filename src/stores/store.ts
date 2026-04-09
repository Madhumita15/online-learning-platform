import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../stores/slices/auth.slice'
import courseReducer from '../stores/slices/course.slice'
import categoryReducer from '../stores/slices/category.slice'
import blogReducer from '../stores/slices/blog.slice'
import instructorReducer from '../stores/slices/instructor.slice'
import userReducer from '../stores/slices/user.slice'
import enrollmentReducer from '../stores/slices/enrollment.slice'
import wishlistReducer from '../stores/slices/wishlist.slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        course: courseReducer,
        category: categoryReducer,
        blog: blogReducer,
        instructor: instructorReducer,
        user: userReducer,
        enrollment: enrollmentReducer,
        wishlist: wishlistReducer
    }
})