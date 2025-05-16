import { Card } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext, useEffect, useState } from 'react';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

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
            setMoviesData(data.movies);
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
      {user.isAdmin ? (
        <AdminView moviesData={moviesData} getMoviesData={getMoviesData} />
      ) : (
        <UserView moviesData={moviesData} />
      )}
    </div>
  );
}
