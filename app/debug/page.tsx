import { getLoggedInUser } from "@/lib/actions/auth";
import { createAdminClient, DATABASE_ID, COLLECTION_PROFILES_ID } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { redirect } from "next/navigation";

export default async function DebugPage() {
    const user = await getLoggedInUser();

    if (!user) {
        redirect("/login");
    }

    let profile = null;
    let error = null;

    try {
        const { databases } = await createAdminClient();
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_PROFILES_ID,
            [Query.equal("userId", user.$id)]
        );

        if (response.documents.length > 0) {
            profile = response.documents[0];
        }
    } catch (e: any) {
        error = e.message;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Debug Information</h1>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">User Information</h2>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-4">
                            Error: {error}
                        </div>
                    )}
                    {profile ? (
                        <pre className="bg-gray-100 p-4 rounded overflow-auto">
                            {JSON.stringify(profile, null, 2)}
                        </pre>
                    ) : (
                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded">
                            No profile found for user ID: {user.$id}
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Environment Variables</h2>
                    <div className="space-y-2">
                        <p>
                            <strong>Database ID:</strong> {DATABASE_ID || "NOT SET"}
                        </p>
                        <p>
                            <strong>Collection ID:</strong> {COLLECTION_PROFILES_ID || "NOT SET"}
                        </p>
                        <p>
                            <strong>Endpoint:</strong> {process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "NOT SET"}
                        </p>
                        <p>
                            <strong>Project ID:</strong> {process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "NOT SET"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
