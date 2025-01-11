
document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("shortenBtn");
    const errorMessage = document.getElementById("errorMessage");
    const resultSection = document.getElementById("results-section");
    const shortenedUrlDisplay = document.getElementById("shortened-url");
    const qrCodeDisplay = document.getElementById("qrcode");
    const copyBtn = document.getElementById("copy-btn");
    const downloadBtn = document.getElementById("download-btn");

    generateBtn.addEventListener("click", async () => {
        const urlInput = document.getElementById("url-input").value;

        // Check if the input is empty
        if (urlInput.trim() === "") {
            window.alert("Please enter a URL");
            errorMessage.innerText = "Please enter a URL";
            return;
        }

        let shortUrl = ""
        // Fetching data from the TinyURL API
        try {
            const response = await fetch(`https://api.tinyurl.com/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer your-api-key-here"
                },
                body: JSON.stringify({
                    url: urlInput,
                    domain: "tiny.one"
                })
            });

            // Check if the response is OK
            if (!response.ok) {
                errorMessage.textContent = "Something unexpected happened while shortening the URL";
                window.alert("Something unexpected happened while shortening the URL");
                return
            }

            const data = await response.json();
            shortUrl = data.data.tiny_url;

            // Display the shortened URL
            resultSection.classList.remove("hidden")
            shortenedUrlDisplay.innerText = shortUrl;

            generateQRCode(shortUrl)

        } catch (error) {
            console.error(error);
            errorMessage.innerText = "An error occurred while shortening the URL.";
        }

        copyBtn.addEventListener("click", () => {
            if (shortUrl) {
                navigator.clipboard.writeText(shortUrl)
                window.alert("Copied to clipboard")
            }
        })
    });

    function generateQRCode(url) {
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=200x200`;
        const img = document.createElement("img");
        img.src = qrApiUrl;
        qrCodeDisplay.innerHTML = ""
        qrCodeDisplay.appendChild(img)


        downloadBtn.addEventListener("click", () => {
            const link = document.createElement("a")
            link.href = qrApiUrl
            link.download = "qr-code.png"
            link.click()
        })
    }
});
