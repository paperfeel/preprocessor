<div align="center">
    <img src="https://raw.githubusercontent.com/paperfeel/.github/main/profile/paperfeel.png" alt="Paperfeel"/>
</div>

## Overview
- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Best Practices](#best-practices)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)
- [License](#license)

<img src="https://raw.githubusercontent.com/paperfeel/.github/main/profile/seperator.png" alt="Seperator"/>

## About
This package is a [SvelteKit preprocessor](https://kit.svelte.dev/docs/integrations) that allows you to write Svelte in Markdown files. It uses [`unified.js`](https://unifiedjs.com) under the hood to transform Markdown content and is fully customizable with [`remark`](https://github.com/remarkjs/remark) and [`rehype`](https://github.com/rehypejs/rehype) plugins.

<img src="https://raw.githubusercontent.com/paperfeel/.github/main/profile/seperator.png" alt="Seperator"/>

## Installation
> [!note]
> This is a [pure ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) package. Please install on Node.js v16 or newer.

```sh
npm install -D @paperfeel/preprocessor
```

<img src="https://raw.githubusercontent.com/paperfeel/.github/main/profile/seperator.png" alt="Seperator"/>

## Usage
To use this preprocessor, make the following changes to your `svelte.config.js` file:

1. Replace `vitePreprocess()` with `paperfeel()`
2. Add `.md` to the list of allowed file extensions

```js
import adapter from "@sveltejs/adapter-auto";
import { paperfeel } from "@paperfeel/preprocessor";

/**
    @type {import("@sveltejs/kit").Config}
*/
const config = {
    preprocess: paperfeel(),
    extensions: [
        ".svelte",
        ".md"
    ],
    kit: {
        adapter: adapter()
    }
};

export default config;
```

Then add pages or components that end in `.md`:

```md
---
title: My First Page
---

<script lang="ts">
    import Foo from "./Foo.svelte";
</script>

# {meta.title}
This is some example content!

<div>
    <Foo/>
</div>
```

> [!tip]
> The front matter is automatically parsed and is available via the `meta` variable. It can also be imported from a Svelte component.

```svelte
<script>
    import Foo, { meta } from "./Foo.md";
</script>
```

To further enhance your developer experience with VS Code and Paperfeel, you can associate Markdown files with the Svelte syntax in the workspace settings:

```json
{
  "files.associations": {
    "**/src/**/*.md": "svelte"
  }
}
```

This way, only Markdown files in the `src` directory will have Svelte autocomplete and syntax highlighting features, leaving files like `README.md` intact.

<img src="https://raw.githubusercontent.com/paperfeel/.github/main/profile/seperator.png" alt="Seperator"/>

## API
This package exports the function [`paperfeel`](#paperfeeloptions). There is no default export.

### `paperfeel(options)`
Paperfeel preprocessor.

###### Parameters
- `options` ([`PaperfeelOptions`](#options))

###### Returns
Preprocessor ([`PreprocessorGroup[]`](https://svelte.dev/docs/svelte-compiler#types-preprocessorgroup)).

### `Options`
Paperfeel preprocessor options.

###### Fields
- `plugins` (`(Plugin | [ Plugin, PluginSettings ])[]`, optional) &mdash; Plugins passed to `unified.js`. This preprocessor automatically sorts plugins and puts `remark` plugins in front of `rehype` plugins.
- `escape` (`string[]`, optional) &mdash; List of [selectors](https://github.com/syntax-tree/hast-util-select?tab=readme-ov-file#support) for nodes in which curly braces must be escaped. The content of `code` nodes is automatically escaped by this preprocessor.
- `frontMatter` ([`GrayMatterOptions`](https://github.com/jonschlinkert/gray-matter?tab=readme-ov-file#options), optional) &mdash; Options passed to `gray-matter`.
- `svelte` ([`VitePreprocessOptions`](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md), optional) &mdash; Options passed to `@sveltejs/vite-plugin-svelte`.

<img src="https://raw.githubusercontent.com/paperfeel/.github/main/profile/seperator.png" alt="Seperator"/>

## Best Practices
### Avoid Self-Closing Tags
Due to the [underlying HTML parser](https://github.com/inikulin/parse5) that is used, it is best to either avoid self-closing HTML tags or to wrap them in a `div`. Otherwise, everything after the self-closing tag will not be rendered.

```svelte
<!-- bad -->
<MyComponent/>

<!-- good -->
<MyComponent></MyComponent>

<!-- good -->
<div>
    <MyComponent/>
</div>
```

### Avoid Naming Your Components Like HTML Tags
Currently, all non-standard HTML tag names (i.e. tag names not listed in the [`html-tag-names`](https://github.com/wooorm/html-tag-names) package) are automatically capitalized by this preprocessor. During the parsing process, a component like `H1` is converted to `h1`, a standard HTML tag, and is not recognized by this preprocessor as a Svelte component.

```svelte
<!-- bad -->
<H1>My Heading</H1>

<!-- good -->
<Heading1>My Heading</Heading1>
```

### Keep State Handling Minimal
Markdown is primarily for writing content &mdash; if you need to handle state, it's best to put it in a separate Svelte component and import it into your Markdown.

```svelte
<!-- bad -->
<script>
    let counter = 0;
    
    const increment = () => {
        counter++;
    };
</script>

<button on:click={increment}>Clicks: {counter}</button>

<!-- good -->
<script>
    import Counter from "./Counter.svelte";
</script>

<div>
    <Counter/>
</div>
```

<img src="https://raw.githubusercontent.com/paperfeel/.github/main/profile/seperator.png" alt="Seperator"/>

## Frequently Asked Questions
### How can I use `rehype-katex` with Paperfeel?
1. In the Paperfeel [preprocessor config](#options), add [`rehype-katex`](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex) (and optionally [`remark-math`](https://github.com/remarkjs/remark-math/tree/main/packages/remark-math)) to the list of plugins.
2. Add `span.katex-display` to the list of nodes in which to escape the curly brackets.

> [!caution]
> If `span.katex-display` is not added to `escape` in the config, Svelte will try to parse content inside curly brackets as JavaScript, which will ultimately fail to render.

```js
// ...
paperfeel({
    plugins: [
        remarkMath,
        rehypeKatex
    ],
    escape: [
        "span.katex-display"
    ]
}),
// ...
```

<img src="https://raw.githubusercontent.com/paperfeel/.github/main/profile/seperator.png" alt="Seperator"/>

## Contributing
Your contributions are greatly appreciated. If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply [open an issue](https://github.com/paperfeel/preprocessor/issues/new).

<a href="https://github.com/paperfeel/preprocessor/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=paperfeel/preprocessor"/>
</a>

<img src="https://raw.githubusercontent.com/paperfeel/.github/main/profile/seperator.png" alt="Seperator"/>

## Acknowledgments
- Logo taken from [Lucide](https://lucide.dev)
- README inspired by [`unified.js`](https://github.com/unifiedjs/unified)

<img src="https://raw.githubusercontent.com/paperfeel/.github/main/profile/seperator.png" alt="Seperator"/>

## License
<a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT license"/>
</a>