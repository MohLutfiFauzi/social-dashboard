import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function NavbarMenu() {
  return (
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand as={Link} to={"/"} className="text-light">
          Social Dashboard
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
