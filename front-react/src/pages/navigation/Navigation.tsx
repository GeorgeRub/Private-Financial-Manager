import {Nav, Navbar, NavLink} from "react-bootstrap";
import {useKeycloak} from "@react-keycloak/web";
import LinkButton from "../../elements/navigation/LinkButton.tsx";

const Navigation = () => {
    const {keycloak} = useKeycloak();
    return (
        <Navbar bg="light" expand={"lg"} variant="light" style={{
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem"
        }}>
            <Navbar.Brand>PFM</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <LinkButton href={"/"} name={"Home"}></LinkButton>
                    {keycloak.authenticated && (
                        <LinkButton href={"/about"} name={"About"}></LinkButton>
                    )}
                </Nav>
                {!keycloak.authenticated && (
                    <NavLink
                        type="button"
                        className="text-blue-800"
                        onClick={() => keycloak.login()}
                    >
                        Login
                    </NavLink>
                )}

                {keycloak.authenticated && (
                    <NavLink
                        type="button"
                        className="text-blue-800"
                        onClick={() => keycloak.logout()}
                    >
                        Logout ({keycloak.tokenParsed?.preferred_username})
                    </NavLink>
                )}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;