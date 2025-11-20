# TVET Swap Kenya - Quick Setup Guide

## Step 1: Appwrite Setup

### Create Project
1. Go to https://cloud.appwrite.io
2. Click "Create Project"
3. Name: "TVET Swap Kenya"
4. Copy your Project ID

### Create Database
1. Click "Databases" in sidebar
2. Click "Create Database"
3. Name: `tvet_swap`
4. Copy Database ID (should be "tvet_swap")

### Create Collection
1. Click "Create Collection"
2. Name: `profiles`
3. Collection ID: `profiles`

### Add Attributes (in this exact order)

Click "Create Attribute" for each:

1. **String** - Key: `userId`, Size: 255, Required: Yes
2. **String** - Key: `fullName`, Size: 255, Required: Yes
3. **String** - Key: `idNumber`, Size: 50, Required: Yes
4. **String** - Key: `phone`, Size: 20, Required: Yes
5. **String** - Key: `tscNumber`, Size: 50, Required: Yes
6. **String** - Key: `currentInstitution`, Size: 255, Required: Yes
7. **String** - Key: `currentCounty`, Size: 100, Required: Yes
8. **String** - Key: `currentSubCounty`, Size: 100, Required: No
9. **String** - Key: `courseQualified`, Size: 255, Required: Yes, Array: Yes
10. **Integer** - Key: `yearsOfExperience`, Required: Yes, Min: 0, Max: 50
11. **Boolean** - Key: `isOpenToSwap`, Required: Yes, Default: false
12. **String** - Key: `desiredCounties`, Size: 100, Required: No, Array: Yes
13. **String** - Key: `desiredInstitutions`, Size: 255, Required: No, Array: Yes
14. **String** - Key: `availabilityDate`, Size: 50, Required: No

### Add Indexes

Click "Create Index" for each:

1. **Unique** - Key: `tscNumber_idx`, Attribute: `tscNumber`
2. **Unique** - Key: `idNumber_idx`, Attribute: `idNumber`
3. **Key** - Key: `courseQualified_idx`, Attribute: `courseQualified`
4. **Key** - Key: `currentCounty_idx`, Attribute: `currentCounty`
5. **Key** - Key: `desiredCounties_idx`, Attribute: `desiredCounties`
6. **Key** - Key: `isOpenToSwap_idx`, Attribute: `isOpenToSwap`

### Set Permissions

Click "Settings" tab in the collection:

**Create**:
- Role: Any
- Permission: Create

**Read**:
- Role: Any
- Permission: Read

**Update**:
- Role: Users
- Permission: Update
- Add rule: `userId` equals `$userId`

**Delete**:
- Role: Users
- Permission: Delete
- Add rule: `userId` equals `$userId`

### Get API Key

1. Go to "Settings" → "View API Keys"
2. Click "Create API Key"
3. Name: "Server Key"
4. Scopes: Select ALL
5. Copy the API Key (you won't see it again!)

## Step 2: Local Setup

### Create .env.local

Create a file called `.env.local` in the project root with:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
APPWRITE_API_KEY=your_api_key_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=tvet_swap
NEXT_PUBLIC_APPWRITE_COLLECTION_PROFILES_ID=profiles
```

Replace:
- `your_project_id_here` → Your Appwrite Project ID
- `your_api_key_here` → Your API Key from above

### Run the App

```bash
npm run dev
```

Open http://localhost:3000

## Step 3: Test

1. Click "Register"
2. Fill in all fields (use test data)
3. After registration, you'll be redirected to dashboard
4. Toggle "I am open to mutual transfer"
5. Select some desired counties
6. Click "Save Changes"
7. Go to "Browse Trainers" - you should see your profile!

## Troubleshooting

**Error: "No session"**
- Make sure you're logged in
- Clear cookies and try again

**Error: "Document not found"**
- Check that collection ID is exactly `profiles`
- Check that database ID is exactly `tvet_swap`

**Error: "Invalid API key"**
- Make sure API key is copied correctly
- Make sure it has all scopes enabled

**Profiles not showing in trainers list**
- Make sure `isOpenToSwap` is set to `true`
- Check collection permissions allow public read

## Need Help?

Check the full [README.md](file:///c:/Users/otien/Desktop/web/swap/README.md) for detailed instructions.
