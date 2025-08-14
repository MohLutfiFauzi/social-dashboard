import { useEffect, useState } from "react";
import { getAlbumPhotos } from "../services/api";
import { useParams, Link } from "react-router-dom";
import { Card, Col, Row, Button } from "react-bootstrap";
import LoadingSpinner from "../components/Loading";

export default function Photos() {
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlbumPhotos(id).then((res) => {
      setPhotos(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="mb-4">Album {id} - Photos</h1>
      <Row>
        {photos.map((photo) => (
          <Col md={3} key={photo.id} className="mb-3">
            <Card>
              <Card.Img
                variant="top"
                alt={photo.title}
                src={photo.thumbnailUrl}
              />
              <Card.Body>
                <Card.Title className="fs-6">{photo.title}</Card.Title>
                <Button
                  as={Link}
                  to={`/photos/${photo.id}`}
                  variant="outline-primary"
                  size="sm"
                >
                  Detail Foto
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
