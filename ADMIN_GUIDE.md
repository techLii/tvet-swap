# Admin Guide: Manual User Creation

This guide explains how to manually create user accounts and profiles for the TVET Swap Kenya platform.

## Overview

Since registration is disabled, all user accounts must be created manually by the administrator. This involves two steps:
1. Creating a user account in Appwrite Auth
2. Creating a matching profile document in the database

## Step 1: Create User Account in Appwrite

1. **Go to Appwrite Console** → **Auth** → **Users**
2. Click **"Create User"** button
3. Fill in the user details:
   - **Email**: User's email address (used for login)
   - **Password**: Set a secure password
   - **Name**: User's full name

4. Click **"Create"**
5. **Important**: Copy the **User ID** (it looks like `691f4ee50015875951a8`) - you'll need this for the next step

## Step 2: Create Profile Document

1. **Go to Appwrite Console** → **Database** → **tvet_swap_id** → **Collection: profiles**
2. Click **"Create Document"** button
3. Fill in ALL required fields:

### Required Fields

| Field | Type | Example | Description |
|-------|------|---------|-------------|
| `userId` | String | `691f4ee50015875951a8` | **Must match the User ID from Step 1** |
| `fullName` | String | `John Doe` | Trainer's full name |
| `idNumber` | String | `12345678` | National ID number |
| `phone` | String | `+254712345678` | Phone number (include country code) |
| `tscNumber` | String | `TSC123456` | TSC registration number |
| `currentInstitution` | String | `Nairobi Technical College` | Current institution name |
| `currentCounty` | String | `Nairobi` | Current county (must match one from the list) |
| `currentSubCounty` | String | `Westlands` | Current sub-county (optional, can be empty) |
| `courseQualified` | Array (String) | `["Electrical Engineering", "Electronics"]` | Courses qualified to teach |
| `yearsOfExperience` | Integer | `5` | Years of teaching experience |
| `isOpenToSwap` | Boolean | `false` | Initially set to false (user can toggle later) |

### Optional Fields (Can be added later by user)

| Field | Type | Description |
|-------|------|-------------|
| `desiredCounties` | Array (String) | Counties the trainer wants to move to |
| `desiredInstitutions` | Array (String) | Specific institutions they prefer |
| `availabilityDate` | String | When they're available to transfer |

4. Click **"Create"**

## Step 3: Verify Creation

1. The user should now be able to login with their email and password
2. After login, they should see their dashboard with all their profile information
3. They can toggle "Open to Swap" and set their transfer preferences

## Important Notes

### ⚠️ Critical Requirements

- **userId MUST match**: The `userId` in the profile document must exactly match the User ID from Appwrite Auth
- **Unique fields**: Both `idNumber` and `tscNumber` must be unique across all profiles
- **Array fields**: `courseQualified`, `desiredCounties`, and `desiredInstitutions` must be configured as arrays in Appwrite

### 📋 Kenyan Counties List

Use these exact spellings when entering counties:

Nairobi, Mombasa, Kwale, Kilifi, Tana River, Lamu, Taita-Taveta, Garissa, Wajir, Mandera, Marsabit, Isiolo, Meru, Tharaka-Nithi, Embu, Kitui, Machakos, Makueni, Nyandarua, Nyeri, Kirinyaga, Murang'a, Kiambu, Turkana, West Pokot, Samburu, Trans-Nzoia, Uasin Gishu, Elgeyo-Marakwet, Nandi, Baringo, Laikipia, Nakuru, Narok, Kajiado, Kericho, Bomet, Kakamega, Vihiga, Bungoma, Busia, Siaya, Kisumu, Homa Bay, Migori, Kisii, Nyamira

### 🔧 Common TVET Courses

Common courses to choose from:

- Electrical Engineering
- Mechanical Engineering
- Civil Engineering
- Automotive Engineering
- Plumbing
- Carpentry and Joinery
- Masonry
- Welding and Fabrication
- Information Technology
- Computer Science
- Business Management
- Hospitality Management
- Fashion and Design
- Beauty and Cosmetology
- Agriculture
- Food and Beverage

## Troubleshooting

### User can't login
- Verify the email and password are correct
- Check that the user account exists in Appwrite Auth

### Dashboard shows "Profile Not Found"
- Verify the profile document exists in the database
- Check that the `userId` in the profile matches the User ID from Auth
- Ensure all required fields are filled in

### Profile doesn't appear in trainers list
- Check that `isOpenToSwap` is set to `true`
- User must toggle this in their dashboard

## Bulk User Creation

For creating multiple users at once, you can use the Appwrite API or SDK. Contact your technical administrator for assistance with bulk imports.

## Security

- Always use strong passwords
- Keep user credentials confidential
- Only authorized administrators should have access to create accounts
- Regularly audit user accounts and profiles
