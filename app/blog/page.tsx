import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    image?: string;
}

function getBlogPosts(): BlogPost[] {
    const postsDirectory = path.join(process.cwd(), "app/blog/posts");

    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const files = fs.readdirSync(postsDirectory);

    const posts = files.map((filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(fileContent);

        return {
            slug: filename.replace(".mdx", ""),
            title: data.title,
            description: data.description,
            date: data.date,
            author: data.author,
            tags: data.tags,
            image: data.image,
        };
    });

    // Sort posts by date (descending)
    return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export default function BlogPage() {
    const posts = getBlogPosts();

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Knowledge Hub</h1>
                    <p className="text-muted-foreground text-lg">
                        Articles, insights, and stories from the Kenya Technical Trainers community.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No blog posts found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <article
                                key={post.slug}
                                className="flex flex-col bg-card border border-border/40 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Image placeholder if needed, or just use a gradient/color */}
                                <div className="h-48 bg-muted flex items-center justify-center text-muted-foreground">
                                    {/* If we had real images we'd use next/image here */}
                                    <span className="text-sm">Blog Image</span>
                                </div>

                                <div className="flex-1 p-6 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <time dateTime={post.date}>{post.date}</time>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            <span>{post.author}</span>
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h2>

                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                                        {post.description}
                                    </p>

                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-auto"
                                    >
                                        Read more
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
