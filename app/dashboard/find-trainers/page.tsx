
import { getLoggedInUser } from "@/lib/actions/auth";
import { getPublicProfiles } from "@/lib/actions/profile";
import TrainersClient from "@/app/(main)/trainers/TrainersClient";

export default async function FindTrainersPage({ searchParams }: { searchParams: Promise<{ page?: string; search?: string; course?: string; currentCounty?: string; desiredCounty?: string }> }) {
    // Get logged in user
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

    // If I'm using the exact same filtering logic for logged in/out users as the main trainers page,
    // I can reuse it. However, in the dashboard, the user is always logged in.
    // The original page had logic to mask names if !user.
    // Here user is guaranteed (layout redirects if not).

    const displayedProfiles = profiles;

    return (
        <div className="h-full">
            <h2 className="text-2xl font-bold mb-6">Find Trainers</h2>
            <TrainersClient
                initialProfiles={displayedProfiles}
                user={user}
                totalCount={total}
                currentPage={page}
                limit={limit}
            />
        </div>
    );
}
