import { json } from '@sveltejs/kit'

import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_SERVER_ADDRESS } from '$env/static/public';

const pb = new PocketBase(PUBLIC_POCKETBASE_SERVER_ADDRESS);

// const pb = new PocketBase(env.POCKETBASE_SERVER_ADDRESS);



async function getPostDB(slug){
    const record = await pb.collection('posts').getFirstListItem(`slug="${slug}"`, {});


    let json = {
        title : record.title,
        date : record.date,
        description: record.description,
        categories: record.categories.category,
        published: record.published,
        slug: record.slug,
        fileName: record.markdown,
        collectionId: record.collectionId,
        recordId: record.id,
        markdownString: record.markdownString
    }

    return json
}

async function getFileDB(collectionId,recordId,fileName){
    // let url_string = `${env.POCKETBASE_SERVER_ADDRESS}/api/files/${records[0].collectionId}/${records[0].id}/${records[0].markdown}`;

    let url_string = `${PUBLIC_POCKETBASE_SERVER_ADDRESS}/api/files/${collectionId}/${recordId}/${fileName}`;

    let file_text = await fetch(url_string);

    file_text = await file_text.text()

    return file_text

}


/** @type {import('./$types').RequestHandler} */
export async function GET(params) {
    let slug = params.url.searchParams.get("fileName")

    let post = await getPostDB(slug)

    let postFile = ''

    if(!!post.markdownString){
        postFile = post.markdownString
    }else{
        postFile = await getFileDB(post.collectionId,post.recordId,post.fileName)
    }

    
    

    
    let returnJson = {
        metadata: post,
        default: postFile,
    }

    
    return json(JSON.stringify(returnJson));
};