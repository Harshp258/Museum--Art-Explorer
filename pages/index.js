/*********************************************************************************
*  WEB422 – Assignment 5
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Harsh Patel Student ID: 114085228 Date: 19/03/2024
*
********************************************************************************/
import { Row, Col, Image } from 'react-bootstrap';

export default function Home() {
  const containerStyle = {
    background: 'rgba(169, 169, 169, 0.5)', 
    padding: '20px', 
    borderRadius: '10px', 
  };

  return (
    <Row className="mt-5">
      <Col md={6}>
        <div style={containerStyle}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
            alt="Metropolitan Museum of Art"
            fluid
            rounded
          />
        </div>
      </Col>
      <Col md={6}>
        <div style={containerStyle}>
          <p style={{ color: 'black', fontWeight: 'bold' }}>
            The Metropolitan Museum of Art is one of the world&apos;s largest and finest art museums.
            It is located on the eastern edge of Central Park in New York City.
            The Met&apos;s mission is to collect, preserve, study, exhibit, and encourage appreciation for works of art
            that collectively represent the broad spectrum of human achievement and creativity.
          </p>
          <p style={{ color: 'black', fontWeight: 'bold' }}>
            For more information, visit the Wikipedia entry:{' '}
            <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer" style={{ color: 'blue' }}>
              Metropolitan Museum of Art
            </a>
          </p>
        </div>
      </Col>
    </Row>
  );
}
