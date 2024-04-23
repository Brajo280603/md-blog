
export async function load({ fetch }) {
  const response = await fetch('api/all_posts')
  const posts = await response.json()
  return { posts }
}