async function fetchUser() {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return { name: '사용자' }
}

async function fetchPosts() {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return [
    { id: '1', title: '게시글 1' },
    { id: '2', title: '게시글 2' },
  ]
}

async function fetchComments() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return [
    { id: '1', text: '댓글 1' },
    { id: '2', text: '댓글 2' },
  ]
}

function Header({ user }: { user: { name: string } }) {
  return (
    <header className="p-4 bg-blue-500 text-white">
      <h1>환영합니다, {user.name}님</h1>
    </header>
  )
}

function Posts({ posts }: { posts: { id: string; title: string }[] }) {
  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-2">게시글</h2>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="p-2 bg-gray-100 rounded">
            {post.title}
          </li>
        ))}
      </ul>
    </section>
  )
}

function Comments({ comments }: { comments: { id: string; text: string }[] }) {
  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-2">댓글</h2>
      <ul className="space-y-2">
        {comments.map((comment) => (
          <li key={comment.id} className="p-2 bg-gray-100 rounded">
            {comment.text}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default async function Page() {
  const user = await fetchUser()
  const posts = await fetchPosts()
  const comments = await fetchComments()

  return (
    <div>
      <Header user={user} />
      <Posts posts={posts} />
      <Comments comments={comments} />
    </div>
  )
}
