import { Card, Row, Col } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext, useEffect, useState } from 'react';
import EditMovie from '../components/EditMovie';
import DeleteMovie from '../components/DeleteMovie';
import AddMovie from '../components/AddMovie';
import Comments from './Comments';

export default function Home() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const [moviesData, setMoviesData] = useState([]);

  function getMoviesData() {
    if (user.id !== null) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/getMovies`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.movies)) {
            setMoviesData(
              <Row className="g-4">
                {data.movies.map((movie) => (
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
                          <Link to={`/comments/${movie._id}`}>
                            View Comments
                          </Link>
                        </div>

                        {user.isAdmin ? (
                          <div className="d-md-flex flexbox gap-1 justify-content-center">
                            <EditMovie
                              movie={movie}
                              getMovieData={getMoviesData}
                            />

                            <DeleteMovie
                              movie={movie}
                              getMovieData={getMoviesData}
                            />
                          </div>
                        ) : (
                          ''
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            );
          } else {
            setMoviesData([]);
          }
        })
        .finally(setIsLoading(false));
    }
  }

  useEffect(() => {
    getMoviesData();
  }, [user]);

  return isLoading ? (
    <div className="d-flex justify-content-center mt-5">
      <Card className="p-4 text-center bg-dark">
        <Card.Body>
          <h1>Welcome to Yuppy!</h1>
          <div className="d-flex justify-content-center">
            <h6
              className="text-light text-center py-3"
              style={{ maxWidth: '400px' }}
            >
              Loading Movies
            </h6>
          </div>
        </Card.Body>
      </Card>
    </div>
  ) : user.id === null ? (
    <Navigate to="/" />
  ) : (
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
            {user.isAdmin ? <AddMovie getMovieData={getMoviesData} /> : ''}
          </Card.Body>
        </Card>
      </div>

      <hr className="my-3" />
      {moviesData}
    </div>
  );
}
