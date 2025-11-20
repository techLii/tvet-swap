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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-indigo-600">
                        TVET Swap Kenya
                    </Link>
                    <div className="flex gap-4">
                        <Link
                            href="/trainers"
                            className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            ← Back to Trainers
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.fullName}</h1>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <GraduationCap className="w-5 h-5" />
                                    <span>{profile.yearsOfExperience} years of teaching experience</span>
                                </div>
                            </div>
                            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                                Open to Swap
                            </div>
                        </div>

                        {/* Current Position */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-start gap-3">
                                <Building className="w-6 h-6 text-indigo-600 mt-1" />
                                <div>
                                    <h2 className="font-bold text-lg mb-1">Current Position</h2>
                                    <p className="text-gray-700 font-medium">{profile.currentInstitution}</p>
                                    <p className="text-gray-600">{profile.currentCounty}</p>
                                    {profile.currentSubCounty && (
                                        <p className="text-gray-600">{profile.currentSubCounty}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Desired Locations */}
                        <div className="mb-6 p-4 bg-green-50 rounded-lg">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-6 h-6 text-green-600 mt-1" />
                                <div className="flex-1">
                                    <h2 className="font-bold text-lg mb-2">Wants to Move To</h2>
                                    {profile.desiredCounties && profile.desiredCounties.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {profile.desiredCounties.map((county) => (
                                                <span
                                                    key={county}
                                                    className="px-3 py-1 bg-green-200 text-green-800 rounded-full font-medium"
                                                >
                                                    {county}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-600">Open to any county</p>
                                    )}

                                    {profile.desiredInstitutions && profile.desiredInstitutions.length > 0 && (
                                        <div className="mt-3">
                                            <p className="text-sm font-semibold text-gray-700 mb-1">
                                                Preferred Institutions:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {profile.desiredInstitutions.map((inst) => (
                                                    <span
                                                        key={inst}
                                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
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

                        {/* Courses Qualified */}
                        <div className="mb-6">
                            <h2 className="font-bold text-lg mb-3">Courses Qualified to Teach</h2>
                            <div className="flex flex-wrap gap-2">
                                {profile.courseQualified.map((course) => (
                                    <span
                                        key={course}
                                        className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium"
                                    >
                                        {course}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Availability */}
                        {profile.availabilityDate && (
                            <div className="mb-6 flex items-center gap-2 text-gray-700">
                                <Calendar className="w-5 h-5 text-indigo-600" />
                                <span>
                                    <strong>Available from:</strong>{" "}
                                    {new Date(profile.availabilityDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                        )}

                        {/* Contact */}
                        <div className="pt-6 border-t">
                            <h2 className="font-bold text-lg mb-4">Contact Information</h2>
                            <div className="flex gap-4">
                                <a
                                    href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                                >
                                    <Phone className="w-5 h-5" />
                                    Contact via WhatsApp
                                </a>
                                <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg">
                                    <Phone className="w-5 h-5" />
                                    {profile.phone}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="text-center">
                        <Link
                            href="/trainers"
                            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to all trainers
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
