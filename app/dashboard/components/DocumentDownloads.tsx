"use client";

import { useState } from "react";
import { Download, FileText, ChevronRight, ChevronDown, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FileSystemNode } from "@/lib/actions/documents";

// --- Components ---

interface FileNodeItemProps {
    node: FileSystemNode;
    level: number;
}

function FileNodeItem({ node, level }: FileNodeItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;

    const toggleOpen = () => {
        if (node.type === "folder") {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div>
            <div
                className={cn(
                    "flex items-center gap-2 py-2 px-2 rounded-md transition-colors select-none cursor-pointer",
                    "hover:bg-muted/50",
                    level > 0 && "ml-4"
                )}
                style={{ paddingLeft: `${level * 12 + 8}px` }}
                onClick={toggleOpen}
            >
                {/* Icon & Arrow */}
                <div className="flex items-center gap-1.5 min-w-[24px]">
                    {node.type === "folder" && (
                        <div className="text-muted-foreground">
                            {isOpen ? (
                                <ChevronDown className="w-4 h-4" />
                            ) : (
                                <ChevronRight className="w-4 h-4" />
                            )}
                        </div>
                    )}
                </div>

                {/* Folder/File Icon */}
                <div className={cn("text-muted-foreground", isOpen ? "text-primary" : "")}>
                    {node.type === "folder" ? (
                        isOpen ? (
                            <FolderOpen className="w-4 h-4" />
                        ) : (
                            <Folder className="w-4 h-4" />
                        )
                    ) : (
                        <FileText className="w-4 h-4" />
                    )}
                </div>

                {/* Name */}
                <span className="text-sm font-medium truncate flex-1">{node.name}</span>

                {/* Download Button (if file) */}
                {node.type === "file" && node.url && (
                    <a
                        href={node.url}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        title="Download"
                    >
                        <Download className="w-4 h-4" />
                    </a>
                )}
            </div>

            {/* Children (Lazy Render Visuals) */}
            {isOpen && hasChildren && (
                <div className="border-l border-border/40 ml-[15px]">
                    {node.children?.map((child) => (
                        <FileNodeItem key={child.id} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

interface DocumentDownloadsProps {
    initialData: FileSystemNode[];
}

export default function DocumentDownloads({ initialData }: DocumentDownloadsProps) {
    return (
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-muted/30">
                <h3 className="font-semibold flex items-center gap-2">
                    <Folder className="w-5 h-5 text-primary" />
                    File Explorer
                </h3>
            </div>
            <div className="p-2 overflow-x-auto">
                <div className="min-w-[300px]">
                    {initialData.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground text-sm">
                            No documents found.
                        </div>
                    ) : (
                        initialData.map((node) => (
                            <FileNodeItem key={node.id} node={node} level={0} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
