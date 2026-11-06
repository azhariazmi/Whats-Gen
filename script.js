// Main JavaScript Logic for WhatsApp Link Generator
document.addEventListener('DOMContentLoaded', () => {
    const waForm = document.getElementById('waForm');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const messageInput = document.getElementById('message');
    const resultUrlInput = document.getElementById('resultUrl');
    const copyBtn = document.getElementById('copyBtn');
    const testLink = document.getElementById('testLink');
    const qrCodeImg = document.getElementById('qrCodeImg');
    const clearBtn = document.getElementById('clearBtn');
    const toast = document.getElementById('toast');

    // Default Initialization (Azhari's Number)
    phoneNumberInput.value = '601143904222';
    generateWhatsAppLink();

    // Form Submit Event
    waForm.addEventListener('submit', (e) => {
        e.preventDefault();
        generateWhatsAppLink();
    });

    // Real-time Input Update
    phoneNumberInput.addEventListener('input', generateWhatsAppLink);
    messageInput.addEventListener('input', generateWhatsAppLink);

    // Clear Message Button
    clearBtn.addEventListener('click', () => {
        messageInput.value = '';
        generateWhatsAppLink();
    });

    // Function to Generate Link & Update UI
    function generateWhatsAppLink() {
        let phone = phoneNumberInput.value.replace(/[^0-9]/g, ''); // strip non-numeric
        const message = messageInput.value.trim();

        if (!phone) {
            resultUrlInput.value = '';
            testLink.classList.add('pointer-events-none', 'opacity-50');
            testLink.href = '#';
            return;
        }

        // Construct standard WhatsApp API URL format requested:
        // https://api.whatsapp.com/send/?phone=NUMBER&text=MESSAGE
        let generatedUrl = `https://api.whatsapp.com/send/?phone=${phone}`;
        
        if (message) {
            const encodedText = encodeURIComponent(message);
            generatedUrl += `&text=${encodedText}`;
        }

        resultUrlInput.value = generatedUrl;
        testLink.href = generatedUrl;
        testLink.classList.remove('pointer-events-none', 'opacity-50');

        // Update QR Code
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(generatedUrl)}`;
        qrCodeImg.src = qrUrl;
    }

    // Copy to Clipboard
    copyBtn.addEventListener('click', () => {
        if (!resultUrlInput.value) return;
        
        navigator.clipboard.writeText(resultUrlInput.value).then(() => {
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 2500);
        });
    });
});

// Preset Number Handler
function setPreset(number) {
    const phoneInput = document.getElementById('phoneNumber');
    phoneInput.value = number;
    phoneInput.dispatchEvent(new Event('input'));
}
