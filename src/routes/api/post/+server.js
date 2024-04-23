import { json } from '@sveltejs/kit'
import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';

import { compile } from 'mdsvex';
import {mdsvex, escapeSvelte} from 'mdsvex'
import {getHighlighter} from 'shiki'

import remarkUnwrapImages from 'remark-unwrap-images'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'

const pb = new PocketBase(env.POCKETBASE_SERVER_ADDRESS);

/** @type {import('mdsvex').mdsvexOptions} */
const mdsvexOptions = {
	extensions:['.md'],
	layout: {
		_: './src/mdsvex.svelte'
	},
	// highlight: {
	// 	hightlighter: async(code, lang = 'text') => {
	// 		const hightlighter = await getHighlighter({
	// 			themes: ['poimandres'],
	// 			langs: ['javascript', 'typescript']
	// 		})
	// 		await hightlighter.loadLanguage('javascript','typescript')
	// 		const html = escapeSvelte(hightlighter.codeToHtml(code, {lang, theme: 'poimandres'}))
	// 		return `{@html \`${html}\`}`
	// 	}
	// },
	// remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
	// rehypePlugins: [rehypeSlug]
}

async function getPostDB(slug){
    const record = await pb.collection('posts').getFirstListItem(`slug="${slug}"`, {});


    let json = {
        title : record.title,
        date : record.date,
        description: record.description,
        categories: record.categories,
        published: record.published,
        slug: record.slug,
        fileName: record.markdown,
        collectionId: record.collectionId,
        recordId: record.id
    }

    return json
}

async function getFileDB(collectionId,recordId,fileName){
    // let url_string = `${env.POCKETBASE_SERVER_ADDRESS}/api/files/${records[0].collectionId}/${records[0].id}/${records[0].markdown}`;

    let url_string = `${env.POCKETBASE_SERVER_ADDRESS}/api/files/${collectionId}/${recordId}/${fileName}`;

    let file_text = await fetch(url_string);

    file_text = await file_text.text()

    return file_text

}


/** @type {import('./$types').RequestHandler} */
export async function GET(params) {
    let slug = params.url.searchParams.get("fileName")

    let post = await getPostDB(slug)

    let postFile = await getFileDB(post.collectionId,post.recordId,post.fileName)
    
    // console.log(postFile)
    
    postFile = await compile(postFile,mdsvexOptions)

    // console.log(postFile)
    let returnJson = {
        metadata: post,
        default: postFile,
    }

    // console.log(json(JSON.stringify(returnJson)))
    return json(JSON.stringify(returnJson));
};