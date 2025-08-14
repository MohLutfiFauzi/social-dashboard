import { useEffect, useState } from "react";
import {
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
} from "../services/api";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Modal, Form } from "react-bootstrap";
import LoadingSpinner from "../components/Loading";

export default function Posts() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // State Modal
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", body: "" });

  useEffect(() => {
    getUserPosts(id).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, [id]);

  const handleShowModal = (post = null) => {
    if (post) {
      setEditingId(post.id);
      setFormData({ title: post.title, body: post.body });
    } else {
      setEditingId(null);
      setFormData({ title: "", body: "" });
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    if (editingId) {
      await updatePost(editingId, { ...formData, userId: id });
      setPosts(
        posts.map((p) => (p.id === editingId ? { ...p, ...formData } : p))
      );
    } else {
      const res = await createPost({ ...formData, userId: id });
      setPosts([{ ...res.data, id: Date.now() }, ...posts]);
    }
    setShowModal(false);
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Yakin hapus post ini?")) {
      await deletePost(postId);
      setPosts(posts.filter((p) => p.id !== postId));
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>User {id} - Posts</h1>
        <Button onClick={() => handleShowModal()}>+ Tambah Post</Button>
      </div>

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
              className="me-2"
            >
              Detail Post
            </Button>
            <Button
              variant="outline-warning"
              size="sm"
              className="me-2"
              onClick={() => handleShowModal(post)}
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}

      {/* Modal Form */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Post" : "Tambah Post"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Judul</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Isi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
