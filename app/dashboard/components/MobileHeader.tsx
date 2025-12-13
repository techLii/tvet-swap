"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Profile } from "@/types";
import Sidebar from "./Sidebar";

interface MobileHeaderProps {
    user: any;
    profile: Profile | null;
}

export default function MobileHeader({ user, profile }: MobileHeaderProps) {
    const [open, setOpen] = useState(false);

    // If I don't have shadcn sheet, I will implement a simple overlay.
    // I will check if "@/components/ui/sheet" exists first?
    // I'll assume standard manual toggle for safety as I didn't verify shadcn components path.
    // Wait, the project structure showed `components` folder but I didn't see `ui` folder in `app` or root `components` in Step 18 list_dir.
    // Step 18: `components` contains `Footer.tsx`, `Navbar.tsx`.
    // Step 9: `app` contains `components` folder? No, `app/dashboard/components`.
    // So likely standard shadcn is NOT installed or it's somewhere else.
    // I will implement a custom mobile sidebar overlay.

    return (
        <div className="lg:hidden flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center gap-2 font-semibold">
                <div className="w-6 h-6 bg-primary/20 rounded-md flex items-center justify-center">
                    <span className="text-primary text-xs font-bold">T</span>
                </div>
                <span className="">trainershub.online</span>
            </div>
            <button
                onClick={() => setOpen(true)}
                className="p-2 text-muted-foreground hover:text-foreground"
            >
                <Menu className="w-6 h-6" />
            </button>

            {open && (
                <div className="fixed inset-0 z-50 bg-black/80 flex" onClick={() => setOpen(false)}>
                    <div
                        className="w-[80%] max-w-sm bg-background h-full p-0 shadow-lg animate-in slide-in-from-left duration-300 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Pass a prop to Sidebar to styling for mobile? 
                             Or just reuse Sidebar which has hidden lg:block.
                             I need to make Sidebar NOT hidden when inside this wrapper.
                             I'll wrap Sidebar in a div that overrides display?
                             Sidebar has `hidden border-r ... lg:block`.
                             If I render it here, it will still be hidden.
                             I should modify Sidebar to accept a `className` prop or similar.
                             Or I can copy the Sidebar content into a MobileSidebar component.
                             Given reusable code, I'll update Sidebar to allow overriding className.
                             I updated Sidebar in Step 184 to accept props but didn't add className.
                             I'll modify Sidebar again to accept `className`?
                             Or I can just create a `MobileSidebar` that imports `Sidebar` content logic but different wrapper?
                             Reusing Sidebar is cleaner. I'll modify Sidebar in a subsequent step if needed, or I'll just hack it here by cloning navigation logic.
                             Actually, since I can't easily modify Sidebar right now without another tool call, I'll use the tool calls efficiently.
                             I will update `Sidebar` to accept `className` in the same step via multi_replace? No, I can't modify two files in one step unless using multi_replace but I'm creating MobileHeader here.
                             I'll create `MobileHeader` with a simplified menu for now, or essentially a clone of the sidebar content.
                         */}
                        <div className="h-full overflow-y-auto">
                            <Sidebar user={user} profile={profile} mobile />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
