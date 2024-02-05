import { visit, CONTINUE, EXIT } from "unist-util-visit";

// Types
import type { BuildVisitor } from "unist-util-visit";
import type { Root } from "hast";

/**
    Options.
*/
type Options = {
    /**
        Front matter.
    */
    meta: Record<string, any>;
};

/**
    Creates an exported meta object that contains front matter.
*/
const createMetaObject = (meta: Options["meta"]) => {
    return `export const meta = ${JSON.stringify(meta)};`;
};

/**
    Custom plugin to inject front matter into a script module.
*/
export const rehypeFrontmatter = (options: Options) => {
    let isScriptFound = false;
    
    const visitor: BuildVisitor<Root, "element"> = (node) => {
        const isScript =
            node.tagName === "script" &&
            node.properties.context === "module";

        if(!isScript) {
            return CONTINUE;
        }

        isScriptFound = true;

        node.children.unshift({
            type: "text",
            value: createMetaObject(options.meta)
        });

        return EXIT;
    };

    return (tree: Root) => {
        visit(tree, "element", visitor);

        if(isScriptFound) {
           return; 
        }

        tree.children.unshift({
            type: "element",
            tagName: "script",
            properties: {
                context: "module"
            },
            children: [
                {
                    type: "text",
                    value: createMetaObject(options.meta)
                }
            ]
        });
    };
};