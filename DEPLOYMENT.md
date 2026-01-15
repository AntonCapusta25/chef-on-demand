# Deployment Guide

This guide covers deploying the Chef On-Demand application to Vercel.

## Prerequisites

- [Vercel Account](https://vercel.com/signup) (free tier available)
- GitHub repository with your code
- Supabase project with configured database

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Import Repository**
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect the Vite framework

2. **Configure Environment Variables**
   
   Add the following environment variables in the Vercel project settings:
   
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   > [!IMPORTANT]
   > Get these values from your Supabase project:
   > - Go to [Supabase Dashboard](https://app.supabase.com)
   > - Select your project
   > - Navigate to Settings → API
   > - Copy the Project URL and anon/public key

3. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll receive a production URL (e.g., `https://your-app.vercel.app`)

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Environment Variables

The application requires the following environment variables:

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key | Supabase Dashboard → Settings → API |

> [!WARNING]
> Never commit `.env.local` or any file containing actual credentials to Git. Use `.env.example` as a template only.

## Post-Deployment

### Verify Deployment

1. Visit your deployed URL
2. Check that all pages load correctly
3. Test chef browsing functionality
4. Verify Supabase connection is working

### Configure Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches and pull requests

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure TypeScript compilation succeeds locally: `npm run build`

### Environment Variables Not Working

- Verify variables are prefixed with `VITE_`
- Redeploy after adding/changing environment variables
- Check variable names match exactly (case-sensitive)

### 404 Errors on Refresh

- Ensure `vercel.json` is committed to repository
- The rewrites configuration handles SPA routing

### Supabase Connection Issues

- Verify environment variables are set correctly
- Check Supabase project is active
- Ensure RLS policies allow anonymous access where needed

## Local Development

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Add your actual Supabase credentials to .env.local

# Start development server
npm run dev
```

## Build Optimization

The project is configured with:
- ✅ Automatic code splitting
- ✅ Asset caching (1 year for static assets)
- ✅ SPA routing support
- ✅ TypeScript type checking in build

## Support

For issues specific to:
- **Vercel**: [Vercel Documentation](https://vercel.com/docs)
- **Supabase**: [Supabase Documentation](https://supabase.com/docs)
- **Vite**: [Vite Documentation](https://vitejs.dev/)
