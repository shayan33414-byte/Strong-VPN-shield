# Strong VPN Shield demo

Strong VPN Shield is an interactive front-end prototype for a possible VPN app.
It demonstrates interface ideas such as connection status, location selection,
preferences, and speed-test results.

> **Important:** This repository does not implement a VPN. It does not encrypt
> traffic, change your IP address, contact VPN servers, block network access, or
> measure connection speed. Every connection and performance value is simulated.

## Run locally

No build step or dependencies are required. Open `index.html` in a browser, or
serve the directory with any static file server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish

The project is a static website and can be hosted with GitHub Pages. The included
workflow publishes the site after changes reach the default branch and GitHub
Pages is configured to use **GitHub Actions** as its source.

## Project status

This is a concept demo, not security software. A production VPN would require a
reviewed client, an authenticated control plane, real server infrastructure,
secure key management, platform networking permissions, and independent security
testing.
