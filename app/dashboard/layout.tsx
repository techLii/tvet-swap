import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import { getLoggedInUser } from "@/lib/actions/auth";
import { getProfile } from "@/lib/actions/profile";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getLoggedInUser();

    if (!user) {
        redirect("/login");
    }

    const profile = await getProfile(user.$id);

    return (
        <div className="flex min-h-screen w-full bg-muted/20">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0">
                <DashboardHeader user={user} profile={profile} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
