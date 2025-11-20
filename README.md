# TVET Swap Kenya

A production-ready MVP platform for TVET trainers in Kenya to find mutual transfer opportunities. Built with Next.js 14+, Appwrite, and Tailwind CSS.

## Features

- ✅ User authentication (register/login/logout)
- ✅ Comprehensive trainer profiles with verification (TSC number, ID)
- ✅ County-based search and filtering
- ✅ Course-based matching
- ✅ Public trainer directory
- ✅ WhatsApp integration for direct contact
- ✅ Responsive mobile-first design
- ✅ Server-side rendering with Next.js App Router

## Tech Stack

- **Framework**: Next.js 16 (App Router + Server Components)
- **Backend**: Appwrite (Database + Authentication)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ installed
- An Appwrite account (cloud.appwrite.io or self-hosted)
- npm or yarn package manager

## Appwrite Setup

### 1. Create Appwrite Project

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Create a new project called "TVET Swap Kenya"
3. Note your Project ID

### 2. Create Database

1. In your project, go to **Databases**
2. Create a new database called `tvet_swap`
3. Note the Database ID

### 3. Create Collection

Create a collection called `profiles` with the following attributes:

| Attribute Name | Type | Required | Array | Default |
|----------------|------|----------|-------|---------|
| userId | String | Yes | No | - |
| fullName | String | Yes | No | - |
| idNumber | String | Yes | No | - |
| phone | String | Yes | No | - |
| tscNumber | String | Yes | No | - |
| currentInstitution | String | Yes | No | - |
| currentCounty | String | Yes | No | - |
| currentSubCounty | String | No | No | - |
| courseQualified | String | Yes | Yes | - |
| yearsOfExperience | Integer | Yes | No | - |
| isOpenToSwap | Boolean | Yes | No | false |
| desiredCounties | String | No | Yes | - |
| desiredInstitutions | String | No | Yes | - |
| availabilityDate | String | No | No | - |

### 4. Create Indexes

Add these indexes to the `profiles` collection:

| Index Key | Type | Attributes |
|-----------|------|------------|
| tscNumber_idx | Unique | tscNumber |
| idNumber_idx | Unique | idNumber |
| courseQualified_idx | Key | courseQualified |
| currentCounty_idx | Key | currentCounty |
| desiredCounties_idx | Key | desiredCounties |
| isOpenToSwap_idx | Key | isOpenToSwap |

### 5. Set Permissions

For the `profiles` collection, set these permissions:

- **Create**: Any authenticated user
- **Read**: Any (for public profiles where isOpenToSwap = true)
- **Update**: Document owner only
- **Delete**: Document owner only

### 6. Get API Key

1. Go to **Settings** → **API Keys**
2. Create a new API key with all scopes
3. Copy the API key (you'll need this for `.env.local`)

## Local Development Setup

### 1. Clone and Install

```bash
# Navigate to project directory
cd c:/Users/otien/Desktop/web/swap

# Dependencies are already installed, but if needed:
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
APPWRITE_API_KEY=your_api_key_here

# Database Configuration
NEXT_PUBLIC_APPWRITE_DATABASE_ID=tvet_swap
NEXT_PUBLIC_APPWRITE_COLLECTION_PROFILES_ID=profiles
```

Replace:
- `your_project_id_here` with your Appwrite Project ID
- `your_api_key_here` with your Appwrite API Key

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
swap/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── login/
│   │   └── page.tsx               # Login page
│   ├── register/
│   │   └── page.tsx               # Registration page
│   ├── dashboard/
│   │   ├── page.tsx               # Dashboard (server component)
│   │   └── DashboardClient.tsx    # Dashboard (client component)
│   └── trainers/
│       ├── page.tsx               # Trainers list (server component)
│       ├── TrainersClient.tsx     # Trainers list (client component)
│       └── [id]/
│           └── page.tsx           # Individual trainer profile
├── lib/
│   ├── appwrite.ts                # Appwrite client configuration
│   ├── constants.ts               # Kenyan counties & TVET courses
│   ├── utils.ts                   # Utility functions
│   └── actions/
│       ├── auth.ts                # Authentication server actions
│       └── profile.ts             # Profile server actions
├── types/
│   └── index.ts                   # TypeScript interfaces
└── env.example                    # Environment variables template
```

## Usage Guide

### For Trainers

1. **Register**: Create an account with your credentials
   - Email and password
   - Personal information (Name, ID, TSC number)
   - Current position details
   - Courses you're qualified to teach

2. **Complete Profile**: After registration, go to your dashboard
   - Toggle "I am open to mutual transfer"
   - Select desired counties
   - Add preferred institutions (optional)
   - Set availability date (optional)

3. **Find Matches**: Browse the trainers directory
   - Filter by course, county, or desired location
   - View detailed profiles
   - Contact via WhatsApp

### Search Filters

- **Course**: Find trainers teaching specific courses
- **Current County**: See who's currently in a specific county
- **Wants to Move To**: Find trainers who want to move to your county

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Node.js

## Security Features

- ✅ Server-side authentication with HTTP-only cookies
- ✅ TSC number and ID verification required
- ✅ Profile visibility controlled by users
- ✅ Owner-only profile editing
- ✅ Secure API key handling (server-side only)

## Future Enhancements

- Email verification
- Admin dashboard for verification
- In-app messaging
- Swap request tracking
- Email notifications
- Advanced matching algorithm
- Mobile app (React Native)

## Support

For issues or questions, please contact the development team.

## License

© 2025 TVET Swap Kenya. All rights reserved.
