import Link from "next/link";
import { getLoggedInUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { LogIn, Users, ArrowRight } from "lucide-react";
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
              The Official Mutual Transfer Platform
            </div>
            <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter">
              Connect with TVET Trainers <br className="hidden sm:inline" />
              Across Kenya
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Find mutual transfer opportunities, connect with colleagues, and manage your career growth in a secure, verified environment.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 mx-auto px-4">
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Users className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Find Matches</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse trainers teaching the same courses looking for mutual transfers in your desired location.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
                  <LogIn className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Secure Access</h3>
                  <p className="text-sm text-muted-foreground">
                    A protected platform accessible only to verified TVET trainers and administrators.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Easy Process</h3>
                  <p className="text-sm text-muted-foreground">
                    Simple interface to indicate availability and connect with potential matches directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="container py-8 md:py-12 lg:py-24 mx-auto px-4">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              How It Works
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Your journey to a new station in 4 simple steps.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-4 mt-12">
            {[
              { step: 1, title: "Login", desc: "Access your account with admin-provided credentials" },
              { step: 2, title: "Set Preferences", desc: "Indicate you're open to transfer and specify locations" },
              { step: 3, title: "Browse", desc: "Search for trainers in your desired counties" },
              { step: 4, title: "Connect", desc: "Contact matches to arrange mutual transfers" }
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
