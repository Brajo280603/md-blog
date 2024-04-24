<script lang="ts">
    import { currentUser, pb } from '../pocketAuth/index.js';
  
    let username: string;
    let password: string;
  
    async function login() {

      try{
        if(!!username && !!password){
          await pb.collection('users').authWithPassword(username, password);
        }

      }catch(e){

        alert("Login Failed")
      }

    }
  

  
    function signOut() {
      pb.authStore.clear();
    }
  
  </script>
  
  {#if $currentUser}
    <div class="userDiv">
      <p>
        Signed in as {$currentUser.username} 
      </p>
        <button on:click={signOut}>Sign Out</button>
    </div>
   
      <slot></slot>
  {:else}
    <form on:submit|preventDefault>
      <input
        placeholder="Username"
        type="text"
        bind:value={username}
      />
  
      <input 
        placeholder="Password" 
        type="password" 
        bind:value={password} 
      />
      <button on:click={login}>Login</button>
    </form>
  {/if}


  <style>
  form {
    display:flex;
    flex-direction: column;
    gap: var(--size-5);
    align-items: center;
  }
  form > * {
    width: 20rem;
  }
  form > button {
    width: 8rem;
  }

  .userDiv{
    display: flex;
    gap: var(--size-5);
    align-items: center;
    justify-content: center;

    margin-bottom: var(--size-5);
  }
  </style>