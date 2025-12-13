import { getLoggedInUser } from "@/lib/actions/auth";
import { getProfile } from "@/lib/actions/profile";
import { redirect } from "next/navigation";
import TransferPreferencesClient from "./TransferPreferencesClient";

export default async function TransferPreferencesPage() {
    const user = await getLoggedInUser();

    if (!user) {
        redirect("/login");
    }

    const profile = await getProfile(user.$id);

    return <TransferPreferencesClient profile={profile} />;
}
