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
        console.warn("Dashboard: Profile not found for user:", user.$id);
    } else {
        console.log("Dashboard: Profile loaded successfully:", profile.$id);
    }

    return <DashboardClient user={user} profile={profile} />;

    console.log("Dashboard: Profile loaded successfully:", profile.$id);
    return <DashboardClient user={user} profile={profile} />;
}
