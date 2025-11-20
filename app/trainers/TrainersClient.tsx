"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Profile } from "@/types";
import { KENYAN_COUNTIES, TVET_COURSES } from "@/lib/constants";
import { Search, MapPin, Building, Phone, GraduationCap, Calendar, LogOut } from "lucide-react";
import { logout } from "@/lib/actions/auth";

interface TrainersClientProps {
    initialProfiles: Profile[];
}

export default function TrainersClient({ initialProfiles }: TrainersClientProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedCurrentCounty, setSelectedCurrentCounty] = useState("");
    const [selectedDesiredCounty, setSelectedDesiredCounty] = useState("");

    const filteredProfiles = useMemo(() => {
        return initialProfiles.filter((profile) => {
            const matchesSearch =
                searchTerm === "" ||
                profile.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.currentInstitution.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCourse =
                selectedCourse === "" || profile.courseQualified.includes(selectedCourse);

            const matchesCurrentCounty =
                selectedCurrentCounty === "" || profile.currentCounty === selectedCurrentCounty;

            const matchesDesiredCounty =
                selectedDesiredCounty === "" ||
                (profile.desiredCounties && profile.desiredCounties.includes(selectedDesiredCounty));

            return matchesSearch && matchesCourse && matchesCurrentCounty && matchesDesiredCounty;
        });
    }, [initialProfiles, searchTerm, selectedCourse, selectedCurrentCounty, selectedDesiredCounty]);

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
                            href="/dashboard"
                            className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            My Dashboard
                        </Link>
                        <button
                            onClick={async () => {
                                await logout();
                                window.location.href = "/";
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Find TVET Trainers</h1>
                    <p className="text-gray-600">
                        Browse trainers who are open to mutual transfers. {filteredProfiles.length} trainer(s) found.
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search by Name or Institution
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Course Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course
                            </label>
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="">All Courses</option>
                                {TVET_COURSES.map((course) => (
                                    <option key={course} value={course}>
                                        {course}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Current County Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current County
                            </label>
                            <select
                                value={selectedCurrentCounty}
                                onChange={(e) => setSelectedCurrentCounty(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="">All Counties</option>
                                {KENYAN_COUNTIES.map((county) => (
                                    <option key={county} value={county}>
                                        {county}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Desired County Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Wants to Move To
                            </label>
                            <select
                                value={selectedDesiredCounty}
                                onChange={(e) => setSelectedDesiredCounty(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="">Any County</option>
                                {KENYAN_COUNTIES.map((county) => (
                                    <option key={county} value={county}>
                                        {county}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Clear Filters */}
                    {(searchTerm || selectedCourse || selectedCurrentCounty || selectedDesiredCounty) && (
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCourse("");
                                setSelectedCurrentCounty("");
                                setSelectedDesiredCounty("");
                            }}
                            className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>

                {/* Trainer Cards */}
                {filteredProfiles.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <p className="text-gray-600 text-lg">
                            No trainers found matching your criteria. Try adjusting your filters.
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProfiles.map((profile) => (
                            <div
                                key={profile.$id}
                                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                            >
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{profile.fullName}</h3>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <GraduationCap className="w-4 h-4" />
                                        <span>{profile.yearsOfExperience} years experience</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div className="flex items-start gap-2">
                                        <Building className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-sm text-gray-700">Current Position</p>
                                            <p className="text-sm text-gray-600">{profile.currentInstitution}</p>
                                            <p className="text-sm text-gray-600">{profile.currentCounty}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-sm text-gray-700">Wants to Move To</p>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {profile.desiredCounties && profile.desiredCounties.length > 0 ? (
                                                    profile.desiredCounties.slice(0, 3).map((county) => (
                                                        <span
                                                            key={county}
                                                            className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs"
                                                        >
                                                            {county}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-gray-500">Any county</span>
                                                )}
                                                {profile.desiredCounties && profile.desiredCounties.length > 3 && (
                                                    <span className="text-xs text-gray-500">
                                                        +{profile.desiredCounties.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="font-medium text-sm text-gray-700 mb-1">Courses</p>
                                        <div className="flex flex-wrap gap-1">
                                            {profile.courseQualified.slice(0, 2).map((course) => (
                                                <span
                                                    key={course}
                                                    className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs"
                                                >
                                                    {course}
                                                </span>
                                            ))}
                                            {profile.courseQualified.length > 2 && (
                                                <span className="text-xs text-gray-500">
                                                    +{profile.courseQualified.length - 2} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {profile.availabilityDate && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span>Available: {new Date(profile.availabilityDate).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <a
                                        href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <Phone className="w-4 h-4" />
                                        WhatsApp
                                    </a>
                                    <Link
                                        href={`/trainers/${profile.$id}`}
                                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-center"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
