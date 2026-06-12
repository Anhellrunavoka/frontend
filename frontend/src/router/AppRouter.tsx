import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home";
import Articles from "../pages/Articles";
import Products from "../pages/Products";
import RegisterPage from "../pages/RegisterPage";
import ApplyPage from "../pages/ApplyPage";
import ArticlePage from "../pages/ArticlePage";
import LoginPage from "../pages/LoginPage";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import CreateArticlePage from "../pages/CreateArticlePage";
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
                path: 'login',
                element: <LoginPage />
            },
            {
                element:<PrivateRoute/>,
                children:[
                    {
                        path:"profile",
                        element:<Profile/>
                    },
                    {
                        path:"create-article",
                        element:<CreateArticlePage/>
                    }
                ]
            },
    
            {
                path: 'apply',
                element: <ApplyPage />
            },
            {
                path: 'article/:id',
                element: <ArticlePage />
            }
            
        ]
    }
])
const AppRouter = () => <RouterProvider router={router} />

export default AppRouter;