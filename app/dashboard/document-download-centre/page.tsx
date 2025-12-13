import DocumentDownloads from "../components/DocumentDownloads";
import { getLoggedInUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function DocumentDownloadPage() {
    const user = await getLoggedInUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Document Download Centre</h2>
            <DocumentDownloads />
        </div>
    );
}
