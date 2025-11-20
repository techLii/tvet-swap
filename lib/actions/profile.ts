"use server";

import { createSessionClient, createAdminClient, DATABASE_ID, COLLECTION_PROFILES_ID } from "@/lib/appwrite";
import { Profile } from "@/types";
import { Query } from "node-appwrite";

export async function getProfile(userId: string) {
    try {
        console.log("Getting profile for userId:", userId);
        console.log("Database ID:", DATABASE_ID);
        console.log("Collection ID:", COLLECTION_PROFILES_ID);

        const { databases } = await createSessionClient();

        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_PROFILES_ID,
            [Query.equal("userId", userId)]
        );

        console.log("Profile query response:", {
            total: response.total,
            documentsCount: response.documents.length,
        });

        if (response.documents.length === 0) {
            console.log("No profile found for userId:", userId);
            return null;
        }

        console.log("Profile found:", response.documents[0].$id);
        return response.documents[0] as unknown as Profile;
    } catch (error: any) {
        console.error("Get profile error:", error);
        return null;
    }
}

export async function updateProfile(profileId: string, data: Partial<Profile>) {
    try {
        const { databases } = await createSessionClient();

        const updatedProfile = await databases.updateDocument(
            DATABASE_ID,
            COLLECTION_PROFILES_ID,
            profileId,
            data
        );

        return { success: true, profile: updatedProfile };
    } catch (error: any) {
        console.error("Update profile error:", error);
        return { success: false, error: error.message };
    }
}

export async function getPublicProfiles(filters?: {
    course?: string;
    currentCounty?: string;
    desiredCounty?: string;
}) {
    try {
        // Use admin client for public access (no auth required)
        const { databases } = await createAdminClient();

        const queries = [Query.equal("isOpenToSwap", true)];

        if (filters?.course) {
            queries.push(Query.contains("courseQualified", filters.course));
        }

        if (filters?.currentCounty) {
            queries.push(Query.equal("currentCounty", filters.currentCounty));
        }

        if (filters?.desiredCounty) {
            queries.push(Query.contains("desiredCounties", filters.desiredCounty));
        }

        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_PROFILES_ID,
            queries
        );

        return response.documents as unknown as Profile[];
    } catch (error: any) {
        console.error("Get public profiles error:", error);
        return [];
    }
}

export async function getProfileById(profileId: string) {
    try {
        // Use admin client for public profile viewing
        const { databases } = await createAdminClient();

        const profile = await databases.getDocument(
            DATABASE_ID,
            COLLECTION_PROFILES_ID,
            profileId
        );

        return profile as unknown as Profile;
    } catch (error: any) {
        console.error("Get profile by ID error:", error);
        return null;
    }
}
