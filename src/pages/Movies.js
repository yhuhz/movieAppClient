import { Table, Card } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext, useEffect, useState } from 'react';
import EditWorkout from '../components/EditWorkout';
import AddWorkout from '../components/AddWorkout';
import DeleteWorkout from '../components/DeleteWorkout';
import UpdateWorkoutStatus from '../components/UpdateWorkoutStatus';
import logo from '../assets/FC.png';

export default function Home() {
  const { user } = useContext(UserContext);

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
              data.movies.map((movie) => {
                return (
                  <Card
                    style={{ border: '2px white solid' }}
                    className="rounded bg-dark"
                    key={movie._id}
                  >
                    <Card.Title className="bg-dark">{movie.title}</Card.Title>
                    <Card.Body className="bg-dark">
                      <div>
                        <h5>Director: {movie.director}</h5>
                        <h5>Description: {movie.description}</h5>
                        <h5>Year: {movie.year}</h5>
                        <h5>Genre: {movie.genre}</h5>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })
            );
          } else {
            setMoviesData([]);
          }
        });
    }
  }

  useEffect(() => {
    getMoviesData();
  }, [user]);

  return user.id === null ? (
    <Navigate to="/" />
  ) : (
    <>
      <div className="d-flex justify-content-center mt-5">
        <Card className="p-4 text-center bg-dark">
          <Card.Body>
            <img
              src={logo}
              alt="FC Logo"
              width="200"
              height="auto"
              className="img-fluid"
            />
            <h1>Welcome to FitCheck!</h1>
            <div className="d-flex justify-content-center">
              <h6
                className="text-light text-center py-3"
                style={{ maxWidth: '400px' }}
              >
                Your personal fitness companion, designed to keep you
                accountable, motivated, and crushing those goals.
              </h6>
            </div>
          </Card.Body>
        </Card>
      </div>
      {moviesData}
    </>
  );
}
