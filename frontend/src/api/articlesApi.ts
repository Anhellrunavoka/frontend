import { baseApi } from "./baseApi";
export const articlesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getArticles: build.query({
            query: () => "/articles",
            providesTags: ["Article"],
        }),
        getArticleById: build.query({
            query: (id) => `/articles/${id}`,
            providesTags: (result, error, id) => [{ type: "Article", id }],
        }),
   
        createArticle: build.mutation({
            query: (newArticle) => ({
                url: "/articles",
                method: "POST",
                body: newArticle,
            }),
            invalidatesTags: ["Article"],
        }),

        updateArticle: build.mutation({
            query: ({ id, ...updatedArticle }) => ({
                url: `/articles/${id}`,
                method: "PUT",
                body: updatedArticle,
            }),
            invalidatesTags: (result,error, { id }) => [{ type: "Article", id },"Article"],
        })
    })
});
 export const { useGetArticlesQuery,useGetArticleByIdQuery, useCreateArticleMutation , useUpdateArticleMutation} = articlesApi;
