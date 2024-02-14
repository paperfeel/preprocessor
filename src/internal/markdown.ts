import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

// Internal
import { rehypeComponents } from "$internal/plugins/rehypeComponents";
import { rehypeFrontmatter } from "$internal/plugins/rehypeFrontmatter";
import { rehypeEscapeBraces } from "$internal/plugins/rehypeEscapeBraces";

// Types
import type { PaperfeelOptions } from "$internal/preprocessor";

let remarkUserPlugins: PaperfeelOptions["plugins"] = undefined;
let rehypeUserPlugins: PaperfeelOptions["plugins"] = undefined;

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
export const processMarkdown = async (
    meta: Record<string, any>,
    markdown: string,
    options: Pick<PaperfeelOptions, "plugins" | "escape">
) => {
    const { plugins, escape } = options;

    remarkUserPlugins ||= filterPlugins(plugins, "remark");
    rehypeUserPlugins ||= filterPlugins(plugins, "rehype");

    const file = await unified()
        .use(remarkParse)
        .use(remarkUserPlugins)
        .use(remarkRehype, {
            allowDangerousHtml: true
        })
        .use(rehypeRaw)
        .use(rehypeComponents)
        .use(rehypeFrontmatter, {
            meta
        })
        .use(rehypeUserPlugins)
        .use(rehypeEscapeBraces, {
            selectors: [
                "code",
                ...(Array.isArray(escape) ? escape : [])
            ]
        })
        .use(rehypeStringify, {
            allowDangerousHtml: true
        })
        .process(markdown);

    return file.toString();
};