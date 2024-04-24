import { json } from '@sveltejs/kit'
import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/public';


const pb = new PocketBase(env.PUBLIC_POCKETBASE_SERVER_ADDRESS);



async function createPost(post){
    // example create data
    const data = {
        "title": post.title,
        "date": post.date,
        "description": post.description,
        "categories": JSON.stringify(post.categories),
        "published": post.published,
        "slug": post.slug,
        "markdownString": post.markdown,
    };
    console.log(data)
    const record = await pb.collection('posts').create(data);

    return record;
}

/** @type {import('./$types').RequestHandler} */

export async function POST({request}){

    let data = await request.json();
    return json(await createPost(data))
}