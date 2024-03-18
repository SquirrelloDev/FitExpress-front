importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');
import { precacheAndRoute} from 'workbox-precaching'
const mani = self.__WB_MANIFEST;
precacheAndRoute(mani);
const appRoutes = {
    // basic routes
    home: '/',
    login: '/login',
    register: '/register',
    welcomePage: '/welcome',
    healthCard: '/health-card',
    healthCardSummary: '/health-card/summary',
    newPasswd: '/reset',
    notAuthorized: '/forbidden',
    // diet screen
    diets: '/diets',
    fixedDiets: '/diets/fixed',
    flexiDiets: '/diets/flexi',
    dietMenu: '/menu',

    meal: '/meal',
    // cart screen
    cart: '/cart',
    cartPayment: '/cart/payment',
    cartPaymentSuccess: '/cart/payment/success',
//     menu screen
    menu: '/menu',
//     management screen
    dietManagement: '/manage',
//     healthPage
    healthPage: '/health',
    weightHistory: '/heatlh/weight-history',
    waterHistory: '/health/water-history',
    editHcard: '/health/edit',
//     profile
    profile: '/profile',
    profileDetails: '/profile/details',
    addresses: '/profile/addresses',
    newAddress: '/profile/addresses/new',
    vouchers: '/profile/vouchers',
    reports: '/profile/reports',
    newReport: '/profile/reports/new',
    editReport: 'reports/edit',
    exclusionsDb: '/profile/exclusions',
    appSettings: '/profile/settings',

}
self.addEventListener('push', (event) => {
    let data = {}
    if(event.data){
        data = JSON.parse(event.data.text())
    }
    const options = {
        body: data.content,
    }
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    )
})
async function cachePages(){
    const cache = await caches.open('pages')
    for (const appRoutesKey in appRoutes) {
        await cache.add(appRoutes[appRoutesKey])
    }
}
self.addEventListener('install', () => {
    cachePages()
})
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
})