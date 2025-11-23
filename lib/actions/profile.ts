"use server";

import { createSessionClient, createAdminClient, DATABASE_ID, COLLECTION_PROFILES_ID } from "@/lib/appwrite";
import { Profile, CreateProfileFormData } from "@/types";
import { Query, ID } from "node-appwrite";

export async function createProfile(data: CreateProfileFormData) {
    try {
        const { databases, account } = await createSessionClient();
        const user = await account.get();

        const courseQualified = [data.subject1, data.subject2];
        if (data.subject3) courseQualified.push(data.subject3);

        const profileData = {
            userId: user.$id,
            fullName: data.fullName,
            idNumber: data.idNumber,
            phone: data.phone,
            tscNumber: data.tscNumber,
            currentInstitution: data.currentInstitution,
            currentCounty: data.currentCounty,
            currentSubCounty: data.currentSubCounty,
            courseQualified: courseQualified,
            yearsOfExperience: data.yearsOfExperience,
            isOpenToSwap: data.isOpenToSwap,
            desiredCounties: data.desiredCounties,
            desiredInstitutions: data.desiredInstitutions,
            availabilityDate: data.availabilityDate,
        };

        const newProfile = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_PROFILES_ID,
            ID.unique(),
            profileData
        );

        return { success: true, profile: newProfile };
    } catch (error: any) {
        console.error("Create profile error:", error);
        return { success: false, error: error.message };
    }
}

export async function getProfile(userId: string) {
    try {
        const { databases } = await createSessionClient();

        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_PROFILES_ID,
            [Query.equal("userId", userId)]
        );

        if (response.documents.length === 0) {
            return null;
        }

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

export async function getPublicProfiles(
    page: number = 1,
    limit: number = 10,
    filters?: {
        search?: string;
        course?: string;
        currentCounty?: string;
        desiredCounty?: string;
    }
) {
    try {
        // Use admin client for public access (no auth required)
        const { databases } = await createAdminClient();

        const queries = [Query.equal("isOpenToSwap", true)];

        if (filters?.search) {
            queries.push(Query.search("fullName", filters.search));
        }

        if (filters?.course) {
            queries.push(Query.contains("courseQualified", filters.course));
        }

        if (filters?.currentCounty) {
            queries.push(Query.equal("currentCounty", filters.currentCounty));
        }

        if (filters?.desiredCounty) {
            queries.push(Query.contains("desiredCounties", filters.desiredCounty));
        }

        // Add pagination
        const offset = (page - 1) * limit;
        queries.push(Query.limit(limit));
        queries.push(Query.offset(offset));
        // Order by creation time descending (newest first)
        queries.push(Query.orderDesc("$createdAt"));

        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_PROFILES_ID,
            queries
        );

        return {
            profiles: response.documents as unknown as Profile[],
            total: response.total
        };
    } catch (error: any) {
        console.error("Get public profiles error:", error);
        return { profiles: [], total: 0 };
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
