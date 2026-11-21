import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

function Menu() {
    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Gestion Academica</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to='/AlumnosAxios'>Alumnos (Axios)</Nav.Link>
                    <Nav.Link as={Link} to='/AlumnosAlova'>Alumnos (Alova)</Nav.Link>
                    <Nav.Link as={Link} to='/Cursos'>Consulta de Cursos</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Menu