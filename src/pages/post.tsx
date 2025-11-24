import { useEffect, useState } from "react";
import { getAllPosts } from "../services/post";

export default function Post() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllPosts(pageNumber, 3);

      if (data && data.data) {
        setPosts(data.data);
        setTotalPages(data.totalPages);
        setPage(pageNumber);
      } else {
        setPosts([]);
        setTotalPages(1);
        setError("No posts found.");
      }
    } catch (err: any) {
      console.log(err);
      setPosts([]);
      setTotalPages(1);
      setError(err.message || "Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePrev = () => {
    if (page > 1) fetchData(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) fetchData(page + 1);
  };

  return (
    <div>
      <h2>All Posts</h2>

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {posts.length > 0 &&
        posts.map((p: any) => (
          <div key={p._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h3>{p.title}</h3>
            <p>{p.content}</p>
            {p.imgURL && <img src={p.imgURL} width="150px" alt={p.title} />}
          </div>
        ))}

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrev} disabled={page === 1} style={{ marginRight: "10px" }}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>
    </div>
  );
}
