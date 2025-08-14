import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/Loading";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="mb-4">Users</h1>
      <Row>
        {users.map((user) => (
          <Col md={4} key={user.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>{user.email}</Card.Text>
                <Button
                  as={Link}
                  to={`/users/${user.id}/posts`}
                  variant="primary"
                  size="sm"
                  className="me-2 mb-2"
                >
                  Lihat Posts
                </Button>
                <Button
                  as={Link}
                  to={`/users/${user.id}/albums`}
                  variant="secondary"
                  size="sm"
                  className="me-2 mb-2"
                >
                  Lihat Albums
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
