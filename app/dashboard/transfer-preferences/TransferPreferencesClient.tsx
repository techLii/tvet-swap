"use client";

import { Profile } from "@/types";
import TransferPreferencesForm from "../components/TransferPreferencesForm";
import { useTransferPreferences } from "../hooks/useTransferPreferences";

interface TransferPreferencesClientProps {
    profile: Profile | null;
}

export default function TransferPreferencesClient({ profile }: TransferPreferencesClientProps) {
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
        <div className="h-full">
            <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Transfer Preferences</h2>
                <p className="text-muted-foreground mt-1">
                    Update your preferred transfer locations and settings.
                </p>
            </div>
            <div className="bg-card rounded-lg border shadow-sm p-6">
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
    );
}
