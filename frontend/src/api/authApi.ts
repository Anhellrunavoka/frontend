import{baseApi}from"./baseApi";

export const authApi=baseApi.injectEndpoints({
    endpoints:(build)=>({
        register:build.mutation({
            query:(userData)=>({
                url:"/register",
                method:"POST",
                body:userData,
            }),
            invalidatesTags:["User"],
        }),

        login:build.mutation({
            query:(userData)=>({
                url:"/login",
                method:"POST",
                body:userData,
            })
        }),

        getAuthUser:build.query({
            query:()=>"/auth-user",
            providesTags:["User"],
        }),
    }),
});
export const {useRegisterMutation, useLoginMutation, useGetAuthUserQuery}=authApi;