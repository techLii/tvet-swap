import DocumentDownloads from "../components/DocumentDownloads";
import { getLoggedInUser } from "@/lib/actions/auth";
import { getDocumentsTree } from "@/lib/actions/documents";
import { redirect } from "next/navigation";

export default async function DocumentDownloadPage() {
    const user = await getLoggedInUser();

    if (!user) {
        redirect("/login");
    }

    const documentsTree = await getDocumentsTree();

    return (
        <div className="h-full">
            <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Document Download Centre</h2>
                <p className="text-muted-foreground mt-1">
                    Access and download curriculum modules and standards.
                </p>
            </div>
            <DocumentDownloads initialData={documentsTree} />
        </div>
    );
}
