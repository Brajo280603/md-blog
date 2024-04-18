<script>
  import { fly } from 'svelte/transition'
  import { Moon, Sun } from 'lucide-svelte'
  import { theme, toggleTheme } from '$lib/theme'
</script>

<button on:click={toggleTheme} aria-label="Toggle theme">
  {#if $theme == 'dark'}
    <div>
      <Sun />
      <span>Light</span>
    </div>
  {:else}
    <div>
      <Moon />
      <span>Dark</span>
    </div>
  {/if}
</button>


<style>
  button {
    padding: 0;
    font-weight: inherit;
    background: none;
    border: none;
    box-shadow: none;
    overflow: hidden;
  }

  button > * {
    display: flex;
    gap: var(--size-2);
  }
</style>