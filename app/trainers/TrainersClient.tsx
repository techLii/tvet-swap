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
                            href="/dashboard"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Dashboard
                        </Link>
                        <button
                            onClick={async () => {
                                await logout();
                                window.location.href = "/";
                            }}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 text-destructive hover:text-destructive"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Find Trainers</h1>
                        <p className="text-muted-foreground mt-1">
                            Browse {filteredProfiles.length} trainers open to mutual transfers.
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-card rounded-xl border border-border shadow-sm p-6 mb-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Search */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Search
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Name or Institution..."
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                        </div>

                        {/* Course Filter */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Course
                            </label>
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Current County
                            </label>
                            <select
                                value={selectedCurrentCounty}
                                onChange={(e) => setSelectedCurrentCounty(e.target.value)}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Target County
                            </label>
                            <select
                                value={selectedDesiredCounty}
                                onChange={(e) => setSelectedDesiredCounty(e.target.value)}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCourse("");
                                    setSelectedCurrentCounty("");
                                    setSelectedDesiredCounty("");
                                }}
                                className="text-sm text-primary hover:underline font-medium"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Trainer Cards */}
                {filteredProfiles.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center border rounded-xl border-dashed">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                            <Search className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold">No trainers found</h3>
                        <p className="text-muted-foreground text-sm mt-1 max-w-sm">
                            We couldn't find any trainers matching your current filters. Try adjusting your search criteria.
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProfiles.map((profile) => (
                            <div
                                key={profile.$id}
                                className="group bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden"
                            >
                                <div className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-semibold text-lg tracking-tight group-hover:text-primary transition-colors">
                                                {profile.fullName}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
                                                <GraduationCap className="w-3.5 h-3.5" />
                                                <span>{profile.yearsOfExperience} years exp.</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Building className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Current</p>
                                                <p className="text-sm font-medium">{profile.currentInstitution}</p>
                                                <p className="text-sm text-muted-foreground">{profile.currentCounty}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <MapPin className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Target</p>
                                                <div className="flex flex-wrap gap-1.5 mt-1">
                                                    {profile.desiredCounties && profile.desiredCounties.length > 0 ? (
                                                        profile.desiredCounties.slice(0, 3).map((county) => (
                                                            <span
                                                                key={county}
                                                                className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                                                            >
                                                                {county}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">Any county</span>
                                                    )}
                                                    {profile.desiredCounties && profile.desiredCounties.length > 3 && (
                                                        <span className="text-xs text-muted-foreground self-center">
                                                            +{profile.desiredCounties.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {profile.courseQualified.slice(0, 2).map((course) => (
                                                    <span
                                                        key={course}
                                                        className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                                                    >
                                                        {course}
                                                    </span>
                                                ))}
                                                {profile.courseQualified.length > 2 && (
                                                    <span className="text-xs text-muted-foreground self-center">
                                                        +{profile.courseQualified.length - 2} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-muted/30 border-t border-border flex gap-3">
                                    <a
                                        href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#25D366] text-white shadow hover:bg-[#25D366]/90 h-9 px-4 py-2"
                                    >
                                        <Phone className="w-4 h-4 mr-2" />
                                        WhatsApp
                                    </a>
                                    <Link
                                        href={`/trainers/${profile.$id}`}
                                        className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
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
