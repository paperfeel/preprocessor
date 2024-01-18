import { fromHtml } from "hast-util-from-html";
import { visit } from "unist-util-visit";

// Types
import type { BuildVisitor } from "unist-util-visit";
import type { Root } from "hast";

/**
    Custom plugin to parse raw HTML.
*/
export const rehypeRaw = () => {
    const visitor: BuildVisitor<Root, "raw"> = (node, i, parent) => {
        if(!parent || typeof i !== "number") {
            return;
        }

        const { children } = fromHtml(node.value, {
            fragment: true
        });

        parent.children.splice(i, 1, ...children);
    };

    return (tree: Root) => {
        visit(tree, "raw", visitor);
    };
};