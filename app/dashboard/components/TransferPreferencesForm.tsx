"use client";

import {
    Settings,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Save
} from "lucide-react";
import { KENYAN_COUNTIES, TVET_COURSES } from "@/lib/constants";

interface TransferPreferencesFormProps {
    formData: any;
    isSaving: boolean;
    message: { type: "success" | "error"; text: string } | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleMultiSelectChange: (e: React.ChangeEvent<HTMLSelectElement>, field: "desiredCounties" | "desiredInstitutions") => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export default function TransferPreferencesForm({
    formData,
    isSaving,
    message,
    handleChange,
    handleCheckboxChange,
    handleMultiSelectChange,
    handleSubmit
}: TransferPreferencesFormProps) {
    return (
        <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border shadow-sm">
            <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Transfer Preferences
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Update your details and transfer preferences to find better matches.
                </p>
            </div>

            <div className="p-6 space-y-8">
                {message && (
                    <div className={`p-4 rounded-lg flex items-center gap-2 text-sm ${message.type === "success"
                        ? "bg-green-50 text-green-900 border border-green-200"
                        : "bg-red-50 text-red-900 border border-red-200"
                        }`}>
                        {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {message.text}
                    </div>
                )}

                {/* Contact Info */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="07..."
                            />
                        </div>
                    </div>
                </div>

                {/* Current Employment */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Current Employment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Current Institution</label>
                            <input
                                type="text"
                                name="currentInstitution"
                                value={formData.currentInstitution}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Current County</label>
                            <select
                                name="currentCounty"
                                value={formData.currentCounty}
                                onChange={handleChange}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select County</option>
                                {KENYAN_COUNTIES.map((county) => (
                                    <option key={county} value={county}>{county}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Sub-County</label>
                            <input
                                type="text"
                                name="currentSubCounty"
                                value={formData.currentSubCounty}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>
                </div>

                {/* Teaching Subjects */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Teaching Subjects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Subject 1</label>
                            <select
                                name="subject1"
                                value={formData.subject1}
                                onChange={handleChange}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select Subject</option>
                                {TVET_COURSES.map((course) => (
                                    <option key={course} value={course}>{course}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Subject 2</label>
                            <select
                                name="subject2"
                                value={formData.subject2}
                                onChange={handleChange}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select Subject</option>
                                {TVET_COURSES.map((course) => (
                                    <option key={course} value={course}>{course}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Subject 3 (Optional)</label>
                            <select
                                name="subject3"
                                value={formData.subject3}
                                onChange={handleChange}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select Subject</option>
                                {TVET_COURSES.map((course) => (
                                    <option key={course} value={course}>{course}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Transfer Preferences */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Transfer Preferences</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Preferred Counties (Hold Ctrl/Cmd to select multiple)</label>
                            <select
                                multiple
                                name="desiredCounties"
                                value={formData.desiredCounties}
                                onChange={(e) => handleMultiSelectChange(e, "desiredCounties")}
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {KENYAN_COUNTIES.map((county) => (
                                    <option key={county} value={county}>{county}</option>
                                ))}
                            </select>
                            <p className="text-xs text-muted-foreground">Selected: {formData.desiredCounties.join(", ") || "None"}</p>
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                            <input
                                type="checkbox"
                                id="isOpenToSwap"
                                name="isOpenToSwap"
                                checked={formData.isOpenToSwap}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label
                                htmlFor="isOpenToSwap"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I am actively looking for a swap
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 py-4 bg-muted/30 border-t border-border flex justify-end">
                <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
