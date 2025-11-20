import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/actions/auth";
import { getPublicProfiles } from "@/lib/actions/profile";
import TrainersClient from "./TrainersClient";

export default async function TrainersPage() {
    // Require authentication
    const user = await getLoggedInUser();

    if (!user) {
        redirect("/login");
    }

    // Only fetch profiles that are open to swap
    const profiles = await getPublicProfiles();

    return <TrainersClient initialProfiles={profiles} />;
}
