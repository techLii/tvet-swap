const { Client, Databases, ID } = require('node-appwrite');
const fs = require('fs');
const path = require('path');

// Helper to load env vars manually
if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            console.log('Found .env.local, parsing...');
            const envConfig = fs.readFileSync(envPath, 'utf8');
            envConfig.split('\n').forEach(line => {
                const trimmedLine = line.trim();
                // Skip comments and empty lines
                if (!trimmedLine || trimmedLine.startsWith('#')) return;

                // key=value format
                const separatorIndex = trimmedLine.indexOf('=');
                if (separatorIndex > 0) {
                    const key = trimmedLine.substring(0, separatorIndex).trim();
                    let value = trimmedLine.substring(separatorIndex + 1).trim();

                    // Remove quotes if present
                    if ((value.startsWith('"') && value.endsWith('"')) ||
                        (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.slice(1, -1);
                    }

                    process.env[key] = value;
                }
            });
            console.log('Loaded keys:', Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_APPWRITE') || k.startsWith('APPWRITE')));
        } else {
            console.warn('.env.local file not found at:', envPath);
        }
    } catch (e) {
        console.warn('Could not load .env.local', e);
    }
}

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
// Use the ID from env if it exists, otherwise we'll define a new one or search
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PROFILES_ID || 'trainers-hub-profiles';
const COLLECTION_NAME = 'trainers-hub-profiles';

async function main() {
    try {
        console.log('Checking database connection...');
        // Verify DB exists
        try {
            await databases.get(DATABASE_ID);
            console.log(`Database ${DATABASE_ID} found.`);
        } catch (error) {
            console.error(`Database ${DATABASE_ID} not found. Please ensure it exists.`);
            process.exit(1);
        }

        console.log(`Checking collection ${COLLECTION_ID}...`);
        let collection;
        try {
            collection = await databases.getCollection(DATABASE_ID, COLLECTION_ID);
            console.log(`Collection ${COLLECTION_NAME} (${COLLECTION_ID}) already exists.`);
        } catch (error) {
            if (error.code === 404) {
                console.log(`Collection not found. Creating ${COLLECTION_NAME}...`);
                collection = await databases.createCollection(
                    DATABASE_ID,
                    COLLECTION_ID, // Use the ID from env as the preferred ID if provided
                    COLLECTION_NAME
                );
                console.log(`Collection created: ${collection.$id}`);
            } else {
                throw error;
            }
        }

        // Define attributes
        const attributes = [
            { key: 'userId', type: 'string', size: 100, required: true },
            { key: 'fullName', type: 'string', size: 100, required: true },
            { key: 'idNumber', type: 'string', size: 50, required: true },
            { key: 'phone', type: 'string', size: 50, required: true },
            { key: 'tscNumber', type: 'string', size: 50, required: true },
            { key: 'currentInstitution', type: 'string', size: 100, required: true },
            { key: 'currentCounty', type: 'string', size: 50, required: true },
            { key: 'currentSubCounty', type: 'string', size: 100, required: false }, // Made false based on types/index.ts optional? actually Create form says required, but let's check. In types it's optional in Profile interface? No, in CreateProfileFormData it is required. in Profile it is optional. Let's make it required to be safe or follow strict schema. Wait, types/index.ts:11 currentSubCounty?: string; It is optional in Profile interface.
            // Let's re-read types.ts. Line 11: currentSubCounty?: string; Line 38: currentSubCounty: string; (in CreateProfileFormData).
            // Usually DB schema should be permissive if the interface allows it to be undefined sometimes (e.g. historical data).
            // But if the creation form requires it, maybe better required. I'll stick to required for now as per my plan, but I'll make it required: false to be safe if I'm unsure. Actually, in the plan I wrote 'required', I should check lines 11/38. Code says `data.currentSubCounty` is passed.
            // Let's stick to the plan: required.

            { key: 'courseQualified', type: 'string', size: 100, required: true, array: true },
            { key: 'yearsOfExperience', type: 'integer', required: true },
            { key: 'isOpenToSwap', type: 'boolean', required: true },
            { key: 'desiredCounties', type: 'string', size: 100, required: true, array: true },
            { key: 'desiredInstitutions', type: 'string', size: 100, required: false, array: true }, // Optional in Profile interface? Line 16: desiredInstitutions?: string[];
            { key: 'availabilityDate', type: 'string', size: 100, required: false }, // Line 17: availabilityDate?: string;
        ];

        // Refine attributes based on exact reading of types/index.ts
        // Profile interface:
        // currentSubCounty?: string -> required: false
        // desiredInstitutions?: string[] -> required: false
        // availabilityDate?: string -> required: false
        // But in `createProfile` action, `data.currentSubCounty` is passed directly. `CreateProfileFormData` has it as required.
        // I will make `currentSubCounty` required if the form enforces it, but safe to make it false in DB to avoid errors if logic changes.
        // Actually, let's keep it `required: false` for the optional fields in `Profile` interface to be safe.
        // `desiredInstitutions` and `availabilityDate` are definitely optional in Interface.

        // Corrected Attribute List:
        const attributesConfig = [
            { key: 'userId', type: 'string', size: 100, required: true },
            { key: 'fullName', type: 'string', size: 100, required: true },
            { key: 'idNumber', type: 'string', size: 50, required: true },
            { key: 'phone', type: 'string', size: 50, required: true },
            { key: 'tscNumber', type: 'string', size: 50, required: true },
            { key: 'currentInstitution', type: 'string', size: 100, required: true },
            { key: 'currentCounty', type: 'string', size: 50, required: true },
            { key: 'currentSubCounty', type: 'string', size: 100, required: false },
            { key: 'courseQualified', type: 'string', size: 100, required: true, array: true },
            { key: 'yearsOfExperience', type: 'integer', required: true },
            { key: 'isOpenToSwap', type: 'boolean', required: true },
            { key: 'desiredCounties', type: 'string', size: 100, required: true, array: true },
            { key: 'desiredInstitutions', type: 'string', size: 100, required: false, array: true },
            { key: 'availabilityDate', type: 'string', size: 100, required: false },
        ];


        console.log('Ensuring attributes...');
        const existingAttributes = await databases.listAttributes(DATABASE_ID, collection.$id);
        const existingKeys = existingAttributes.attributes.map(a => a.key);

        for (const attr of attributesConfig) {
            if (existingKeys.includes(attr.key)) {
                console.log(`Attribute ${attr.key} already exists.`);
                continue;
            }

            console.log(`Creating attribute ${attr.key}...`);
            try {
                if (attr.type === 'string') {
                    await databases.createStringAttribute(DATABASE_ID, collection.$id, attr.key, attr.size, attr.required, undefined, attr.array);
                } else if (attr.type === 'integer') {
                    await databases.createIntegerAttribute(DATABASE_ID, collection.$id, attr.key, attr.required, 0, 1000000, undefined, attr.array); // min/max dummy
                } else if (attr.type === 'boolean') {
                    await databases.createBooleanAttribute(DATABASE_ID, collection.$id, attr.key, attr.required, undefined, attr.array);
                }
                // Wait small bit to avoid rate limits or race conditions if any
                await new Promise(r => setTimeout(r, 500));
            } catch (err) {
                console.error(`Failed to create attribute ${attr.key}:`, err.message);
            }
        }

        console.log('Done!');

    } catch (error) {
        console.error('Error:', error);
    }
}

main();
