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
        <div className="min-h-screen bg-muted/20 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight mb-8">Debug Information</h1>

                <div className="bg-card rounded-xl border border-border shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold tracking-tight mb-4">User Information</h2>
                    <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs font-mono border border-border">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </div>

                <div className="bg-card rounded-xl border border-border shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold tracking-tight mb-4">Profile Information</h2>
                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg mb-4 text-sm font-medium">
                            Error: {error}
                        </div>
                    )}
                    {profile ? (
                        <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs font-mono border border-border">
                            {JSON.stringify(profile, null, 2)}
                        </pre>
                    ) : (
                        <div className="bg-yellow-50/50 border border-yellow-200/50 text-yellow-800 p-4 rounded-lg text-sm font-medium">
                            No profile found for user ID: {user.$id}
                        </div>
                    )}
                </div>

                <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                    <h2 className="text-xl font-bold tracking-tight mb-4">Environment Variables</h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between p-2 bg-muted/30 rounded border border-border/50">
                            <span className="font-medium text-muted-foreground">Database ID</span>
                            <code className="bg-background px-2 py-0.5 rounded border border-input font-mono text-xs">{DATABASE_ID || "NOT SET"}</code>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted/30 rounded border border-border/50">
                            <span className="font-medium text-muted-foreground">Collection ID</span>
                            <code className="bg-background px-2 py-0.5 rounded border border-input font-mono text-xs">{COLLECTION_PROFILES_ID || "NOT SET"}</code>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted/30 rounded border border-border/50">
                            <span className="font-medium text-muted-foreground">Endpoint</span>
                            <code className="bg-background px-2 py-0.5 rounded border border-input font-mono text-xs">{process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "NOT SET"}</code>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted/30 rounded border border-border/50">
                            <span className="font-medium text-muted-foreground">Project ID</span>
                            <code className="bg-background px-2 py-0.5 rounded border border-input font-mono text-xs">{process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "NOT SET"}</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
