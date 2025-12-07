"use client";

import { Profile } from "@/types";
import DocumentDownloads from "./DocumentDownloads";
import DashboardHeader from "./components/DashboardHeader";
import ProfileCard from "./components/ProfileCard";
import NotificationsCard from "./components/NotificationsCard";
import TransferPreferencesForm from "./components/TransferPreferencesForm";
import { useTransferPreferences } from "./hooks/useTransferPreferences";

interface DashboardClientProps {
    user: any;
    profile: Profile | null;
}

export default function DashboardClient({ user, profile }: DashboardClientProps) {
    const {
        formData,
        isSaving,
        message,
        handleChange,
        handleCheckboxChange,
        handleMultiSelectChange,
        handleSubmit
    } = useTransferPreferences(profile);

    return (
        <div className="min-h-screen bg-muted/20 pb-12">
            <DashboardHeader user={user} profile={profile} />

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Profile Summary & Status */}
                    <div className="space-y-6">
                        <ProfileCard profile={profile} isOpenToSwap={formData.isOpenToSwap} />
                        <NotificationsCard />
                        <DocumentDownloads />
                    </div>

                    {/* Right Column: Edit Form */}
                    <div className="lg:col-span-2">
                        <TransferPreferencesForm
                            formData={formData}
                            isSaving={isSaving}
                            message={message}
                            handleChange={handleChange}
                            handleCheckboxChange={handleCheckboxChange}
                            handleMultiSelectChange={handleMultiSelectChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
