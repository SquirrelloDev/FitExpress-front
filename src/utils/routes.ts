export const appRoutes = {
    // basic routes
    home: '/',
    login: '/login',
    register: '/register',
    welcomePage: '/welcome',
    healthCard: '/health-card',
    healthCardSummary: '/health-card/summary',

    notAuthorized: '/forbidden',
    // diet screen
    diets: '/diets',
    dietDetails: 'diets/:diet',
    dietMenu: 'diets/:diet/menu',
    mealDeatils: '/meal/:id',
    // cart screen
    cart: '/cart',
    cartPayment: '/cart/payment',
    cartPaymentSuccess: '/cart/payment/success',
//     menu screen
    menu: '/menu',
//     management screen
    dietManagement: '/manage',
    dietEdit: 'manage/:dietId',
//     healthPage
    healthPage: '/health',
    weightHistory: '/health/weight-history',
    waterHistory: '/health/water-history',
//     profile
    profile: '/profile',
    profileDetails: '/profile/details',
    addresses: 'profile/addresses',
    newAddress: 'addressses/new',
    editAddress: 'addresses/edit/:id',
    vouchers: '/profile/vouchers',
    reports: '/profile/reports',
    newReport: 'reports/new',
    editReport: 'reports/edit/:id',
    exclusionsDb: '/profile/exclusions',
    appSettings: '/profile/settings',

}