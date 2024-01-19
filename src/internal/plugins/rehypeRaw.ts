import { visit } from "unist-util-visit";

// Internal
import { parseRaw } from "$internal/utils/parseRaw";

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

        const tree = parseRaw(node.value);

        if(!tree) {
            return;
        }

        parent.children.splice(i, 1, ...tree);
    };

    return (tree: Root) => {
        visit(tree, "raw", visitor);
    };
};