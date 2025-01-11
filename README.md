# JavaScript URL Shortener and QR Code Generator

This project allows you to shorten URLs and generate QR codes for them using the TinyURL API.

## Requirements

Before running the app, you need to get your own API key from TinyURL.

### How to get your API key:

1. Visit the [TinyURL Developer Portal](https://tinyurl.com/tools/apideveloper).
2. Create an account and generate an API key.

### Set up your API key:

1. Replace `your-api-key-here` in `index.js` with your actual TinyURL API key.

In `index.js`, you will find the following line:
```javascript
Authorization: process.env.API_KEY
