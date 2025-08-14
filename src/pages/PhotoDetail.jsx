import { useEffect, useState } from "react";
import { getPhotoDetail } from "../services/api";
import { useParams } from "react-router-dom";
import { Image } from "react-bootstrap";
import LoadingSpinner from "../components/Loading";

export default function PhotoDetail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPhotoDetail(id).then((res) => {
      setPhoto(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="mb-4">{photo.title}</h1>
      <Image src={photo.url} alt={photo.title} fluid className="mb-3" />
      <p>Album ID: {photo.albumId}</p>
    </>
  );
}
