<div align="center">
    <img src="https://raw.githubusercontent.com/paperfeel/.github/main/profile/paperfeel.png" alt="Paperfeel"/>
</div>

<div align="center">
    <img src="https://raw.githubusercontent.com/paperfeel/.github/main/profile/seperator.png" alt="Seperator"/>
</div>

## About
This package is a SvelteKit preprocessor that allows you to write Svelte in Markdown files.

It uses [`unified.js`](https://unifiedjs.com) under the hood to transform Markdown content and is fully customizable with [`remark`](https://github.com/remarkjs/remark) and [`rehype`](https://github.com/rehypejs/rehype) plugins.

<div align="center">
    <img src="https://raw.githubusercontent.com/paperfeel/.github/main/profile/seperator.png" alt="Seperator"/>
</div>

## Installation
:warning: This is a [pure ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) package. Install it on Node.js `v18.0.0` or newer.

```bash
$ npm install -D @paperfeel/preprocessor
```

or

```bash
$ pnpm add -D @paperfeel/preprocessor
```

<div align="center">
    <img src="https://raw.githubusercontent.com/paperfeel/.github/main/profile/seperator.png" alt="Seperator"/>
</div>

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
        adapter: adapter(),
    }
};

export default config;
```

<div align="center">
    <img src="https://raw.githubusercontent.com/paperfeel/.github/main/profile/seperator.png" alt="Seperator"/>
</div>

## License
<a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License"/>
</a>