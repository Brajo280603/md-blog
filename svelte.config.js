import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

import {mdsvex, escapeSvelte} from 'mdsvex'
import {getHighlighter} from 'shiki'

import remarkUnwrapImages from 'remark-unwrap-images'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'

/** @type {import('mdsvex').mdsvexOptions} */
const mdsvexOptions = {
	extensions:['.md'],
	layout: {
		_: './src/mdsvex.svelte'
	},
	highlight: {
		hightlighter: async(code, lang = 'text') => {
			const hightlighter = await getHighlighter({
				themes: ['poimandres'],
				langs: ['javascript', 'typescript']
			})
			await hightlighter.loadLanguage('javascript','typescript')
			const html = escapeSvelte(hightlighter.codeToHtml(code, {lang, theme: 'poimandres'}))
			return `{@html \`${html}\`}`
		}
	},
	remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug]
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess:[vitePreprocess(),mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	}
}

export default config
