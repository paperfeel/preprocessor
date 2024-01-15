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
    return {
        name: "paperfeel"
    };
};