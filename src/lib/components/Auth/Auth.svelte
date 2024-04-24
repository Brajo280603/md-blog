<script type="module">
  import { initAuth } from '../../../auth/index'
  export const { user, loginWithGoogle } = initAuth()

  user.subscribe(val => console.log(val))
</script>


<button on:click={loginWithGoogle}>
  Login With Google
</button>