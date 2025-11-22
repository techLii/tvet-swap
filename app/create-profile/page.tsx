"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProfile } from "@/lib/actions/profile";
import { User, Building2, MapPin, BookOpen, Phone, FileText, X, Plus } from "lucide-react";
import { KENYAN_COUNTIES, TVET_COURSES } from "@/lib/constants";

export default function CreateProfilePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        idNumber: "",
        phone: "",
        tscNumber: "",
        currentInstitution: "",
        currentCounty: "",
        currentSubCounty: "",
        subject1: "",
        subject2: "",
        subject3: "",
        yearsOfExperience: 0,
        isOpenToSwap: false,
        desiredCounties: [] as string[],
        desiredInstitutions: "",
        availabilityDate: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await createProfile({
            ...formData,
            subject3: formData.subject3 || undefined,
            yearsOfExperience: Number(formData.yearsOfExperience),
            isOpenToSwap: formData.isOpenToSwap,
            desiredCounties: formData.desiredCounties,
            desiredInstitutions: formData.desiredInstitutions ? formData.desiredInstitutions.split(",").map(s => s.trim()) : [],
            availabilityDate: formData.availabilityDate || undefined,
        });

        if (result.success) {
            // Use hard redirect to ensure fresh state and avoid router issues
            window.location.href = "/dashboard";
        } else {
            setError(result.error || "Failed to create profile. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-muted/40 py-12">
            <div className="w-full max-w-2xl space-y-8">
                <div className="bg-card text-card-foreground rounded-xl border border-border shadow-sm p-8">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <User className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Complete Your Profile</h1>
                        <p className="text-muted-foreground mt-2 text-sm">Please provide your professional details to get started</p>
                    </div>

                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 rounded-lg mb-6 font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="fullName" className="block text-sm font-medium leading-none">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        id="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="phone" className="block text-sm font-medium leading-none">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="tel"
                                        id="phone"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                        placeholder="0712345678"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="idNumber" className="block text-sm font-medium leading-none">
                                    National ID Number
                                </label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        id="idNumber"
                                        required
                                        value={formData.idNumber}
                                        onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                        placeholder="12345678"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="tscNumber" className="block text-sm font-medium leading-none">
                                    TSC Number
                                </label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        id="tscNumber"
                                        required
                                        value={formData.tscNumber}
                                        onChange={(e) => setFormData({ ...formData, tscNumber: e.target.value })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                        placeholder="TSC12345"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="currentInstitution" className="block text-sm font-medium leading-none">
                                    Current Institution
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        id="currentInstitution"
                                        required
                                        value={formData.currentInstitution}
                                        onChange={(e) => setFormData({ ...formData, currentInstitution: e.target.value })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                        placeholder="Nairobi TVET"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="currentCounty" className="block text-sm font-medium leading-none">
                                    Current County
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        id="currentCounty"
                                        required
                                        value={formData.currentCounty}
                                        onChange={(e) => setFormData({ ...formData, currentCounty: e.target.value })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                        placeholder="Nairobi"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="currentSubCounty" className="block text-sm font-medium leading-none">
                                    Current Sub-County
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        id="currentSubCounty"
                                        required
                                        value={formData.currentSubCounty}
                                        onChange={(e) => setFormData({ ...formData, currentSubCounty: e.target.value })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                        placeholder="Westlands"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium leading-none">Subjects / Courses Qualified</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="subject1" className="text-xs text-muted-foreground">
                                        Subject 1 (Required)
                                    </label>
                                    <div className="relative">
                                        <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <select
                                            id="subject1"
                                            required
                                            value={formData.subject1}
                                            onChange={(e) => setFormData({ ...formData, subject1: e.target.value })}
                                            className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                        >
                                            <option value="">Select Subject</option>
                                            {TVET_COURSES.map((course) => (
                                                <option key={course} value={course}>
                                                    {course}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject2" className="text-xs text-muted-foreground">
                                        Subject 2 (Required)
                                    </label>
                                    <div className="relative">
                                        <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <select
                                            id="subject2"
                                            required
                                            value={formData.subject2}
                                            onChange={(e) => setFormData({ ...formData, subject2: e.target.value })}
                                            className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                        >
                                            <option value="">Select Subject</option>
                                            {TVET_COURSES.map((course) => (
                                                <option key={course} value={course}>
                                                    {course}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject3" className="text-xs text-muted-foreground">
                                        Subject 3 (Optional)
                                    </label>
                                    <div className="relative">
                                        <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <select
                                            id="subject3"
                                            value={formData.subject3}
                                            onChange={(e) => setFormData({ ...formData, subject3: e.target.value })}
                                            className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                        >
                                            <option value="">Select Subject</option>
                                            {TVET_COURSES.map((course) => (
                                                <option key={course} value={course}>
                                                    {course}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="yearsOfExperience" className="block text-sm font-medium leading-none">
                                    Years of Experience
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="number"
                                        id="yearsOfExperience"
                                        required
                                        min={0}
                                        max={50}
                                        value={formData.yearsOfExperience}
                                        onChange={(e) => setFormData({ ...formData, yearsOfExperience: Number(e.target.value) })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="availabilityDate" className="block text-sm font-medium leading-none">
                                    Availability Date (Optional)
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        id="availabilityDate"
                                        value={formData.availabilityDate}
                                        onChange={(e) => setFormData({ ...formData, availabilityDate: e.target.value })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="desiredCounties" className="block text-sm font-medium leading-none">
                                Desired Counties
                            </label>
                            <div className="space-y-2">
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <select
                                        onChange={(e) => {
                                            const county = e.target.value;
                                            if (county && !formData.desiredCounties.includes(county)) {
                                                setFormData({
                                                    ...formData,
                                                    desiredCounties: [...formData.desiredCounties, county],
                                                });
                                            }
                                            e.target.value = "";
                                        }}
                                        className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                    >
                                        <option value="">Select a county to add...</option>
                                        {KENYAN_COUNTIES.filter(c => !formData.desiredCounties.includes(c)).map((county) => (
                                            <option key={county} value={county}>
                                                {county}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {formData.desiredCounties.length > 0 && (
                                    <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/20">
                                        {formData.desiredCounties.map((county) => (
                                            <span
                                                key={county}
                                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                                            >
                                                {county}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData({
                                                            ...formData,
                                                            desiredCounties: formData.desiredCounties.filter((c) => c !== county),
                                                        });
                                                    }}
                                                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                                                >
                                                    <X className="h-3 w-3" />
                                                    <span className="sr-only">Remove {county}</span>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="desiredInstitutions" className="block text-sm font-medium leading-none">
                                Desired Institutions (Comma separated)
                            </label>
                            <input
                                type="text"
                                id="desiredInstitutions"
                                value={formData.desiredInstitutions}
                                onChange={(e) => setFormData({ ...formData, desiredInstitutions: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                placeholder="Nairobi TVET, Kabete National Polytechnic"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="isOpenToSwap"
                                checked={formData.isOpenToSwap}
                                onChange={(e) => setFormData({ ...formData, isOpenToSwap: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="isOpenToSwap" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                I am open to mutual transfer
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                        >
                            {loading ? "Creating Profile..." : "Complete Profile"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
