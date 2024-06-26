import { json } from '@sveltejs/kit'
// import { pb } from '$lib/components/pocket/Auth'
import PocketBase from 'pocketbase';
import {PUBLIC_POCKETBASE_SERVER_ADDRESS}  from '$env/static/public';


const pb = new PocketBase(PUBLIC_POCKETBASE_SERVER_ADDRESS);


async function getPostsMD(){
    let posts = []
    
    const paths = import.meta.glob('/src/posts/*.md', {
        eager:true
    })

    for(const path in paths){
        const file = paths[path]
        const slug = path.split('/').at(-1)?.replace('.md','')

        if(file && typeof file == 'object' &&'metadata' in file && slug){
            const metadata = file.metadata
            const post = { ...metadata, slug}
        
            post.published && posts.push(post)
        }
       
    }

    posts = posts.sort(
        (first , second)=>{
            return new Date(second.date).getTime() - new Date(first.date).getTime()
        }
    )


    return posts
}

async function getPostsDB(){

    let returnRecords = [];
    // you can also fetch all records at once via getFullList
    const records = await pb.collection('posts').getFullList({
        sort: '-created',
    })

    records.forEach(record=>{
        let json = {
            title : record.title,
            date : record.date,
            description: record.description,
            categories: record.categories.category,
            published: record.published,
            slug: record.slug
        }

        returnRecords.push(json);
    })

    return returnRecords;

}

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    
    // const posts = await getPostsMD();
    const posts = await getPostsDB()

    return json(posts)
};