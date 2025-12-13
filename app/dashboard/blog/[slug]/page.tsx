import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

import { notFound } from "next/navigation";

interface Frontmatter {
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    image?: string;
}

export async function generateStaticParams() {
    const postsDirectory = path.join(process.cwd(), "app/dashboard/blog/posts");

    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const files = fs.readdirSync(postsDirectory);

    return files.map((filename) => ({
        slug: filename.replace(".mdx", ""),
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const postsDirectory = path.join(process.cwd(), "app/dashboard/blog/posts");
    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(fileContent);
    const frontmatter = data as Frontmatter;

    return (
        <div className="h-full">


            <main className="flex-1 max-w-4xl">
                <Link
                    href="/dashboard/blog"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                </Link>

                <article className="prose prose-slate dark:prose-invert lg:prose-xl max-w-none">
                    <header className="mb-8 not-prose">
                        <h1 className="text-4xl font-bold tracking-tight mb-4">{frontmatter.title}</h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <time dateTime={frontmatter.date}>{frontmatter.date}</time>
                            </div>
                            <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{frontmatter.author}</span>
                            </div>
                        </div>

                        {frontmatter.tags && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {frontmatter.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    >
                                        <Tag className="w-3 h-3 mr-1" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>

                    <div className="mt-8">
                        <MDXRemote source={content} />
                    </div>
                </article>
            </main>


        </div>
    );
}
