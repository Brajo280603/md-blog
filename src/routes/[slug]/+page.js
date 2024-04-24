/** @type {import('./$types').PageLoad} */

import { error } from '@sveltejs/kit';





async function getPostMD(params){
    try{
        const post = await import(`../../posts/${params.slug}.md`)

        return {
            content: post.default,
            meta: post.metadata            
        }
    } catch (e) {
        error(404, `Could not find ${params.slug}`)
    }
}


async function getPostDB(fetch, params){
    
    try{
        let post = await fetch(`api/post?fileName=${params.slug}`)

        post = await post.json()

        post = JSON.parse(post)



        return {
            content: post.default,
            meta: post.metadata            
        }
    } catch (e) {
        error(404, `Could not find ${params.slug}`)
    }
}


export async function load({ fetch,params }) {

    return await getPostDB(fetch,params);
    // return await getPostMD(params)

};