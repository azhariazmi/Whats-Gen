// PWA Install Prompt Logic
let deferredPrompt;
const installBanner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');
const closeBannerBtn = document.getElementById('closeBannerBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    
    // Show your custom install banner/popup
    if (installBanner) {
        installBanner.classList.remove('hidden');
    }
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        
        // Clear the deferred prompt variable, it can only be used once.
        deferredPrompt = null;
        
        // Hide the banner
        installBanner.classList.add('hidden');
    });
}

if (closeBannerBtn) {
    closeBannerBtn.addEventListener('click', () => {
        installBanner.classList.add('hidden');
    });
}

window.addEventListener('appinstalled', (evt) => {
    console.log('WaGen was successfully installed as an app!');
    installBanner.classList.add('hidden');
});
