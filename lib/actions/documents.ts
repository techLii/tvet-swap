"use server";

import fs from "fs";
import path from "path";

export interface FileSystemNode {
    id: string;
    name: string;
    type: "folder" | "file";
    url?: string;
    children?: FileSystemNode[];
}

const DOCUMENTS_ROOT = path.join(process.cwd(), "public", "documents");

function getRecursiveTree(currentPath: string, relativePath: string = ""): FileSystemNode[] {
    if (!fs.existsSync(currentPath)) {
        return [];
    }

    const items = fs.readdirSync(currentPath, { withFileTypes: true });
    const nodes: FileSystemNode[] = [];

    // Sort items: folders first, then files
    items.sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
    });

    for (const item of items) {
        // Skip hidden files/folders (e.g., .DS_Store, .git)
        if (item.name.startsWith(".")) {
            continue;
        }

        const itemFullPath = path.join(currentPath, item.name);
        // Clean URL path (ensure forward slashes for web compatibility)
        const itemRelativePath = path.posix.join(relativePath, item.name);

        // Generate a unique ID based on the relative path
        const id = itemRelativePath.replace(/\//g, "-");

        if (item.isDirectory()) {
            nodes.push({
                id,
                name: item.name,
                type: "folder",
                children: getRecursiveTree(itemFullPath, itemRelativePath),
            });
        } else {
            // Only include relevant document types if needed, or simply all files
            nodes.push({
                id,
                name: item.name,
                type: "file",
                url: `/documents/${itemRelativePath}`, // Public URL
            });
        }
    }

    return nodes;
}

export async function getDocumentsTree(): Promise<FileSystemNode[]> {
    try {
        return getRecursiveTree(DOCUMENTS_ROOT);
    } catch (error) {
        console.error("Error reading documents tree:", error);
        return [];
    }
}
