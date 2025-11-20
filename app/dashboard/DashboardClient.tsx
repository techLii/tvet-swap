"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions/auth";
import { updateProfile } from "@/lib/actions/profile";
import { Profile } from "@/types";
import { KENYAN_COUNTIES } from "@/lib/constants";
import { LogOut, Save, MapPin, Building, User } from "lucide-react";
import Link from "next/link";

interface DashboardClientProps {
    user: any;
    profile: Profile;
}

export default function DashboardClient({ user, profile }: DashboardClientProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        isOpenToSwap: profile.isOpenToSwap,
        desiredCounties: profile.desiredCounties || [],
        desiredInstitutions: profile.desiredInstitutions || [],
        availabilityDate: profile.availabilityDate || "",
    });

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    const handleSave = async () => {
        setLoading(true);
        setError("");
        setSuccess("");

        // Only save isOpenToSwap for now
        const dataToSave: any = {
            isOpenToSwap: formData.isOpenToSwap,
        };

        const result = await updateProfile(profile.$id, dataToSave);

        if (result.success) {
            setSuccess("Profile updated successfully!");
            setIsEditing(false);
            // Don't call router.refresh() - it causes profile not found error
        } else {
            setError(result.error || "Failed to update profile");
        }

        setLoading(false);
    };

    const toggleCounty = (county: string) => {
        setFormData((prev) => ({
            ...prev,
            desiredCounties: prev.desiredCounties.includes(county)
                ? prev.desiredCounties.filter((c) => c !== county)
                : [...prev.desiredCounties, county],
        }));
    };

    return (
        <div className="min-h-screen bg-muted/20">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Building className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">TVET Swap</span>
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link
                            href="/trainers"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Browse Trainers
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 text-destructive hover:text-destructive"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold tracking-tight mb-8">My Dashboard</h1>

                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm font-medium">
                            {success}
                        </div>
                    )}

                    {/* Profile Information */}
                    <div className="bg-card rounded-xl border border-border shadow-sm p-6 mb-6">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">{profile.fullName}</h2>
                                <p className="text-muted-foreground">{user.email}</p>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-xs font-medium">
                                <User className="w-3.5 h-3.5 text-muted-foreground" />
                                <span>TSC: {profile.tscNumber}</span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5 text-muted-foreground">
                                        <Building className="w-4 h-4" />
                                        <h3 className="text-sm font-medium uppercase tracking-wider">Current Position</h3>
                                    </div>
                                    <div className="pl-6">
                                        <p className="font-medium">{profile.currentInstitution}</p>
                                        <p className="text-muted-foreground text-sm">{profile.currentCounty}</p>
                                        {profile.currentSubCounty && (
                                            <p className="text-muted-foreground text-sm">{profile.currentSubCounty}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-1.5 text-muted-foreground">
                                        <Building className="w-4 h-4" />
                                        <h3 className="text-sm font-medium uppercase tracking-wider">Experience</h3>
                                    </div>
                                    <div className="pl-6">
                                        <p className="font-medium">{profile.yearsOfExperience} years</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5 text-muted-foreground">
                                        <MapPin className="w-4 h-4" />
                                        <h3 className="text-sm font-medium uppercase tracking-wider">Courses Qualified</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pl-6">
                                        {profile.courseQualified.map((course) => (
                                            <span
                                                key={course}
                                                className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                                            >
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-1.5 text-muted-foreground">
                                        <Building className="w-4 h-4" />
                                        <h3 className="text-sm font-medium uppercase tracking-wider">Phone</h3>
                                    </div>
                                    <div className="pl-6">
                                        <p className="font-medium">{profile.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transfer Preferences */}
                    <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold tracking-tight">Transfer Preferences</h2>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                                >
                                    Edit Preferences
                                </button>
                            )}
                        </div>

                        {/* Open to Swap Toggle */}
                        <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border/50">
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <h3 className="font-semibold">I am open to mutual transfer</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Enable this to appear in public search results
                                    </p>
                                </div>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={formData.isOpenToSwap}
                                        onChange={(e) =>
                                            setFormData({ ...formData, isOpenToSwap: e.target.checked })
                                        }
                                        disabled={!isEditing}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-input peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </div>
                            </label>
                        </div>

                        {/* Note about optional fields */}
                        <div className="mb-6 p-4 bg-yellow-50/50 border border-yellow-200/50 rounded-lg">
                            <p className="text-sm text-yellow-800">
                                <strong>Note:</strong> Desired Counties, Desired Institutions, and Availability Date fields are visible but won't be saved until you add those attributes to your Appwrite collection. See SETUP.md for instructions.
                            </p>
                        </div>

                        {/* Desired Counties */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Desired Counties (Not saved yet)</h3>
                            {isEditing ? (
                                <div className="grid md:grid-cols-3 gap-2 max-h-64 overflow-y-auto border border-input rounded-lg p-4 bg-background">
                                    {KENYAN_COUNTIES.map((county) => (
                                        <label key={county} className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 p-1 rounded">
                                            <input
                                                type="checkbox"
                                                checked={formData.desiredCounties.includes(county)}
                                                onChange={() => toggleCounty(county)}
                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm">{county}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {formData.desiredCounties.length > 0 ? (
                                        formData.desiredCounties.map((county) => (
                                            <span
                                                key={county}
                                                className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                                            >
                                                {county}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground text-sm italic">No counties selected</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Save/Cancel Buttons */}
                        {isEditing && (
                            <div className="flex gap-3 pt-4 border-t border-border">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({
                                            isOpenToSwap: profile.isOpenToSwap,
                                            desiredCounties: profile.desiredCounties || [],
                                            desiredInstitutions: profile.desiredInstitutions || [],
                                            availabilityDate: profile.availabilityDate || "",
                                        });
                                    }}
                                    disabled={loading}
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
