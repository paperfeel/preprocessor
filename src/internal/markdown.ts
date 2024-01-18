import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

// Internal
import { rehypeRaw } from "$internal/plugins/rehypeRaw";
import { rehypeEscapeBraces } from "$internal/plugins/rehypeEscapeBraces";

// Types
import type { PaperfeelOptions } from "$internal/preprocessor";

/**
    Filters user plugins.
*/
const filterPlugins = (plugins: PaperfeelOptions["plugins"], filter: string) => {
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
export const createMarkdownProcessor = (
    options: Pick<PaperfeelOptions, "plugins" | "escape">
) => {
    const { plugins, escape } = options;

    const remarkUserPlugins = filterPlugins(plugins, "remark");
    const rehypeUserPlugins = filterPlugins(plugins, "rehype");

    const processor = unified()
        .use(remarkParse)
        .use(remarkUserPlugins)
        .use(remarkRehype, {
            allowDangerousHtml: true
        })
        .use(rehypeRaw)
        .use(rehypeUserPlugins)
        .use(rehypeEscapeBraces, {
            selectors: [
                "code",
                ...(Array.isArray(escape) ? escape : [])
            ]
        })
        .use(rehypeStringify, {
            allowDangerousHtml: true
        });

    return processor;
};