import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
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
    const postsDirectory = path.join(process.cwd(), "app/dashboard/vacancies/posts");

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

export default function VacanciesDashboardPage() {
    const vacancies = getVacancies();

    return (
        <div className="h-full">
            <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Community Job Board</h2>
                <p className="text-muted-foreground mt-1">
                    Explore open positions curated for Technical Trainers.
                </p>
            </div>

            {vacancies.length === 0 ? (
                <div className="text-center py-12 border rounded-xl border-dashed">
                    <p className="text-muted-foreground">No vacancies found at the moment.</p>
                </div>
            ) : (
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Category</th>
                                    <th className="px-6 py-3 font-medium">Position</th>
                                    <th className="px-6 py-3 font-medium">Institution</th>
                                    <th className="px-6 py-3 font-medium">Employment Type</th>
                                    <th className="px-6 py-3 font-medium">Application Deadline</th>
                                    <th className="px-6 py-3 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {vacancies.map((vacancy) => (
                                    <tr key={vacancy.slug} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                                {vacancy.department}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-foreground">
                                            {vacancy.title}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {vacancy.duty_station}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                                                {vacancy.employment_type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {vacancy.application_deadline}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/dashboard/vacancies/${vacancy.slug}`}
                                                className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 py-1"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
