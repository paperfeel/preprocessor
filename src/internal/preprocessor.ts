import matter from "gray-matter";

// Internal
import { processMarkdown } from "$internal/markdown";

// Types
import type { PreprocessorGroup } from "svelte/compiler";
import type { VitePreprocessOptions } from "@sveltejs/vite-plugin-svelte";
import type { GrayMatterOption } from "gray-matter";
import type { Plugin, Settings as PluginSettings } from "unified";

/**
    Paperfeel preprocessor options.
*/
export type PaperfeelOptions = {
    /**
        Plugins passed to `unified.js`. This preprocessor automatically sorts plugins
        and puts `remark` plugins in front of `rehype` plugins.
    */
    plugins?: (Plugin | [ Plugin, PluginSettings ])[];

    /**
        List of [selectors](https://github.com/syntax-tree/hast-util-select?tab=readme-ov-file#support)
        for nodes in which curly braces must be escaped.
        The content of `code` nodes is automatically escaped by this preprocessor.
    */
    escape?: string[];

    /**
        Options passed to `gray-matter`.
    */
    frontMatter?: GrayMatterOption<string, any>;

    /**
        Options passed to `@sveltejs/vite-plugin-svelte`.
    */
    svelte?: VitePreprocessOptions;
};

/**
    Paperfeel preprocessor.
*/
export const preprocessor = (
    options: Omit<PaperfeelOptions, "svelte"> = {}
): PreprocessorGroup => ({
    name: "paperfeel",
    async markup({ filename, content }) {
        if(!filename?.endsWith(".md")) {
            return;
        }

        const { data: meta, content: markdown } = matter(
            content,
            options.frontMatter
        );
        
        return {
            code: await processMarkdown(meta, markdown, options)
        };
    }
});