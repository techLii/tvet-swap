import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Navbar from "@/components/Navbar";

import { Briefcase, MapPin, Clock, Calendar, ArrowRight } from "lucide-react";

interface Vacancy {
    slug: string;
    title: string;
    department: string;
    duty_station: string;
    employment_type: string;
    application_deadline: string;
    date: string;
}

function getVacancies(): Vacancy[] {
    const postsDirectory = path.join(process.cwd(), "app/vacancies/posts");

    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const files = fs.readdirSync(postsDirectory);

    const vacancies = files.map((filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(fileContent);

        return {
            slug: filename.replace(".mdx", ""),
            title: data.title,
            department: data.department,
            duty_station: data.duty_station,
            employment_type: data.employment_type,
            application_deadline: data.application_deadline,
            date: data.date,
        };
    });

    // Sort by date (newest first)
    return vacancies.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export default function VacanciesPage() {
    const vacancies = getVacancies();

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Community Job Board</h1>
                    <p className="text-muted-foreground text-lg">
                        Explore open positions curated for Technical Trainers across various institutions.
                    </p>
                </div>

                {vacancies.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No vacancies found at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vacancies.map((vacancy) => (
                            <article
                                key={vacancy.slug}
                                className="flex flex-col bg-card border border-border/40 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex items-center gap-2 text-xs font-medium text-primary mb-3 bg-primary/10 w-fit px-2 py-1 rounded-full">
                                        <Briefcase className="w-3 h-3" />
                                        {vacancy.department}
                                    </div>

                                    <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        <Link href={`/vacancies/${vacancy.slug}`}>
                                            {vacancy.title}
                                        </Link>
                                    </h2>

                                    <div className="space-y-2 mb-6 flex-1">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <MapPin className="w-4 h-4" />
                                            <span>{vacancy.duty_station}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="w-4 h-4" />
                                            <span>{vacancy.employment_type}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            <span>Deadline: {vacancy.application_deadline}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/vacancies/${vacancy.slug}`}
                                        className="inline-flex items-center justify-center w-full rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                                    >
                                        View Details
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>


        </div>
    );
}
