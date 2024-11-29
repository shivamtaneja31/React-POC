# Deployment Guide - React Features Demo

## Table of Contents
1. [Build Process](#build-process)
2. [Environment Configuration](#environment-configuration)
3. [Deployment Options](#deployment-options)
4. [Production Optimizations](#production-optimizations)
5. [Monitoring and Maintenance](#monitoring-and-maintenance)

## Build Process

### Creating a Production Build

```bash
# Install dependencies
npm install

# Create production build
npm run build
```

The build process:
1. Minifies JavaScript and CSS
2. Optimizes images and assets
3. Generates source maps
4. Creates static files in `build/` directory

### Build Output Structure

```
build/
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── asset-manifest.json
└── index.html
```

## Environment Configuration

### Environment Variables

Create environment-specific `.env` files:

```bash
# .env.development
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_ENV=development

# .env.production
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENV=production

# .env.staging
REACT_APP_API_URL=https://staging-api.example.com
REACT_APP_ENV=staging
```

### Using Environment Variables

```javascript
// Access in code
const apiUrl = process.env.REACT_APP_API_URL;
const environment = process.env.REACT_APP_ENV;
```

## Deployment Options

### 1. Static Hosting (Netlify/Vercel)

#### Netlify Deployment

1. Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Deploy via Netlify CLI:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy
```

#### Vercel Deployment

1. Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

2. Deploy via Vercel CLI:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### 2. Docker Deployment

1. Create `Dockerfile`:
```dockerfile
# Build stage
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

3. Build and run Docker container:
```bash
# Build image
docker build -t react-demo .

# Run container
docker run -p 80:80 react-demo
```

### 3. AWS S3 + CloudFront

1. Create S3 bucket and configure for static website hosting

2. Create `deploy-aws.sh`:
```bash
#!/bin/bash

# Build the application
npm run build

# Sync build folder with S3 bucket
aws s3 sync build/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

3. Deploy:
```bash
chmod +x deploy-aws.sh
./deploy-aws.sh
```

## Production Optimizations

### 1. Performance Optimizations

```javascript
// Enable gzip compression in Express
const compression = require('compression');
app.use(compression());

// Configure cache headers
app.use(express.static('build', {
  maxAge: '1y',
  etag: false
}));
```

### 2. Security Headers

```nginx
# nginx.conf
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
add_header X-Content-Type-Options "nosniff";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Content-Security-Policy "default-src 'self';";
```

### 3. Error Handling

```javascript
// Configure error tracking (e.g., Sentry)
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_ENV
});
```

## Monitoring and Maintenance

### 1. Health Checks

Create `public/health.json`:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2023-01-01T00:00:00Z"
}
```

### 2. Logging

```javascript
// Configure logging service
const logger = {
  info: (message, data) => {
    if (process.env.REACT_APP_ENV === 'production') {
      // Send to logging service
    } else {
      console.log(message, data);
    }
  },
  error: (error) => {
    if (process.env.REACT_APP_ENV === 'production') {
      // Send to error tracking service
    } else {
      console.error(error);
    }
  }
};
```

### 3. Monitoring Setup

```javascript
// Configure performance monitoring
import { init as initApm } from '@elastic/apm-rum';

const apm = initApm({
  serviceName: 'react-demo',
  serverUrl: process.env.REACT_APP_APM_SERVER_URL,
  environment: process.env.REACT_APP_ENV
});
```

## Deployment Checklist

- [ ] Update environment variables
- [ ] Run production build
- [ ] Test build locally
- [ ] Check bundle size
- [ ] Verify API endpoints
- [ ] Configure CDN
- [ ] Set up SSL certificate
- [ ] Configure security headers
- [ ] Set up monitoring
- [ ] Configure logging
- [ ] Test error handling
- [ ] Verify SEO meta tags
- [ ] Check performance metrics
- [ ] Test on multiple browsers
- [ ] Verify responsive design
- [ ] Update documentation

## Rollback Procedure

1. Keep previous deployment artifacts
2. Configure version control in CDN
3. Maintain deployment history
4. Document rollback steps for each platform

```bash
# Example rollback script
#!/bin/bash

VERSION=$1

# Rollback to specific version
aws s3 sync s3://backup-bucket/versions/$VERSION/ s3://production-bucket/ --delete

# Invalidate CDN cache
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
```

Remember to:
- Always test in staging environment first
- Maintain proper documentation
- Monitor deployment process
- Have rollback procedures ready
- Keep security best practices in mind
