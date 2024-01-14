import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

// Types
import type { PaperfeelOptions } from "$internal/preprocessor";

/**
    Filters user plugins.
*/
const filterPlugins = ( plugins: PaperfeelOptions["plugins"], filter: string) => {
    if(!plugins) {
        return [];
    }

    return plugins.filter((plugin) => {
        const name = Array.isArray(plugin) ? plugin[0].name : plugin.name;
        return name.startsWith(filter);
    });
};

/**
    Creates an instance of a Markdown processor.
*/
export const createMarkdownProcessor = (plugins?: PaperfeelOptions["plugins"]) => {
    const remarkUserPlugins = filterPlugins(plugins, "remark");
    const rehypeUserPlugins = filterPlugins(plugins, "rehype");

    const processor = unified()
        .use(remarkParse)
        .use(remarkUserPlugins)
        .use(remarkRehype)
        .use(rehypeUserPlugins)
        .use(rehypeStringify);

    return processor;
};