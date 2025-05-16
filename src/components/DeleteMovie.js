import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function DeleteMovie({ movie, getMovieData }) {
  const notyf = new Notyf();

  const [movieId] = useState(movie._id);

  const [showDelete, setShowDelete] = useState(false);

  const deleteOpen = () => {
    setShowDelete(true);
  };

  const deleteClose = () => {
    setShowDelete(false);
  };

  const deleteMovie = (e, movieId) => {
    e.preventDefault();

    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/movies/deleteMovie/${movieId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notyf.error('Something went wrong. Please try again');
          getMovieData();
          deleteClose();
        } else {
          notyf.success(data.message);
          getMovieData();
          deleteClose();
        }
      });
  };

  return (
    <>
      <Button variant="danger" className="w-100" onClick={deleteOpen}>
        <i className="bi bi-trash"></i>
      </Button>

      <Modal show={showDelete} onHide={deleteClose}>
        <Modal.Header className="bg-danger" closeButton>
          <Modal.Title className="text-center">Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-secondary">
          <p>
            Are you sure you want to delete this movie? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer className="bg-secondary">
          <Button variant="secondary" onClick={deleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={(e) => deleteMovie(e, movieId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
