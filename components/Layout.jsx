import React from "react";
import MainNav from "./MainNav";
import { Container } from 'react-bootstrap';


const layoutStyle = {
  backgroundImage: 'url("https://media.istockphoto.com/id/907456004/photo/abstract-blur-defocus-background-of-art-gallery-museum-or-showroom.jpg?s=612x612&w=0&k=20&c=jvFoWPXMuS2nj0ojCCVTotpG_HZpa7IbSn3Ia2jR1Xk=")',
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
