import PocketBase from 'pocketbase';

import { writable } from 'svelte/store';

import { PUBLIC_POCKETBASE_SERVER_ADDRESS } from '$env/static/public';


export const pb = new PocketBase(PUBLIC_POCKETBASE_SERVER_ADDRESS); // remote
// const pb = new PocketBase('http://127.0.0.1:8090'); // local

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    // console.log('authStore changed', auth);
    currentUser.set(pb.authStore.model);
});