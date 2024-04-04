import React, { useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { favouritesAtom  } from '../store';
import { addToFavourites , removeFromFavourites } from '@/lib/userData';

const placeholderImageUrl = 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';

export default function ArtworkCardDetail({ objectID }) {
  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.');
    }
    return res.json();
  };

  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null,
    fetcher
  );

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

  const favouritesClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
    } else {
      setFavouritesList(await addToFavourites(objectID));
    }
  };

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {
    primaryImage,
    medium,
    artistDisplayName,
    creditLine,
    dimensions,
    artistWikidata_URL,
  } = data;

  return (
    <Card>
      <Row className="g-0">
        {primaryImage && (
          <Col md={4}>
            <Card.Img src={primaryImage || placeholderImageUrl} alt="Artwork Image" />
          </Col>
        )}
        <Col md={8}>
          <Card.Body>
            <Card.Text>
              <strong>Medium:</strong> {medium || 'N/A'} <br />
              <br />
              {artistDisplayName && (
                <>
                  <strong>Artist:</strong>{' '}
                  <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                    wiki
                  </a>
                  <br />
                </>
              )}
              <strong>Credit Line:</strong> {creditLine || 'N/A'} <br />
              <strong>Dimensions:</strong> {dimensions || 'N/A'} <br />
            </Card.Text>
            <Button
              variant={showAdded ? 'primary' : 'outline-primary'}
              onClick={favouritesClicked}
            >
              {showAdded ? '+ Favourite (added)' : '+ Favourite'}
            </Button>
            <br />
            <br />

            <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
              <a>
                <strong>View Artwork {objectID}</strong>
              </a>
             </Link>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
