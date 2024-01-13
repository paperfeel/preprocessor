import type { PreprocessorGroup } from "svelte/compiler";
import type { VitePreprocessOptions } from "@sveltejs/vite-plugin-svelte";

/**
    Paperfeel preprocessor options.
*/
export type PaperfeelOptions = {
    /**
        Options passed to `@sveltejs/vite-plugin-svelte`.
    */
    svelte?: VitePreprocessOptions;
};

/**
    Paperfeel preprocessor.
*/
export const preprocessor = (
    options?: Omit<PaperfeelOptions, "svelte">
): PreprocessorGroup => ({
    name: "paperfeel"
});