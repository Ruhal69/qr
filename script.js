function generateCode() {
    const data = document.getElementById('dataInput').value;
    const qrColor = document.getElementById('colorPicker').value; // Get selected color
    const codeImage = document.getElementById('codeImage');

    if (!data) {
        alert("Please enter some data to generate the QR code.");
        return;
    }

    // Create the QR Code with color options
    const options = {
        color: {
            dark: qrColor,  // Dark color for the QR code
            light: "#ffffff" // Light color for the background
        }
    };

    // Generate the QR code with the provided data and options
    generateQRCode(data, options);
}

function generateQRCode(data, options) {
    const codeImage = document.getElementById('codeImage');
    QRCode.toDataURL(data, options, function (err, url) {
        if (err) {
            console.error(err);
            alert("Failed to generate QR code.");
        } else {
            codeImage.src = url;
            codeImage.style.display = 'block'; // Show the generated QR code
            addToHistory(url);
        }
    });
}

function downloadQRCode() {
    const codeImage = document.getElementById('codeImage');
    const link = document.createElement('a');
    link.href = codeImage.src;
    link.download = 'QRCode.png';
    link.click();
}

function addToHistory(url) {
    const historyList = document.getElementById('historyList');
    const historyItem = document.createElement('div');
    const img = document.createElement('img');
    img.src = url;
    historyItem.appendChild(img);
    historyList.appendChild(historyItem);
}

function shareQRCode() {
    const codeImage = document.getElementById('codeImage').src;
    
    // Web Share API - Open the native share dialog
    if (navigator.share) {
        navigator.share({
            title: 'Check out this QR Code!',
            text: 'Here is a QR code I generated.',
            url: codeImage
        })
        .then(() => console.log('QR Code shared successfully'))
        .catch(err => console.error('Error sharing:', err));
    } else {
        // Fallback: If Web Share API is not available, show a message or use a custom solution
        alert("Share feature is not supported in this browser.");
    }
}
