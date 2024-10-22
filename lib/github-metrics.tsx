export async function getGithubFollowers(): Promise<number> {
  const response = await fetch(`https://api.github.com/users/hecker`);
  if (!response.ok) {
    throw new Error(
      `GitHub API fetch failed: ${response.status} ${response.statusText}`,
    );
  }
  const data = await response.json();
  return data.followers;
}
