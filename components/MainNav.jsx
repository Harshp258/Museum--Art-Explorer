import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { NavDropdown } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate'; 

export default function MainNav() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [isExpanded, setIsExpanded] = useState(false);
  const navStyle = {
    fontFamily: "'Playfair Display', serif", 
    textDecoration: "none",
   
  };

  const router = useRouter();

  const handleSubmit = async (event) => { 
    event.preventDefault();

    const searchField = event.target.elements.searchField.value;

    const queryString = `title=true&q=${searchField}`;
    setSearchHistory(current => [...current, queryString]);
    await addToHistory(queryString); 
    router.push(`/artwork?title=true&q=${searchField}`);

    setIsExpanded(false);
  };

  

  const logout = () => {
    setIsExpanded(false);
    removeToken(); 
    router.push('/login'); 
  };


  const token = readToken();
  const isLoggedIn = !!token;

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" style={{ marginBottom: '0' }} expanded={isExpanded}>
        <Container style={{ marginBottom: '0' }}>
          <Navbar.Brand>
            <Link href="/"  passHref legacyBehavior>
              <Navbar.Brand style={navStyle}>Harsh Patel Art Collection</Navbar.Brand>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded((e) => !e)}/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link style={navStyle} onClick={() => setIsExpanded(false)} active={router.pathname === "/" }>Home</Nav.Link>
              </Link>
              {isLoggedIn && (
                <>
                  <Link href="/search" passHref legacyBehavior>
                    <Nav.Link style={navStyle} onClick={() => setIsExpanded(false)}active={router.pathname === "/search" }>Advanced Search</Nav.Link>
                  </Link>
                  &nbsp;
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col xs="auto">
                        <Form.Control
                          type="text"
                          placeholder="Search"
                          className="mr-sm-2"
                          name="searchField"
                        />
                      </Col>
                      <Col xs="auto">
                        <Button type="submit">Submit</Button>
                      </Col>
                    </Row>
                  </Form>
                  &nbsp;
                </>
              )}
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <NavDropdown title={token.userName || "User Name"} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item style={navStyle} onClick={() => setIsExpanded(false)} active={router.pathname === "/favourites"} >Favourites</NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item style={navStyle} onClick={() => setIsExpanded(false)} active={router.pathname === "/history"} >Search History</NavDropdown.Item>
                  </Link >
                  <NavDropdown.Item passHref legacyBehavior style={navStyle} onClick={logout}>Logout</NavDropdown.Item> 
                </NavDropdown>
              ) : (
                <Nav>
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link  style={navStyle} onClick={() => setIsExpanded(false)} active={router.pathname === "/register"}>Register</Nav.Link>
                  </Link>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link style={navStyle} onClick={() => setIsExpanded(false)} active={router.pathname === "/login"}>Login</Nav.Link>
                  </Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
