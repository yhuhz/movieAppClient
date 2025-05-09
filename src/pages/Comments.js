import { useState, useEffect, useContext } from 'react';
import { Button, Container, Card, Row, Col, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';
import { useParams } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Comments() {
  const notyf = new Notyf();

  const { user } = useContext(UserContext);

  const { movieId } = useParams();
  const [comment, setComment] = useState('');
  const [movieData, setMovieData] = useState([]);

  const getMovieData = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/getMovie/${movieId}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieData(data);
      });
  };

  useEffect(() => {
    getMovieData();
  }, [user]);

  const addComment = (e, movieId) => {
    e.preventDefault();

    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/movies/addComment/${movieId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          comment: comment,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'comment added successfully') {
          notyf.success('Comment added successfully');
          setComment('');
          getMovieData();
        } else {
          notyf.error('Something went wrong. Please try again');
          getMovieData();
        }
      });
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <Card className="bg-dark" style={{ maxWidth: '400px' }}>
              <Card.Body className="text-center card-body-custom">
                <Card.Title>{movieData.title}</Card.Title>
                <Card.Text>
                  <strong>Director: </strong>
                  {movieData.director}
                </Card.Text>

                <Card.Subtitle className="mt-3 mb-1">
                  Description:
                </Card.Subtitle>
                <Card.Text>{movieData.description}</Card.Text>

                <Card.Text>
                  <strong>Year: </strong>
                  {movieData.year}
                </Card.Text>

                <Card.Text>
                  <strong>Genre: </strong>
                  {movieData.genre}
                </Card.Text>

                <hr className="my-2" />
                <h4>Comments</h4>
                <div
                  className="text-center"
                  style={{ overflow: 'auto', maxHeight: '200px' }}
                >
                  {movieData.comments && movieData.comments.length > 0 ? (
                    movieData.comments.map((comment, index) => (
                      <div key={index} className="mb-3">
                        <strong>{comment.userId}</strong>
                        <p>{comment.comment}</p> <hr />
                      </div>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </div>

                <Form
                  className="bg-dark mt-2"
                  onSubmit={(e) => addComment(e, movieId)}
                >
                  <Form.Group className="d-flex">
                    <Form.Control
                      type="text"
                      required
                      value={comment}
                      placeholder="Anything in mind?"
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={comment === ''}
                    >
                      Submit
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
