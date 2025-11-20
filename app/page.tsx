import Link from "next/link";
import { getLoggedInUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { LogIn, Users, ArrowRight } from "lucide-react";

export default async function Home() {
  const user = await getLoggedInUser();

  // If already logged in, redirect to dashboard
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">TVET Swap Kenya</h1>
          <Link
            href="/login"
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              TVET Trainers Mutual Transfer Platform
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Connect with fellow TVET trainers across Kenya to find mutual transfer opportunities
            </p>
          </div>

          {/* Login CTA */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Access Your Account</h3>
            <p className="text-gray-600 mb-6">
              Login to view available trainers and manage your transfer preferences
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
            >
              Login to Continue
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Don't have an account? Contact your administrator to get access.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Find Matches</h3>
              <p className="text-gray-600 text-sm">
                Browse trainers teaching the same courses looking for mutual transfers
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Secure Access</h3>
              <p className="text-gray-600 text-sm">
                Protected platform accessible only to verified TVET trainers
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Easy Process</h3>
              <p className="text-gray-600 text-sm">
                Simple interface to indicate availability and connect with potential matches
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-6 text-left">
              <div>
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                  1
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Login</h4>
                <p className="text-sm text-gray-600">
                  Access your account with credentials provided by your administrator
                </p>
              </div>
              <div>
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                  2
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Set Preferences</h4>
                <p className="text-sm text-gray-600">
                  Indicate you're open to transfer and specify desired locations
                </p>
              </div>
              <div>
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                  3
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Browse Trainers</h4>
                <p className="text-sm text-gray-600">
                  Search for trainers in your desired counties teaching similar courses
                </p>
              </div>
              <div>
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                  4
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Connect</h4>
                <p className="text-sm text-gray-600">
                  Contact potential matches directly to arrange mutual transfers
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>&copy; 2024 TVET Swap Kenya. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
