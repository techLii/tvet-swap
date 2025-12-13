"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Briefcase, RefreshCw, FileText, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/actions/auth";
import { Profile } from "@/types";

interface SidebarProps {
    user: any;
    profile: Profile | null;
    mobile?: boolean;
    className?: string;
}

const navigation = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Find Trainers", href: "/dashboard/find-trainers", icon: Users },
    { name: "Vacancies", href: "/dashboard/vacancies", icon: Briefcase },
    { name: "Blog", href: "/dashboard/blog", icon: FileText },
    { name: "Transfer Preferences", href: "/dashboard/transfer-preferences", icon: RefreshCw },
    { name: "Document Download Centre", href: "/dashboard/document-download-centre", icon: FileText },
];

export default function Sidebar({ user, profile, mobile, className }: SidebarProps) {
    const pathname = usePathname();

    return (
        <div className={cn("border-r bg-card w-full lg:w-72 overflow-y-auto h-screen", mobile ? "block" : "hidden lg:block sticky top-0", className)}>
            <div className="flex h-full flex-col gap-2">
                <div className="flex h-14 items-center border-b px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <div className="w-6 h-6 bg-primary/20 rounded-md flex items-center justify-center">
                            <span className="text-primary text-xs font-bold">T</span>
                        </div>
                        <span className="">trainershub.online</span>
                    </Link>
                </div>
                <div className="flex-1 py-4">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                        isActive
                                            ? "bg-muted text-primary"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t mt-auto">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-medium text-lg">
                            {profile?.fullName?.charAt(0) || "U"}
                        </div>
                        <div>
                            <p className="font-medium text-sm">{profile?.fullName || "User"}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-[140px]">{user?.email}</p>
                        </div>
                    </div>
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
    );
}
