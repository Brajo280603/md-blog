<script>
  import * as config from '$lib/config'
</script>

<footer>
  <p>{config.title} &copy {new Date().getFullYear()}</p>
  <a href="/create">Create</a>
</footer>

<style>
  footer{
    padding-block: var(--size-7);
    border-top: 1px solid var(--border);
  }

  p{
    color: var(--text-2);
  }

  a{
    color:inherit;
    text-decoration: none;
  }

  @media (min-width: 768px){
    footer{
      display: flex;
      justify-content: space-between;
    }
  }
</style>