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
    fixedDiets: 'fixed',
    flexiDiets: 'flexi',
    dietDetails: ':diet',
    dietMenu: 'menu',

    meal: '/meal',
    mealDetails: ':id',
    // cart screen
    cart: '/cart',
    cartPayment: '/cart/payment',
    cartPaymentSuccess: '/cart/payment/success',
//     menu screen
    menu: '/menu',
//     management screen
    dietManagement: '/manage',
    dietEdit: ':dietId',
//     healthPage
    healthPage: '/health',
    weightHistory: 'weight-history',
    waterHistory: 'water-history',
    editHcard: 'edit',
//     profile
    profile: '/profile',
    profileDetails: '/profile/details',
    addresses: 'addresses',
    newAddress: 'new',
    editAddress: 'edit/:id',
    vouchers: 'vouchers',
    reports: '/profile/reports',
    newReport: 'reports/new',
    editReport: 'reports/edit/:id',
    exclusionsDb: '/profile/exclusions',
    appSettings: '/profile/settings',

}