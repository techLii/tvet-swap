"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    Users,
    Briefcase,
    FileText,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import { Profile } from "@/types";
import { logout } from "@/lib/actions/auth";

interface DashboardHeaderProps {
    user: any;
    profile: Profile | null;
}

export default function DashboardHeader({ user, profile }: DashboardHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
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

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/dashboard/find-trainers"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                    >
                        <Users className="w-4 h-4" />
                        Find Trainers
                    </Link>
                    <Link
                        href="/dashboard/vacancies"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                    >
                        <Briefcase className="w-4 h-4" />
                        Vacancies
                    </Link>
                    <Link
                        href="/blog"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                    >
                        <FileText className="w-4 h-4" />
                        Blog
                    </Link>
                    <div className="h-6 w-px bg-border"></div>
                    <div className="flex items-center gap-3">
                        <div className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">{profile?.fullName || "User"}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
                            {profile?.fullName?.charAt(0) || "U"}
                        </div>
                        <button
                            onClick={async () => {
                                await logout();
                                window.location.href = "/";
                            }}
                            className="ml-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 px-3 text-destructive hover:text-destructive"
                            title="Logout"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-border/40 bg-background absolute w-full z-20 shadow-lg">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                        <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-medium text-lg">
                                {profile?.fullName?.charAt(0) || "U"}
                            </div>
                            <div>
                                <p className="font-medium">{profile?.fullName || "User"}</p>
                                <p className="text-xs text-muted-foreground">{profile?.tscNumber || "No ID"}</p>
                            </div>
                        </div>

                        <Link
                            href="/dashboard"
                            className="text-sm font-medium transition-colors hover:text-primary py-2 flex items-center gap-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Overview
                        </Link>
                        <Link
                            href="/dashboard/find-trainers"
                            className="text-sm font-medium transition-colors hover:text-primary py-2 flex items-center gap-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Users className="w-4 h-4" />
                            Find Trainers
                        </Link>
                        <Link
                            href="/dashboard/vacancies"
                            className="text-sm font-medium transition-colors hover:text-primary py-2 flex items-center gap-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Briefcase className="w-4 h-4" />
                            Vacancies
                        </Link>
                        <Link
                            href="/dashboard/transfer-preferences"
                            className="text-sm font-medium transition-colors hover:text-primary py-2 flex items-center gap-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Users className="w-4 h-4" />
                            Transfer Preferences
                        </Link>
                        <Link
                            href="/dashboard/document-download-centre"
                            className="text-sm font-medium transition-colors hover:text-primary py-2 flex items-center gap-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <FileText className="w-4 h-4" />
                            Downloads
                        </Link>
                        <Link
                            href="/blog"
                            className="text-sm font-medium transition-colors hover:text-primary py-2 flex items-center gap-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <FileText className="w-4 h-4" />
                            Blog
                        </Link>

                        <div className="pt-2 border-t border-border/40">
                            <button
                                onClick={async () => {
                                    await logout();
                                    window.location.href = "/";
                                }}
                                className="flex items-center justify-center w-full rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-destructive hover:text-destructive"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
