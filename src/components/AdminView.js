import { Card, Table } from 'react-bootstrap';
import EditMovie from './EditMovie';
import DeleteMovie from './DeleteMovie';
import AddMovie from './AddMovie';

export default function UserView({ moviesData, getMoviesData }) {
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
              <AddMovie getMovieData={getMoviesData} />
            </Card.Body>
          </Card>
        </div>
        <hr className="my-3" />
        {moviesData.length > 0 ? (
          <Table striped bordered hover variant="dark" size="sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Director</th>
                <th>Description</th>
                <th>Year</th>
                <th>Genre</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {moviesData.map((movie) => {
                return (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.director}</td>
                    <td>{movie.description}</td>
                    <td>{movie.year}</td>
                    <td>{movie.genre}</td>
                    <td>
                      <EditMovie movie={movie} getMovieData={getMoviesData} />
                    </td>
                    <td>
                      <DeleteMovie movie={movie} getMovieData={getMoviesData} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <h2 className="text-center">No movies found</h2>
        )}
      </div>
    </>
  );
}
