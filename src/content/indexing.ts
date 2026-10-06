// Search-engine indexing switch. OFF until launch: pages send "noindex" and robots.txt blocks crawlers.
// To launch, set NEXT_PUBLIC_ALLOW_INDEXING=true in the hosting environment and redeploy.
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
