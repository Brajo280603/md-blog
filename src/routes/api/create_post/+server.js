import { json } from '@sveltejs/kit'
import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_SERVER_ADDRESS } from '$env/static/public';


const pb = new PocketBase(PUBLIC_POCKETBASE_SERVER_ADDRESS);



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
    
    const record = await pb.collection('posts').create(data);

    return record;
}

/** @type {import('./$types').RequestHandler} */

export async function POST({request}){

    let data = await request.json();
    return json(await createPost(data))
}