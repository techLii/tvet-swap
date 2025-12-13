"use client";

import { Profile } from "@/types";
import ProfileCard from "./components/ProfileCard";

interface DashboardClientProps {
    user: any;
    profile: Profile | null;
}

export default function DashboardClient({ user, profile }: DashboardClientProps) {
    return (
        <div className="h-full">
            <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                <p className="text-muted-foreground mt-1">
                    Manage your profile and view your account status.
                </p>
            </div>

            {/* Left Column: Profile Summary & Status */}
            <div className="space-y-6">
                <ProfileCard profile={profile} isOpenToSwap={profile?.isOpenToSwap || false} />
            </div>
        </div>
    );
}
