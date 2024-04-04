
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { registerUser } from '@/lib/authenticate';



export default function Register() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null); 
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(user, password, password2);
      router.push('/login');
    } catch (error) {
      console.error('Registration error:', error.message);
      setError(error.message); 
    }
  };

  return (
    <div className>
      <Card className>
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <Card.Text>Register for an account:</Card.Text>
          
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={user} onChange={(e) => setUser(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
