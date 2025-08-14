import { useEffect, useState } from "react";
import {
  getPostDetail,
  getPostComments,
  createComment,
  updateComment,
  deleteComment,
} from "../services/api";
import { useParams } from "react-router-dom";
import { Card, Button, Modal, Form } from "react-bootstrap";
import LoadingSpinner from "../components/Loading";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk modal
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    body: "",
  });

  useEffect(() => {
    Promise.all([getPostDetail(id), getPostComments(id)]).then(
      ([postRes, commentsRes]) => {
        setPost(postRes.data);
        setComments(commentsRes.data);
        setLoading(false);
      }
    );
  }, [id]);

  const handleShowModal = (comment = null) => {
    if (comment) {
      setEditingId(comment.id);
      setFormData({
        name: comment.name,
        email: comment.email,
        body: comment.body,
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", email: "", body: "" });
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    if (editingId) {
      await updateComment(editingId, { ...formData, postId: id });
      setComments(
        comments.map((c) => (c.id === editingId ? { ...c, ...formData } : c))
      );
    } else {
      const res = await createComment({ ...formData, postId: id });
      setComments([{ ...res.data, id: Date.now() }, ...comments]);
    }
    setShowModal(false);
  };

  const handleDelete = async (commentId) => {
    if (window.confirm("Yakin hapus komentar ini?")) {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="mb-3">{post.title}</h1>
      <p>{post.body}</p>

      <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
        <h3>Komentar</h3>
        <Button onClick={() => handleShowModal()}>+ Tambah Komentar</Button>
      </div>

      {comments.map((comment) => (
        <Card key={comment.id} className="mb-3">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              {comment.name} ({comment.email})
            </Card.Subtitle>
            <Card.Text>{comment.body}</Card.Text>
            <Button
              variant="warning"
              size="sm"
              className="me-2"
              onClick={() => handleShowModal(comment)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(comment.id)}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}

      {/* Modal Form */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Edit Komentar" : "Tambah Komentar"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Komentar</Form.Label>
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
