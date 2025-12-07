"use client";

import { useState } from "react";
import { documentsData } from "../data/documentsData";
import { Download, FileText, ChevronRight, FolderOpen } from "lucide-react";

export default function DocumentDownloads() {
    const [selectedLevel, setSelectedLevel] = useState<string>("");
    const [selectedCourse, setSelectedCourse] = useState<string>("");
    const [selectedModule, setSelectedModule] = useState<string>("");
    const [selectedUnit, setSelectedUnit] = useState<string>("");

    // Helper to get current data based on selection
    const getLevelData = () => (documentsData as any)[selectedLevel];
    const getCourseData = () => getLevelData()?.courses?.[selectedCourse];
    const getModuleData = () => getCourseData()?.modules?.[selectedModule];
    const getUnitData = () => getModuleData()?.units?.[selectedUnit];

    const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLevel(e.target.value);
        setSelectedCourse("");
        setSelectedModule("");
        setSelectedUnit("");
    };

    const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCourse(e.target.value);
        setSelectedModule("");
        setSelectedUnit("");
    };

    const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedModule(e.target.value);
        setSelectedUnit("");
    };

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUnit(e.target.value);
    };

    const currentUnit = getUnitData();

    return (
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 mt-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-primary" />
                Document Downloads
            </h3>

            <div className="space-y-4">
                {/* Level Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Level</label>
                    <select
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={selectedLevel}
                        onChange={handleLevelChange}
                    >
                        <option value="">Select Level</option>
                        {Object.keys(documentsData).map((key) => (
                            <option key={key} value={key}>
                                {(documentsData as any)[key].name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Course Selection */}
                {selectedLevel && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="text-sm font-medium text-muted-foreground">Course</label>
                        <select
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={selectedCourse}
                            onChange={handleCourseChange}
                        >
                            <option value="">Select Course</option>
                            {Object.keys(getLevelData()?.courses || {}).map((key) => (
                                <option key={key} value={key}>
                                    {getLevelData().courses[key].name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Module Selection */}
                {selectedCourse && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="text-sm font-medium text-muted-foreground">Module</label>
                        <select
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={selectedModule}
                            onChange={handleModuleChange}
                        >
                            <option value="">Select Module</option>
                            {Object.keys(getCourseData()?.modules || {}).map((key) => (
                                <option key={key} value={key}>
                                    {getCourseData().modules[key].name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Unit Selection */}
                {selectedModule && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="text-sm font-medium text-muted-foreground">Unit</label>
                        <select
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={selectedUnit}
                            onChange={handleUnitChange}
                        >
                            <option value="">Select Unit</option>
                            {Object.keys(getModuleData()?.units || {}).map((key) => (
                                <option key={key} value={key}>
                                    {getModuleData().units[key].name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Download Buttons */}
                {currentUnit && (
                    <div className="pt-4 space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="p-4 bg-muted/30 rounded-lg border border-border">
                            <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-primary" />
                                Available Documents
                            </h4>
                            <div className="grid grid-cols-1 gap-3">
                                <a
                                    href={currentUnit.files.curriculum}
                                    download
                                    className="flex items-center justify-between p-3 bg-background border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group"
                                >
                                    <span className="text-sm font-medium">Curriculum</span>
                                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </a>
                                <a
                                    href={currentUnit.files.occupational}
                                    download
                                    className="flex items-center justify-between p-3 bg-background border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group"
                                >
                                    <span className="text-sm font-medium">Occupational Standards</span>
                                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
