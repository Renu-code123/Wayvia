# 🚀 How to Deploy Wayvia on Vercel

This guide provides step-by-step instructions to deploy **Wayvia** to [Vercel](https://vercel.com) for production or hackathon judging.

---

## 🌐 Method 1: Deploy via Vercel Web Dashboard (Recommended)

### Step 1: Sign in to Vercel
1. Go to [https://vercel.com](https://vercel.com).
2. Click **Log In** or **Sign Up** and choose **Continue with GitHub**.
3. Log in with the account where the repository is hosted (`stutitiwari23`).

### Step 2: Import Repository
1. On your Vercel Dashboard, click **Add New...** → **Project**.
2. Under **Import Git Repository**, find `stutitiwari23/Wayvia`.
3. Click the **Import** button.

### Step 3: Configure Build & Environment Settings
1. **Project Name**: `wayvia` (or leave default).
2. **Framework Preset**: `Next.js` *(automatically detected)*.
3. **Root Directory**: `./` *(leave default)*.
4. **Build & Output Settings**: Leave as default (`npm run build`).

### Step 4: Add Environment Variables (Optional)
Expand the **Environment Variables** section and add the following:

| Key | Value | Description |
|---|---|---|
| `GEMINI_API_KEY` | `AIzaSy...` | Your Google Gemini API Key for live AI re-planning |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | `AIzaSy...` | Optional: Google Maps API key if enabled |

*Note: If no environment variables are provided, Wayvia's autonomous fallback engine will run seamlessly out-of-the-box!*

### Step 5: Click Deploy
1. Click **Deploy**.
2. Vercel will build and deploy your application in under 60 seconds.
3. Once complete, you will receive your live domain (e.g. `https://wayvia.vercel.app` or `https://wayvia-stutitiwari23.vercel.app`).

---

## 💻 Method 2: Deploy via Terminal (Vercel CLI)

1. Open terminal in the project directory:
   ```bash
   cd c:\Users\Dell\Wayvia\Wayvia
   ```

2. Run the Vercel deployment command:
   ```bash
   npx vercel
   ```

3. Answer the prompts:
   - `Set up and deploy?` → **Y**
   - `Which scope?` → Select your Vercel account
   - `Link to existing project?` → **N**
   - `What's your project's name?` → `wayvia`
   - `In which directory is your code located?` → `./`
   - `Want to modify settings?` → **N**

4. Deploy to Production:
   ```bash
   npx vercel --prod
   ```

---

## ⚡ Automatic CI/CD Deployments
Once linked, every time you push code to the `main` branch on GitHub:
```bash
git add .
git commit -m "update feature"
git push origin main
```
Vercel will **automatically trigger a new build and deploy your site live** in seconds!
