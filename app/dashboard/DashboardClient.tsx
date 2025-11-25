"use client";

import { useState } from "react";
import Link from "next/link";
import { Profile } from "@/types";
import { updateProfile } from "@/lib/actions/profile";
import { KENYAN_COUNTIES, TVET_COURSES } from "@/lib/constants";
import { logout } from "@/lib/actions/auth";
import {
    User,
    MapPin,
    BookOpen,
    Briefcase,
    Save,
    Loader2,
    CheckCircle2,
    AlertCircle,
    LayoutDashboard,
    Settings,
    Bell,
    LogOut,
    Users,
    FileText
} from "lucide-react";
import DocumentDownloads from "./DocumentDownloads";
import { useRouter } from "next/navigation";

interface DashboardClientProps {
    user: any;
    profile: Profile;
}

export default function DashboardClient({ user, profile }: DashboardClientProps) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Form State
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

    return (
        <div className="min-h-screen bg-muted/20 pb-12">
            {/* Header */}
            <header className="bg-background border-b border-border sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/trainers"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:flex items-center gap-2"
                        >
                            <Users className="w-4 h-4" />
                            Find Trainers
                        </Link>
                        <Link
                            href="/vacancies"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:flex items-center gap-2"
                        >
                            <Briefcase className="w-4 h-4" />
                            Vacancies
                        </Link>
                        <Link
                            href="/blog"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:flex items-center gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            Blog
                        </Link>
                        <div className="h-6 w-px bg-border hidden sm:block"></div>
                        <div className="flex items-center gap-3">

                            <button
                                onClick={async () => {
                                    await logout();
                                    window.location.href = "/";
                                }}
                                className="ml-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 sm:h-9 sm:w-auto sm:px-3 text-destructive hover:text-destructive"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4 sm:mr-2" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Profile Summary & Status */}
                    <div className="space-y-6">
                        {/* Profile Card */}
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
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${formData.isOpenToSwap
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        }`}>
                                        {formData.isOpenToSwap ? "Active" : "Paused"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats / Notifications (Placeholder) */}
                        <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <Bell className="w-4 h-4" />
                                Notifications
                            </h3>
                            <div className="text-sm text-muted-foreground text-center py-4">
                                No new notifications.
                            </div>
                        </div>

                        {/* Document Downloads */}
                        <DocumentDownloads />
                    </div>

                    {/* Right Column: Edit Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border shadow-sm">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <Settings className="w-5 h-5" />
                                    Transfer Preferences
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Update your details and transfer preferences to find better matches.
                                </p>
                            </div>

                            <div className="p-6 space-y-8">
                                {message && (
                                    <div className={`p-4 rounded-lg flex items-center gap-2 text-sm ${message.type === "success"
                                        ? "bg-green-50 text-green-900 border border-green-200"
                                        : "bg-red-50 text-red-900 border border-red-200"
                                        }`}>
                                        {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                                        {message.text}
                                    </div>
                                )}

                                {/* Contact Info */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Contact Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="07..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Current Employment */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Current Employment</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Current Institution</label>
                                            <input
                                                type="text"
                                                name="currentInstitution"
                                                value={formData.currentInstitution}
                                                onChange={handleChange}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Current County</label>
                                            <select
                                                name="currentCounty"
                                                value={formData.currentCounty}
                                                onChange={handleChange}
                                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="">Select County</option>
                                                {KENYAN_COUNTIES.map((county) => (
                                                    <option key={county} value={county}>{county}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Sub-County</label>
                                            <input
                                                type="text"
                                                name="currentSubCounty"
                                                value={formData.currentSubCounty}
                                                onChange={handleChange}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Teaching Subjects */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Teaching Subjects</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Subject 1</label>
                                            <select
                                                name="subject1"
                                                value={formData.subject1}
                                                onChange={handleChange}
                                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="">Select Subject</option>
                                                {TVET_COURSES.map((course) => (
                                                    <option key={course} value={course}>{course}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Subject 2</label>
                                            <select
                                                name="subject2"
                                                value={formData.subject2}
                                                onChange={handleChange}
                                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="">Select Subject</option>
                                                {TVET_COURSES.map((course) => (
                                                    <option key={course} value={course}>{course}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Subject 3 (Optional)</label>
                                            <select
                                                name="subject3"
                                                value={formData.subject3}
                                                onChange={handleChange}
                                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="">Select Subject</option>
                                                {TVET_COURSES.map((course) => (
                                                    <option key={course} value={course}>{course}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Transfer Preferences */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Transfer Preferences</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Preferred Counties (Hold Ctrl/Cmd to select multiple)</label>
                                            <select
                                                multiple
                                                name="desiredCounties"
                                                value={formData.desiredCounties}
                                                onChange={(e) => handleMultiSelectChange(e, "desiredCounties")}
                                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {KENYAN_COUNTIES.map((county) => (
                                                    <option key={county} value={county}>{county}</option>
                                                ))}
                                            </select>
                                            <p className="text-xs text-muted-foreground">Selected: {formData.desiredCounties.join(", ") || "None"}</p>
                                        </div>

                                        <div className="flex items-center space-x-2 pt-2">
                                            <input
                                                type="checkbox"
                                                id="isOpenToSwap"
                                                name="isOpenToSwap"
                                                checked={formData.isOpenToSwap}
                                                onChange={handleCheckboxChange}
                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <label
                                                htmlFor="isOpenToSwap"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                I am actively looking for a swap
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-muted/30 border-t border-border flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
