import { baseApi } from "./baseApi";
export const articlesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getArticles: build.query({
            query: () => "/articles",
});