"use client";

import { useState } from "react";
import { Profile } from "@/types";
import { updateProfile } from "@/lib/actions/profile";
import { useRouter } from "next/navigation";

export function useTransferPreferences(profile: Profile) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const [formData, setFormData] = useState({
        phone: profile.phone || "",
        currentInstitution: profile.currentInstitution || "",
        currentCounty: profile.currentCounty || "",
        currentSubCounty: profile.currentSubCounty || "",
        subject1: profile.courseQualified[0] || "",
        subject2: profile.courseQualified[1] || "",
        subject3: profile.courseQualified[2] || "",
        desiredCounties: profile.desiredCounties || [],
        desiredInstitutions: profile.desiredInstitutions || [],
        isOpenToSwap: profile.isOpenToSwap || false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: "desiredCounties" | "desiredInstitutions") => {
        const options = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData((prev) => ({ ...prev, [field]: options }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);

        // Validation
        if (!formData.phone || !formData.currentInstitution || !formData.currentCounty || !formData.subject1) {
            setMessage({ type: "error", text: "Please fill in all required fields." });
            setIsSaving(false);
            return;
        }

        const courseQualified = [formData.subject1, formData.subject2].filter(Boolean);
        if (formData.subject3) courseQualified.push(formData.subject3);

        const updateData = {
            phone: formData.phone,
            currentInstitution: formData.currentInstitution,
            currentCounty: formData.currentCounty,
            currentSubCounty: formData.currentSubCounty,
            courseQualified: courseQualified,
            desiredCounties: formData.desiredCounties,
            desiredInstitutions: formData.desiredInstitutions,
            isOpenToSwap: formData.isOpenToSwap,
        };

        const result = await updateProfile(profile.$id, updateData);

        if (result.success) {
            setMessage({ type: "success", text: "Profile updated successfully!" });
            router.refresh();
        } else {
            setMessage({ type: "error", text: result.error || "Failed to update profile." });
        }
        setIsSaving(false);
    };

    return {
        formData,
        isSaving,
        message,
        handleChange,
        handleCheckboxChange,
        handleMultiSelectChange,
        handleSubmit
    };
}
