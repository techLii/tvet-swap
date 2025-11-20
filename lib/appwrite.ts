import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

// Environment variables
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY!;

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const COLLECTION_PROFILES_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PROFILES_ID!;

// Create session client (for authenticated users)
export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID);

    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session || !session.value) {
        throw new Error("No session");
    }

    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
    };
}

// Create admin client (for server-side operations)
export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID)
        .setKey(APPWRITE_API_KEY);

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
        get users() {
            return new Users(client);
        },
    };
}
