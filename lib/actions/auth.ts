"use server";

import { ID } from "node-appwrite";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { LoginFormData, RegisterFormData } from "@/types";



export async function login(data: LoginFormData) {
    try {
        const { account } = await createAdminClient();

        const session = await account.createEmailPasswordSession(
            data.email,
            data.password
        );

        const cookieStore = await cookies();
        cookieStore.set("session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return { success: true };
    } catch (error: any) {
        console.error("Login error:", error);
        return { success: false, error: error.message };
    }
}

export async function register(data: RegisterFormData) {
    try {
        const { account } = await createAdminClient();

        // Create the account
        await account.create(
            ID.unique(),
            data.email,
            data.password,
            data.name
        );

        // Login the user immediately
        const session = await account.createEmailPasswordSession(
            data.email,
            data.password
        );

        const cookieStore = await cookies();
        cookieStore.set("session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return { success: true };
    } catch (error: any) {
        console.error("Registration error:", error);
        return { success: false, error: error.message };
    }
}

export async function logout() {
    try {
        const { account } = await createSessionClient();
        await account.deleteSession("current");

        const cookieStore = await cookies();
        cookieStore.delete("session");

        return { success: true };
    } catch (error: any) {
        console.error("Logout error:", error);
        return { success: false, error: error.message };
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        return await account.get();
    } catch (error) {
        return null;
    }
}
