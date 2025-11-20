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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-indigo-600">
                        TVET Swap Kenya
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link
                            href="/trainers"
                            className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            Browse Trainers
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                            {success}
                        </div>
                    )}

                    {/* Profile Information */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{profile.fullName}</h2>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5 text-gray-400" />
                                <span className="text-sm text-gray-600">TSC: {profile.tscNumber}</span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Building className="w-5 h-5 text-indigo-600" />
                                    <h3 className="font-semibold">Current Position</h3>
                                </div>
                                <p className="text-gray-700">{profile.currentInstitution}</p>
                                <p className="text-gray-600">{profile.currentCounty}</p>
                                {profile.currentSubCounty && (
                                    <p className="text-gray-600">{profile.currentSubCounty}</p>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-5 h-5 text-indigo-600" />
                                    <h3 className="font-semibold">Courses Qualified</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {profile.courseQualified.map((course) => (
                                        <span
                                            key={course}
                                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                                        >
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Experience</h3>
                                <p className="text-gray-700">{profile.yearsOfExperience} years</p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Phone</h3>
                                <p className="text-gray-700">{profile.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Transfer Preferences */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Transfer Preferences</h2>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Edit
                                </button>
                            )}
                        </div>

                        {/* Open to Swap Toggle */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <h3 className="font-semibold text-lg">I am open to mutual transfer</h3>
                                    <p className="text-gray-600 text-sm">
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
                                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600"></div>
                                </div>
                            </label>
                        </div>

                        {/* Note about optional fields */}
                        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800">
                                <strong>Note:</strong> Desired Counties, Desired Institutions, and Availability Date fields are visible but won't be saved until you add those attributes to your Appwrite collection. See SETUP.md for instructions.
                            </p>
                        </div>

                        {/* Desired Counties */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Desired Counties (Not saved yet)</h3>
                            {isEditing ? (
                                <div className="grid md:grid-cols-3 gap-2 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
                                    {KENYAN_COUNTIES.map((county) => (
                                        <label key={county} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.desiredCounties.includes(county)}
                                                onChange={() => toggleCounty(county)}
                                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                            />
                                            <span className="text-sm text-gray-700">{county}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {formData.desiredCounties.length > 0 ? (
                                        formData.desiredCounties.map((county) => (
                                            <span
                                                key={county}
                                                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                                            >
                                                {county}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No counties selected</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Save/Cancel Buttons */}
                        {isEditing && (
                            <div className="flex gap-4">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
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
                                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
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
