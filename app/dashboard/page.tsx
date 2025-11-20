import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/actions/auth";
import { getProfile } from "@/lib/actions/profile";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
    const user = await getLoggedInUser();

    if (!user) {
        redirect("/login");
    }

    console.log("Dashboard: Fetching profile for user:", user.$id);
    const profile = await getProfile(user.$id);

    if (!profile) {
        console.error("Dashboard: Profile not found for user:", user.$id);
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
                    <p className="text-gray-600 mb-4">
                        There was an error loading your profile. This might be a temporary issue.
                    </p>
                    <p className="text-sm text-gray-500 mb-4">User ID: {user.$id}</p>
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-4 text-left">
                        <p className="font-semibold mb-2">Action Required:</p>
                        <p className="text-sm">
                            Your account exists but has no associated profile.
                            <br />
                            <strong>Administrator:</strong> Please create a document in the 'profiles' collection with:
                            <br />
                            <code>userId: {user.$id}</code>
                        </p>
                    </div>
                    <a
                        href="/login"
                        className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Back to Login
                    </a>
                </div>
            </div>
        );
    }

    console.log("Dashboard: Profile loaded successfully:", profile.$id);
    return <DashboardClient user={user} profile={profile} />;
}
