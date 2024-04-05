import { useRouter } from 'next/router';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '@/lib/userData'; 

export default function AdvancedSearch() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitForm = async (data) => { 
    let queryString = "searchBy=true";

    if (data.geoLocation) {
      queryString += `&geoLocation=${data.geoLocation}`;
    }

    if (data.medium) {
      queryString += `&medium=${data.medium}`;
    }

    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${data.q}`;

    await addToHistory(queryString); 

    setSearchHistory(current => [...current, queryString]);

    router.push(`/artwork?${queryString}`);
  };

  return (
    <>
    <Container>
    <Row className="justify-content-md-center">
      <Col md={6}>
        <Form onSubmit={handleSubmit(submitForm)}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Search By:</Form.Label>
            <Form.Control {...register("searchBy")} as="select" defaultValue="Title" className="border-dark" style={{ border: '1px solid black' }}>
              <option value="Title">Title</option>
              <option value="Tags">Tags</option>
              <option value="ArtistsOrCulture">Artists or Culture</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Geo Location:</Form.Label>
            <Form.Control {...register("geoLocation")} type="text" placeholder="Case Sensitive String (e.g., Europe|France|Paris)" className="border-dark" style={{ border: '1px solid black' }} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Medium:</Form.Label>
            <Form.Control {...register("medium")} type="text" placeholder="Case Sensitive String (e.g., Ceramics|Furniture|Paintings)" className="border-dark" style={{ border: '1px solid black' }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check {...register("isOnView")} type="checkbox"  label="Is On View"  />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check {...register("isHighlight")} type="checkbox" label="Is Highlight" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Any Queries:</Form.Label>
            <Form.Control {...register("q", { required: true })} type="text" placeholder="Your Question" className={`form-control border-dark ${errors.q && 'is-invalid'}`} style={{ border: '1px solid black' }}/>
            {errors.q && <div className="invalid-feedback">This field is required</div>}
          </Form.Group>

          <Button type="submit">Submit</Button>
        </Form>
      </Col>
    </Row>
    </Container>
    </>
  );
}
