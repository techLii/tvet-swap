"use client";

import { Bell } from "lucide-react";

export default function NotificationsCard() {
    return (
        <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
            </h3>
            <div className="text-sm text-muted-foreground text-center py-4">
                No new notifications.
            </div>
        </div>
    );
}
