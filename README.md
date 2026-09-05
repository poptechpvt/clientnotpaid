# clientnotpaid

A minimalist, responsive locked landing page indicating suspended access due to pending client payment settlement.

## Features
- Minimalist aesthetic with Cream White palette
- Transparent itemized invoice breakdown (Domain, Advance, API credit subsidy, Hosting/API)
- Direct administrator WhatsApp contact link (`+91 97340 39294`)
- Mobile-optimized layout with refined typography
- Smooth micro-interactions, animations, and interactive UTR submission modal
- Zero-dependency Node.js static server

## Quick Start
```bash
npm start
```
Runs locally at `http://localhost:3000`.

## Dokploy Deployment Guide

This repository is pre-configured and 100% ready for instant deployment on [Dokploy](https://dokploy.com/):

### Option A: Standard Application (Dockerfile / Nixpacks)
1. In Dokploy, go to **Projects** → select/create a project.
2. Click **Add Application**.
3. Choose **GitHub** (or Git Provider) and select repository `poptechpvt/clientnotpaid`, branch `main`.
4. **Build Type**: Choose **Dockerfile** (recommended) or **Nixpacks**.
5. Set Port to **`3000`**.
6. Set Health Check path to **`/health`**.
7. Click **Deploy**.

### Option B: Docker Compose
1. In Dokploy, select **Add Compose**.
2. Point to this repository; it will automatically detect `docker-compose.yml`.
3. Set domain routing to port `3000` and deploy.

