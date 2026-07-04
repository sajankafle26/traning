# Google Business Profile Setup Instructions

## Step 1: Enable the API
1. Go to: https://console.cloud.google.com/apis/library/businessprofile.googleapis.com
2. Make sure project `gen-lang-client-0388453867` is selected
3. Click **Enable**

## Step 2: Get Refresh Token
1. Go to: https://developers.google.com/oauthplayground
2. Click the gear icon (top right) → check **Use your own OAuth credentials**
3. Enter your Client ID and Client Secret from .env.local
4. In left panel, find **Google Business Profile API** → check the scope
5. Click **Authorize APIs** → sign in with your GBP account
6. Click **Exchange authorization code for tokens**
7. Copy the **Refresh token**

## Step 3: Get Location ID
1. Go to: https://business.google.com
2. Click on **Sangalo Tech Pvt. Ltd.**
3. The URL looks like: `business.google.com/locations/L38abc123...`
4. Copy the `L38...` part

## Step 4: Add to .env.local
```
GBP_REFRESH_TOKEN=paste-refresh-token-here
GBP_LOCATION_ID=paste-location-id-here
```
