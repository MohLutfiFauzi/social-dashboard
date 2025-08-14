import { useEffect, useState } from "react";
import { getUserAlbums } from "../services/api";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import LoadingSpinner from "../components/Loading";

export default function Albums() {
  const { id } = useParams();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserAlbums(id).then((res) => {
      setAlbums(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="mb-4">User {id} - Albums</h1>
      {albums.map((album) => (
        <Card key={album.id} className="mb-3">
          <Card.Body>
            <Card.Title>{album.title}</Card.Title>
            <Button
              as={Link}
              to={`/albums/${album.id}/photos`}
              variant="outline-secondary"
              size="sm"
            >
              Lihat Foto
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
