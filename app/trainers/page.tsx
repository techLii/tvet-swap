
import { getLoggedInUser } from "@/lib/actions/auth";
import { getPublicProfiles } from "@/lib/actions/profile";
import TrainersClient from "./TrainersClient";

export default async function TrainersPage() {
    // Get logged in user (optional)
    const user = await getLoggedInUser();

    // Only fetch profiles that are open to swap
    const profiles = await getPublicProfiles();

    return <TrainersClient initialProfiles={profiles} user={user} />;
}
