import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getProfileById } from "@/lib/actions/profile";
import { getLoggedInUser } from "@/lib/actions/auth";
import { MapPin, Building, Phone, GraduationCap, Calendar, ArrowLeft } from "lucide-react";

export default async function TrainerProfilePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // Require authentication
    const user = await getLoggedInUser();

    if (!user) {
        redirect("/login");
    }

    const { id } = await params;
    const profile = await getProfileById(id);

    // Only show if profile exists and is open to swap
    if (!profile || !profile.isOpenToSwap) {
        notFound();
    }

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
                    <div className="flex gap-4">
                        <Link
                            href="/trainers"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Trainers
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden mb-6">
                        <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border"></div>
                        <div className="px-8 pb-8">
                            <div className="relative flex justify-between items-end -mt-12 mb-6">
                                <div className="flex items-end">
                                    <div className="w-24 h-24 bg-background rounded-xl border-4 border-background shadow-sm flex items-center justify-center text-3xl font-bold text-primary">
                                        {profile.fullName.charAt(0)}
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-semibold text-green-700 shadow-sm">
                                        <span className="mr-1.5 flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        Open to Swap
                                    </span>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h1 className="text-3xl font-bold tracking-tight mb-2">{profile.fullName}</h1>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <GraduationCap className="w-5 h-5" />
                                    <span>{profile.yearsOfExperience} years of teaching experience</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                {/* Current Position */}
                                <div className="p-5 bg-muted/30 rounded-lg border border-border/50">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Building className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-1">Current Position</h2>
                                            <p className="font-medium text-lg">{profile.currentInstitution}</p>
                                            <p className="text-muted-foreground">{profile.currentCounty}</p>
                                            {profile.currentSubCounty && (
                                                <p className="text-muted-foreground text-sm">{profile.currentSubCounty}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Desired Locations */}
                                <div className="p-5 bg-green-50/50 rounded-lg border border-green-100">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="font-semibold text-sm uppercase tracking-wider text-green-700/80 mb-2">Target Locations</h2>
                                            {profile.desiredCounties && profile.desiredCounties.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {profile.desiredCounties.map((county) => (
                                                        <span
                                                            key={county}
                                                            className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800"
                                                        >
                                                            {county}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-muted-foreground">Open to any county</p>
                                            )}

                                            {profile.desiredInstitutions && profile.desiredInstitutions.length > 0 && (
                                                <div className="mt-4 pt-3 border-t border-green-200/50">
                                                    <p className="text-xs font-semibold text-green-700 mb-2 uppercase">
                                                        Preferred Institutions
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {profile.desiredInstitutions.map((inst) => (
                                                            <span
                                                                key={inst}
                                                                className="inline-flex items-center rounded-md bg-white border border-green-200 px-2 py-1 text-xs font-medium text-green-700"
                                                            >
                                                                {inst}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Courses Qualified */}
                            <div className="mb-8">
                                <h2 className="font-semibold text-lg mb-3">Courses Qualified to Teach</h2>
                                <div className="flex flex-wrap gap-2">
                                    {profile.courseQualified.map((course) => (
                                        <span
                                            key={course}
                                            className="inline-flex items-center rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground border border-border"
                                        >
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Availability */}
                            {profile.availabilityDate && (
                                <div className="mb-8 flex items-center gap-3 text-muted-foreground bg-muted/20 p-3 rounded-lg border border-border/50 w-fit">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    <span>
                                        Available from: <span className="font-medium text-foreground">{new Date(profile.availabilityDate).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}</span>
                                    </span>
                                </div>
                            )}

                            {/* Contact */}
                            <div className="pt-8 border-t border-border">
                                <h2 className="font-semibold text-lg mb-4">Contact Information</h2>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#25D366] text-white shadow hover:bg-[#25D366]/90 h-11 px-8"
                                    >
                                        <Phone className="w-5 h-5 mr-2" />
                                        Contact via WhatsApp
                                    </a>
                                    <div className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm h-11 px-8 text-muted-foreground select-all">
                                        <Phone className="w-4 h-4 mr-2" />
                                        {profile.phone}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
