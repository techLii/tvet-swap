"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Briefcase, RefreshCw, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Find Trainers", href: "/dashboard/find-trainers", icon: Users },
    { name: "Vacancies", href: "/dashboard/vacancies", icon: Briefcase },
    { name: "Transfer Preferences", href: "/dashboard/transfer-preferences", icon: RefreshCw },
    { name: "Document Download Centre", href: "/dashboard/document-download-centre", icon: FileText },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden border-r bg-card lg:block lg:w-72 overflow-y-auto">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <span className="">Kenya Technical Trainers</span>
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
            </div>
        </div>
    );
}
