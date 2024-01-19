import { parseDocument } from "htmlparser2";

// Types
import type {
    Document,
    Node as DomNode,
    Element as DomElement,
    Text as DomText
} from "domhandler";
import {
    Element as HastElement,
    Text as HastText
} from "hast";

/**
    Creates a HAST element from a DOM element.
*/
const createElement = (node: DomElement): HastElement => {
    const tagName = node.tagName;
    const properties = node.attribs;

    return {
        type: "element",
        tagName,
        properties,
        children: transformChildren(node)
    };
};

/**
    Creates a HAST text from a DOM node.
*/
const createText = (node: DomText): HastText => {
    return {
        type: "text",
        value: node.nodeValue || ""
    };
};

/**
    Transforms the child nodes of a DOM node into HAST nodes.
*/
const transformChildren = (node: DomElement | Document) => {
    const nodes = [];

    for(const child of node.children) {
        const node = transformNode(child);

        if(!node) {
            continue;
        }

        nodes.push(node);
    }

    return nodes;
};

/**
    Transforms a DOM node into a HAST node.
*/
const transformNode = (node: DomNode) => {
    switch(node.nodeType) {
        // Element
        case 1: {
            return createElement(node as DomElement);
        }

        // Text
        case 3: {
            return createText(node as DomText);
        }

        // Unknown
        default: {
            return null;
        }
    }
};

/**
    Utility that transforms a DOM to HAST.
*/
export const parseRaw = (raw: string) => {
    const document = parseDocument(raw, {
        lowerCaseTags: false
    });

    return transformChildren(document);
};