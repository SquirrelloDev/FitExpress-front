self.addEventListener('push', (event) => {
    let data = {}
    if(event.data){
        data = JSON.parse(event.data.text())
    }
    const options = {
        body: data.content,
        // icon: '/icons/',
        // badge: 'link/do/source'
    }
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    )
})