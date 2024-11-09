function generateCode() {
    const data = document.getElementById('dataInput').value;
    const codeImage = document.getElementById('codeImage');

    if (!data) {
        alert("Please enter some data to generate the QR code.");
        return;
    }

    // Generate QR Code
    QRCode.toDataURL(data, { width: 300 }, function (err, url) {
        if (err) {
            console.error(err);
            alert("Failed to generate QR code.");
        } else {
            // Display the generated QR code
            codeImage.src = url;
            codeImage.style.display = 'block';
        }
    });
}
