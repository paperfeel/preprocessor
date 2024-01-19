import { htmlTagNames } from "html-tag-names";
import { visit } from "unist-util-visit";

// Types
import type { BuildVisitor } from "unist-util-visit";
import type { Root } from "hast";

/**
    Custom plugin to fix the tag names of Svelte components.
*/
export const rehypeComponents = () => {
    const visitor: BuildVisitor<Root, "element"> = (node) => {
        if(!htmlTagNames.includes(node.tagName)) {
            node.tagName = node.tagName[0].toUpperCase() + node.tagName.slice(1);
        }
    };

    return (tree: Root) => {
        visit(tree, "element", visitor);
    };
};