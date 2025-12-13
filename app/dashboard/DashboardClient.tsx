"use client";

import { Profile } from "@/types";
import ProfileCard from "./components/ProfileCard";

interface DashboardClientProps {
    user: any;
    profile: Profile | null;
}

export default function DashboardClient({ user, profile }: DashboardClientProps) {
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Overview</h2>

            {/* Left Column: Profile Summary & Status */}
            <div className="space-y-6">
                <ProfileCard profile={profile} isOpenToSwap={profile?.isOpenToSwap || false} />
            </div>
        </div>
    );
}
