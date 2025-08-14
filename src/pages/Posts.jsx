import { useEffect, useState } from "react";
import { getUserPosts } from "../services/api";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import LoadingSpinner from "../components/Loading";

export default function Posts() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserPosts(id).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="mb-4">User {id} - Posts</h1>
      {posts.map((post) => (
        <Card key={post.id} className="mb-3">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
            <Button
              as={Link}
              to={`/posts/${post.id}`}
              variant="outline-primary"
              size="sm"
            >
              Detail Post
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
