import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  console.log('Posts:', posts);
  //  Check if `posts` is an array or not
  if (!Array.isArray(posts)) {
    return (
      <div className="posts">
        {/* Render a message or fallback content for empty posts */}
        <p>No posts available.</p>
      </div>
    );
  }

  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} />
      ))}
    </div>
  );
}
