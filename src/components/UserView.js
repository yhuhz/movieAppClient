import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function UserView({ moviesData }) {
  return (
    <>
      <div className="mb-5">
        <div className="d-flex justify-content-center mt-5">
          <Card className="p-4 text-center bg-dark">
            <Card.Body>
              <h1>Welcome to Yuppy!</h1>
              <div className="d-flex justify-content-center">
                <h6
                  className="text-light text-center py-3"
                  style={{ maxWidth: '400px' }}
                >
                  Let's find your favorite movies!
                </h6>
              </div>
            </Card.Body>
          </Card>
        </div>
        <hr className="my-3" />
        <Row className="g-4">
          {moviesData.length > 0 ? (
            moviesData.map((movie) => (
              <Col md={6} key={movie._id}>
                <Card
                  style={{
                    border: '2px white solid',
                    maxWidth: '100%',
                  }}
                  className="rounded bg-dark p-5"
                >
                  <Card.Title>
                    <h2 className="bg-dark text-center">{movie.title}</h2>
                  </Card.Title>
                  <Card.Body className="card-body-custom bg-dark">
                    <div style={{ height: '250px', overflow: 'auto' }}>
                      <p>
                        <strong>Director:</strong> {movie.director}
                      </p>
                      <p>
                        <strong>Description:</strong> {movie.description}
                      </p>
                      <p>
                        <strong>Year:</strong> {movie.year}
                      </p>
                      <p>
                        <strong>Genre:</strong> {movie.genre}
                      </p>
                    </div>
                    <div className="text-center mb-2">
                      <Link
                        to={`/comments/${movie._id}`}
                        className="btn btn-primary"
                      >
                        View Movie
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <h2 className="text-center">No movies found</h2>
          )}
        </Row>
      </div>
    </>
  );
}
