import React from "react";
import MainNav from "./MainNav";
import { Container } from 'react-bootstrap';


const layoutStyle = {
  backgroundImage: 'url("https://png.pngtree.com/background/20231030/original/pngtree-minimalist-space-with-white-frame-a-modern-art-exhibit-3d-render-picture-image_5783261.jpg")',
 
  backgroundSize: '100% 100%',
  backgroundPosition: 'center',
  minHeight: '100vh',
  margin: '0',
};

export default function Layout(props) {
  return (
    <>
      <MainNav />
      <div style={layoutStyle}>
        <Container>
          {props.children}
        </Container>
      </div>
    </>
  );
}
