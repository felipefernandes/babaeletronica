const MOTION_EYE_URL = 'http://192.168.0.178';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.endsWith('/proxy-image')) {
        event.respondWith(proxyImage());
    }
});

async function proxyImage() {
    try {
        const response = await fetch(`${MOTION_EYE_URL}/picture/1/current/`);
        return response;
    } catch (error) {
        console.error('Erro ao buscar imagem:', error);
        return new Response('Erro ao buscar imagem', { status: 500 });
    }
}