import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin, Clock, Calendar, User, GraduationCap, Building } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

interface Frontmatter {
    title: string;
    department: string;
    minimum_qualifications: string;
    experience_required: string;
    employment_type: string;
    reporting_to: string;
    duty_station: string;
    application_deadline: string;
    date: string;
}

export async function generateStaticParams() {
    const postsDirectory = path.join(process.cwd(), "app/vacancies/posts");

    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const files = fs.readdirSync(postsDirectory);

    return files.map((filename) => ({
        slug: filename.replace(".mdx", ""),
    }));
}

export default async function VacancyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const postsDirectory = path.join(process.cwd(), "app/vacancies/posts");
    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(fileContent);
    const frontmatter = data as Frontmatter;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                <Link
                    href="/vacancies"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Vacancies
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <article className="prose prose-slate dark:prose-invert max-w-none">
                            <h1 className="text-3xl font-bold tracking-tight mb-2">{frontmatter.title}</h1>
                            <div className="flex items-center gap-2 text-primary font-medium mb-6">
                                <Briefcase className="w-5 h-5" />
                                {frontmatter.department}
                            </div>

                            <div className="bg-muted/50 p-6 rounded-lg mb-8 not-prose border border-border/50">
                                <h3 className="font-semibold mb-4 text-lg">Job Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Duty Station</span>
                                        <div className="flex items-center gap-2 font-medium">
                                            <MapPin className="w-4 h-4 text-muted-foreground" />
                                            {frontmatter.duty_station}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Employment Type</span>
                                        <div className="flex items-center gap-2 font-medium">
                                            <Clock className="w-4 h-4 text-muted-foreground" />
                                            {frontmatter.employment_type}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Reporting To</span>
                                        <div className="flex items-center gap-2 font-medium">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                            {frontmatter.reporting_to}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Deadline</span>
                                        <div className="flex items-center gap-2 font-medium text-red-600 dark:text-red-400">
                                            <Calendar className="w-4 h-4" />
                                            {frontmatter.application_deadline}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5" />
                                    Minimum Qualifications
                                </h3>
                                <p>{frontmatter.minimum_qualifications}</p>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Building className="w-5 h-5" />
                                    Experience Required
                                </h3>
                                <p>{frontmatter.experience_required}</p>
                            </div>

                            <div className="mt-8 pt-8 border-t border-border/40">
                                <MDXRemote source={content} />
                            </div>
                        </article>
                    </div>

                    {/* Sidebar / Apply Section */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 p-6 border border-border/40 rounded-lg bg-card shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Ready to Apply?</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                Ensure you meet all the requirements listed before submitting your application.
                            </p>
                            <button className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8">
                                Apply Now
                            </button>
                            <p className="text-xs text-center text-muted-foreground mt-4">
                                Applications close on {frontmatter.application_deadline}
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
