import { createMarkdownProcessor } from "$internal/markdown";

// Types
import type { PreprocessorGroup } from "svelte/compiler";
import type { VitePreprocessOptions } from "@sveltejs/vite-plugin-svelte";
import type { Plugin, Settings as PluginSettings } from "unified";

/**
    Paperfeel preprocessor options.
*/
export type PaperfeelOptions = {
    /**
        Plugins passed to `unified.js`.
    */
    plugins?: (Plugin | [ Plugin, PluginSettings ])[];

    /**
        List of [selectors](https://github.com/syntax-tree/hast-util-select?tab=readme-ov-file#support)
        for nodes in which curly braces must be escaped.
        The content of `code` nodes is automatically escaped by this preprocessor.
    */
    escape?: string[];

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
): PreprocessorGroup => {
    const markdownProcessor = createMarkdownProcessor(options);

    return {
        name: "paperfeel",
        async markup({ filename, content }) {
            if(!filename?.endsWith(".md")) {
                return;
            }

            // TODO gray-matter

            const output = await markdownProcessor.process(content);
            
            return {
                code: output.value.toString()
            };
        }
    };
};