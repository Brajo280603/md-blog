<script>
	import { AwardIcon } from "lucide-svelte"



let post_obj = {}
let title;
let description;
let categories;
let slug;
let published;
let markdown;



async function createPost(){

    let date = new Date();
    date = date.toISOString();

    categories = categories.split(',');
    categories = categories.filter(category=>!!category);
    categories = {category: categories};

    if(!!title && !!description && !!categories && !!slug && !!published && !!markdown){
        post_obj = {
            title: title,
            description:description,
            categories: categories,
            published: published,
            markdown : markdown,
            slug: slug,
            date: date,
        }

        // console.log(post_obj)

        let res = await fetch("/api/create_post",{
                method: 'POST',
                body: JSON.stringify(post_obj),
                headers: {
                    'content-type': 'application/json'
                }
            })
        
        res = await res.json()

        alert(await res?"Post Created":"");

    }
    


}



</script>

<main>
    <form on:submit|preventDefault>
        <input type="text" placeholder="Title" bind:value={title} >
        <input type="text" placeholder="Description" bind:value={description}>
        <input type="text" placeholder="Categories" bind:value={categories}>
        <input type="text" placeholder="Slug" bind:value={slug}>
        <textarea type="text" placeholder="markdown" bind:value={markdown} rows="10"></textarea>

        <div style="display: flex;align-items:center; gap:var(--size-3)">
            <input type="checkbox" id="published" placeholder="Published" bind:checked={published}>
            <label for="published">Published</label>
        </div>

        <button on:click={createPost}>Submit</button>
    </form>
</main>


<style>
    form{
        display:flex;
        flex-direction: column;
        gap: var(--size-5);
        align-items: center;
    }

    form > *{
        width: 20rem;
    }

    form > button {
        width: 8rem;
    }
</style>