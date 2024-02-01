import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'
import './sass/main.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {appRoutes} from "./utils/routes";
import {UnauthorizedLayout} from "./layouts/UnauthorizedLayout";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import HomePage from "./pages/HomePage";
import {AppLayout} from "./layouts/AppLayout";
import {UserRole} from "./utils/userRoles";
import {WelcomePage} from "./pages/WelcomePage";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./utils/api";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {MantineProvider} from "@mantine/core";

const router = createBrowserRouter([
    {
        path: appRoutes.home,
        element: <AppLayout minPermLevel={UserRole.loggedIn}/>,
        children: [
            {element: <HomePage/>, index: true}
        ]
    },
    {
        path: '/',
        element: <UnauthorizedLayout/>,
        errorElement: <NotFound/>,
        children: [
            // Welcome page as a progressive enchancement: disapperars
            {path: appRoutes.welcomePage, element: <WelcomePage/>},
            {path: appRoutes.login, element: <LoginPage/>},
            {path: appRoutes.register, element: <RegisterPage/>},
            {path: appRoutes.notAuthorized, element: <Unauthorized/>},
            {path: "*", element: <NotFound/>}
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <MantineProvider>
            <RouterProvider router={router}/>
            </MantineProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
