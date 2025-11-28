import Link from "next/link";
import { getLoggedInUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { LogIn, Users, ArrowRight, BookOpen, Briefcase, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function Home() {
  const user = await getLoggedInUser();

  // If already logged in, redirect to dashboard
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto px-4">
            <div className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
              The Official Community for Technical Trainers
            </div>
            <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter">
              Welcome to the <br className="hidden sm:inline" />
              Kenya Technical Trainers Community
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Empowering trainers through connection, knowledge sharing, and career opportunities. Join the club today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8"
              >
                Join the Community
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/trainers"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Find Trainers
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="community-features" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 mx-auto px-4">
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[200px] flex-col justify-between rounded-md p-6">
                <Briefcase className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Community Job Board</h3>
                  <p className="text-sm text-muted-foreground">
                    Find your next opportunity. A curated list of vacancies specifically for technical trainers.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[200px] flex-col justify-between rounded-md p-6">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Knowledge Hub</h3>
                  <p className="text-sm text-muted-foreground">
                    Articles, insights, and success stories from fellow trainers. Share your expertise.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[200px] flex-col justify-between rounded-md p-6">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Relocation Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Looking for a swap? Connect with colleagues to arrange mutual transfers easily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Values / How It Works */}
        <section className="container py-8 md:py-12 lg:py-24 mx-auto px-4">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Grow with the Community
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              We are more than just a platform; we are a club dedicated to the professional growth of every Kenyan Technical Trainer.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-4 mt-12">
            {[
              { step: 1, title: "Connect", desc: "Join a network of verified professional trainers." },
              { step: 2, title: "Share", desc: "Contribute articles and share your teaching experiences." },
              { step: 3, title: "Discover", desc: "Find new job openings and career opportunities." },
              { step: 4, title: "Swap", desc: "Find mutual transfer partners when you need to move." }
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shadow-lg ring-4 ring-background">
                  {item.step}
                </div>
                <h3 className="font-bold text-xl">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
