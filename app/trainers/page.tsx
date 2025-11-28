
import { getLoggedInUser } from "@/lib/actions/auth";
import { getPublicProfiles } from "@/lib/actions/profile";
import TrainersClient from "./TrainersClient";

export default async function TrainersPage({ searchParams }: { searchParams: Promise<{ page?: string; search?: string; course?: string; currentCounty?: string; desiredCounty?: string }> }) {
    // Get logged in user (optional)
    const user = await getLoggedInUser();

    // Parse params
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const limit = 10;

    const filters = {
        search: params?.search,
        course: params?.course,
        currentCounty: params?.currentCounty,
        desiredCounty: params?.desiredCounty,
    };

    // Fetch paginated profiles
    const { profiles, total } = await getPublicProfiles(page, limit, filters);

    let displayedProfiles = profiles;

    if (!user) {
        displayedProfiles = profiles.map(profile => ({
            ...profile,
            fullName: profile.fullName.split(' ').map(part => part[0] + '*'.repeat(Math.max(0, part.length - 1))).join(' ')
        }));
    }

    return (
        <TrainersClient
            initialProfiles={displayedProfiles}
            user={user}
            totalCount={total}
            currentPage={page}
            limit={limit}
        />
    );
}
