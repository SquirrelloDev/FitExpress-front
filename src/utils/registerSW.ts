// let defferedPrompt
 export async function registerSW(){
    if( 'serviceWorker' in navigator) {
        const registered = await navigator.serviceWorker.register('/sw.js');
        if (!registered) {
            console.log('SW Registered!')
        }
    }
}