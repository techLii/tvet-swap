"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Profile } from "@/types";
import { KENYAN_COUNTIES, TVET_COURSES } from "@/lib/constants";
import { Search, MapPin, Building, Phone, GraduationCap, Calendar, LogOut } from "lucide-react";
import { logout } from "@/lib/actions/auth";
import { useDebouncedCallback } from "use-debounce";

interface TrainersClientProps {
    initialProfiles: Profile[];
    user: any;
    totalCount: number;
    currentPage: number;
    limit: number;
    hideLayout?: boolean;
}

export default function TrainersClient({ initialProfiles, user, totalCount, currentPage, limit, hideLayout }: TrainersClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // Initialize state from URL params
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [selectedCourse, setSelectedCourse] = useState(searchParams.get("course") || "");
    const [selectedCurrentCounty, setSelectedCurrentCounty] = useState(searchParams.get("currentCounty") || "");
    const [selectedDesiredCounty, setSelectedDesiredCounty] = useState(searchParams.get("desiredCounty") || "");

    const totalPages = Math.ceil(totalCount / limit);

    // Debounced search handler
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }
        params.set("page", "1"); // Reset to page 1 on search
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.set("page", "1"); // Reset to page 1 on filter change
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            const params = new URLSearchParams(searchParams);
            params.set("page", newPage.toString());
            router.push(`${pathname}?${params.toString()}`);
        }
    };

    return (
        <div className={hideLayout ? "h-full" : "min-h-screen bg-muted/20"}>
            {/* Header - Only shown if not hiding layout */}
            {!hideLayout && (
                <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Building className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">TVET Swap</span>
                        </Link>
                        <div className="flex gap-4 items-center">
                            {user ? (
                                <>
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
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </header>
            )}

            <main className={hideLayout ? "" : "container mx-auto px-4 py-8"}>
                {!hideLayout && (
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Find Trainers</h1>
                            <p className="text-muted-foreground mt-1">
                                Browse {totalCount} trainers open to mutual transfers.
                            </p>
                        </div>
                    </div>
                )}

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
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        handleSearch(e.target.value);
                                    }}
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
                                onChange={(e) => {
                                    setSelectedCourse(e.target.value);
                                    handleFilterChange("course", e.target.value);
                                }}
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
                                onChange={(e) => {
                                    setSelectedCurrentCounty(e.target.value);
                                    handleFilterChange("currentCounty", e.target.value);
                                }}
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
                                onChange={(e) => {
                                    setSelectedDesiredCounty(e.target.value);
                                    handleFilterChange("desiredCounty", e.target.value);
                                }}
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
                                    router.replace(pathname);
                                }}
                                className="text-sm text-primary hover:underline font-medium"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Leaderboard List */}
                {initialProfiles.length === 0 ? (
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
                    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Trainer</th>
                                        <th className="px-6 py-3 font-medium">Subjects</th>
                                        <th className="px-6 py-3 font-medium">Target Location</th>
                                        <th className="px-6 py-3 font-medium text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {initialProfiles.map((profile) => (
                                        <tr key={profile.$id} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-foreground">{profile.fullName}</div>
                                                <div className="text-xs text-muted-foreground mt-0.5">
                                                    {profile.currentInstitution}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {profile.courseQualified.slice(0, 2).map((course, index) => (
                                                        <span
                                                            key={`${course}-${index}`}
                                                            className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                                                        >
                                                            {course}
                                                        </span>
                                                    ))}
                                                    {profile.courseQualified.length > 2 && (
                                                        <span className="text-xs text-muted-foreground self-center">
                                                            +{profile.courseQualified.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {profile.desiredCounties && profile.desiredCounties.length > 0 ? (
                                                        profile.desiredCounties.slice(0, 2).map((county, index) => (
                                                            <span
                                                                key={`${county}-${index}`}
                                                                className="inline-flex items-center rounded-md bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                                                            >
                                                                {county}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-muted-foreground italic">Any</span>
                                                    )}
                                                    {profile.desiredCounties && profile.desiredCounties.length > 2 && (
                                                        <span className="text-xs text-muted-foreground self-center">
                                                            +{profile.desiredCounties.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {user ? (
                                                    <div className="flex justify-end gap-2">
                                                        <a
                                                            href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#25D366] text-white shadow hover:bg-[#25D366]/90 h-8 px-3 py-1"
                                                        >
                                                            <Phone className="w-3 h-3 mr-1.5" />
                                                            WhatsApp
                                                        </a>
                                                        <Link
                                                            href={`/trainers/${profile.$id}`}
                                                            className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 py-1"
                                                        >
                                                            View
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href="/login"
                                                        className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-8 px-3 py-1"
                                                    >
                                                        Login to Contact
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-border bg-card px-4 py-3 sm:px-6 mt-4 rounded-xl shadow-sm">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="relative ml-3 inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to{" "}
                                    <span className="font-medium">{Math.min(currentPage * limit, totalCount)}</span> of{" "}
                                    <span className="font-medium">{totalCount}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border hover:bg-accent hover:text-accent-foreground focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            aria-current={page === currentPage ? "page" : undefined}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${page === currentPage
                                                ? "z-10 bg-primary text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                                : "text-foreground ring-1 ring-inset ring-border hover:bg-accent hover:text-accent-foreground focus:z-20 focus:outline-offset-0"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border hover:bg-accent hover:text-accent-foreground focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
