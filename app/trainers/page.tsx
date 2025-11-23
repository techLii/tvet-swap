
import { getLoggedInUser } from "@/lib/actions/auth";
import { getPublicProfiles } from "@/lib/actions/profile";
import TrainersClient from "./TrainersClient";

export default async function TrainersPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    // Get logged in user (optional)
    const user = await getLoggedInUser();

    // Parse page number
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const limit = 10;

    // Fetch paginated profiles
    const { profiles, total } = await getPublicProfiles(page, limit);

    return (
        <TrainersClient
            initialProfiles={profiles}
            user={user}
            totalCount={total}
            currentPage={page}
            limit={limit}
        />
    );
}
