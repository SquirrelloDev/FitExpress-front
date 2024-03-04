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
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import HealthCardPage from "./pages/HealthCard/HealthCardPage";
import HealthCardSummary from "./pages/HealthCard/HealthCardSummary";
import DietSelect from "./pages/Diet/DietSelect";
import FixedSelect from "./pages/Diet/FixedSelect";
import FlexiSelect from "./pages/Diet/FlexiSelect";
import DietDetails from "./pages/Diet/DietDetails";
import DietMenu from "./pages/Diet/DietMenu";
import MealPage from "./pages/MealPage";
import CartPage from "./pages/Cart/CartPage";
import PaymentSuccess from "./pages/Cart/PaymentSuccess";
import {Toaster} from "react-hot-toast";
import OrderManagementPage from "./pages/OrderManagement/OrderManagementPage";
import OrderEdit from "./pages/OrderManagement/OrderEdit";
import HealthPage from "./pages/HealthPage/HealthPage";
import {HealthEditPage} from "./pages/HealthPage/HealthEditPage";
import WaterHistory from "./pages/HealthPage/WaterHistory";
import WeightHistory from "./pages/HealthPage/WeightHistory";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProfileDetails from "./pages/ProfilePage/ProfileDetails/ProfileDetails";
import PromocodePage from "./pages/ProfilePage/PromocodePage/PromocodePage";
import {AddressesPage} from "./pages/ProfilePage/AddressesPage/AddressesPage";
import AddressCreate from "./pages/ProfilePage/AddressesPage/AddressCreate/AddressCreate";
import AddressEdit from "./pages/ProfilePage/AddressesPage/AddressEdit/AddressEdit";
import ReportsPage from "./pages/ProfilePage/ReportsPage/ReportsPage";
import ReportCreate from "./pages/ProfilePage/ReportsPage/ReportCreate/ReportCreate";
import MenuPage from "./pages/MenuPage/MenuPage";
import ChangePasswordPage from "./pages/ChangePasswordPage/ChangePasswordPage";

const router = createBrowserRouter([
    {
        path: appRoutes.home,
        element: <AppLayout minPermLevel={UserRole.loggedIn}/>,
        children: [
            {element: <HomePage/>, index: true},
        ]
    },
    {
        path: appRoutes.diets,
        element: <AppLayout minPermLevel={UserRole.loggedIn} />,
        children: [
            {element: <DietSelect />, index: true},
            {path: appRoutes.fixedDiets, element: <FixedSelect />},
            {path: appRoutes.flexiDiets, element: <FlexiSelect />},
            {path: appRoutes.dietDetails, children: [
                    {element: <DietDetails />, index: true},
                    {path: appRoutes.dietMenu, element: <DietMenu/>}
                ]},
        ]
    },
    {
        path: appRoutes.meal,
        element: <AppLayout minPermLevel={UserRole.loggedIn} />,
        children: [
            {element: <MealPage />, path: appRoutes.mealDetails}
        ]
    },
    {
        path: appRoutes.cart,
        element: <AppLayout minPermLevel={UserRole.loggedIn} />,
        children: [
            {element: <CartPage />, index: true},
            {path: appRoutes.cartPaymentSuccess ,element: <PaymentSuccess />}
        ]
    },
    {
        path: appRoutes.menu,
        element: <AppLayout minPermLevel={UserRole.loggedIn} />,
        children: [
            {element: <MenuPage />, index: true}
        ]
    },
    {
        path: appRoutes.dietManagement,
        element: <AppLayout minPermLevel={UserRole.loggedIn} />,
        children: [
            {element: <OrderManagementPage />, index: true},
            {path: appRoutes.dietEdit, element: <OrderEdit/>}
        ]
    },
    {
        path: appRoutes.healthPage,
        element: <AppLayout minPermLevel={UserRole.loggedIn} />,
        children: [
            {element: <HealthPage />, index: true},
            {path: appRoutes.editHcard, element: <HealthEditPage/>},
            {path: appRoutes.waterHistory, element: <WaterHistory/>},
            {path: appRoutes.weightHistory, element: <WeightHistory/>}
        ]
    },
    {
        path: appRoutes.profile,
        element: <AppLayout minPermLevel={UserRole.loggedIn} />,
        children: [
            {element: <ProfilePage />, index: true},
            {path: appRoutes.profileDetails, element: <ProfileDetails/>},
            {path: appRoutes.addresses, children: [
                    {element: <AddressesPage/>, index: true},
                    {path: appRoutes.newAddress, element: <AddressCreate/>},
                    {path: appRoutes.editAddress, element: <AddressEdit/>}
                ]},
            {path: appRoutes.vouchers, element: <PromocodePage/>},
            {path: appRoutes.reports, children: [
                    {element: <ReportsPage />, index: true},
                    {path: appRoutes.newReport, element: <ReportCreate />}
                ]}
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
            {path: appRoutes.newPasswd, element: <ChangePasswordPage/>},
            {path: appRoutes.healthCard, element: <HealthCardPage />},
            {path: appRoutes.healthCardSummary, element: <HealthCardSummary />},
            {path: appRoutes.notAuthorized, element: <Unauthorized/>},
            {path: "*", element: <NotFound/>}
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools/>
            <MantineProvider>
            <RouterProvider router={router}/>
            </MantineProvider>
            <Toaster/>
        </QueryClientProvider>
     </React.StrictMode>,
)
