"use client";

import { Profile } from "@/types";
import { Briefcase, MapPin, BookOpen } from "lucide-react";

interface ProfileCardProps {
    profile: Profile | null;
    isOpenToSwap: boolean;
}

export default function ProfileCard({ profile, isOpenToSwap }: ProfileCardProps) {
    if (!profile) {
        return (
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        ?
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">No Profile</h2>
                        <p className="text-sm text-muted-foreground">Please create a profile</p>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                        {profile.fullName.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">{profile.fullName}</h2>
                        <p className="text-sm text-muted-foreground">{profile.tscNumber}</p>
                    </div>
                </div>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Briefcase className="w-4 h-4" />
                        <span>{profile.currentInstitution}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{profile.currentCounty}, {profile.currentSubCounty}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        <span>{profile.courseQualified.join(", ")}</span>
                    </div>
                </div>
            </div>
            <div className="bg-muted/50 px-6 py-3 border-t border-border">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Swap Status</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isOpenToSwap
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}>
                        {isOpenToSwap ? "Active" : "Paused"}
                    </span>
                </div>
            </div>
        </div>
    );
}
