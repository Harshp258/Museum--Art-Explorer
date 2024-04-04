
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';

const placeholderImageUrl = 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';

export default function ArtworkCard({ objectID }) {
  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.');
    }
    return res.json();
  };

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const { primaryImageSmall, title, objectDate, classification, medium } = data;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={primaryImageSmall || placeholderImageUrl} />
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          Object Date: {objectDate || 'N/A'} <br />
          Classification: {classification || 'N/A'} <br />
          Medium: {medium || 'N/A'}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">{objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
