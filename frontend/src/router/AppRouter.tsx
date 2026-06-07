import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home";
import Articles from "../pages/Articles";
import Products from "../pages/Products";
import RegisterPage from "../pages/RegisterPage";
import ApplyPage from "../pages/ApplyPage";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'articles', 
                element: <Articles />
            },
            {
                path: 'products', 
                element: <Products />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
            {
                path: 'apply',
                element: <ApplyPage />
            }
        ]
    }
])
const AppRouter = () => <RouterProvider router={router} />

export default AppRouter;