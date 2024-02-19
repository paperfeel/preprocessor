import { selectAll } from "hast-util-select";

// Types
import type { Root, Node, Element, Text } from "hast";

/**
    Options.
*/
type Options = {
    /**
        User-defined selectors.
    */
    selectors: string[];
};

/**
    Tests if a node is an element.
*/
const isElement = (node: Node): node is Element => {
    return (
        node.type === "element" &&
        "children" in node
    );
};

/**
    Tests if the node is text.
*/
const isText = (node: Node): node is Text => {
    return (
        node.type === "text" &&
        "value" in node
    );
};

/**
    Escapes curly braces within the node recursively.
*/
const escapeNode = (node: Node) => {
    if(isElement(node)) {
        for(const child of node.children) {
            escapeNode(child);
        }

        return;
    }

    if(isText(node)) {
        node.value = node.value
            .replaceAll("{", `\0l"{"\0r`)
            .replaceAll("}", `\0l"}"\0r`)
            .replaceAll("\0l", "{")
            .replaceAll("\0r", "}");
    }
};

/**
    Custom plugin to escape curly braces within the selected nodes.
*/
export const rehypeEscapeBraces = ({ selectors }: Options) => {
    return (tree: Root) => {
        for(const selector of selectors) {
            selectAll(selector, tree).forEach(escapeNode);
        }
    };
};