import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/actions/auth";
import { getProfile } from "@/lib/actions/profile";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
    const user = await getLoggedInUser();

    if (!user) {
        redirect("/login");
    }

    const profile = await getProfile(user.$id);

    if (!profile) {
        // Log locally if needed, but avoid production noise or extensive logging
    }

    return <DashboardClient user={user} profile={profile} />;
}
