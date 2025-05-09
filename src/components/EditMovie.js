import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function EditMovie({ movie, getMovieData }) {
  const notyf = new Notyf();

  const [movieId] = useState(movie._id);
  const [title, setTitle] = useState(movie.title);
  const [director, setDirector] = useState(movie.director);
  const [description, setDescription] = useState(movie.description);
  const [year, setYear] = useState(parseInt(movie.year, 10) || 1888);
  const [genre, setGenre] = useState(movie.genre);

  const [showEdit, setShowEdit] = useState(false);

  const editOpen = () => {
    setShowEdit(true);
  };

  const editClose = () => {
    setShowEdit(false);
  };

  const editMovie = (e, movieId) => {
    e.preventDefault();

    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/movies/updateMovie/${movieId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title: title,
          director: director,
          description: description,
          year: year,
          genre: genre,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Movie updated successfully') {
          notyf.success(data.message);
          getMovieData();
          editClose();
        } else {
          notyf.error('Something went wrong. Please try again');
          getMovieData();
          editClose();
        }
      });
  };

  return (
    <>
      <Button variant="primary" className="w-100" onClick={() => editOpen()}>
        <i className="bi bi-pencil-square"></i> Edit
      </Button>

      <Modal show={showEdit} onHide={editClose}>
        <Modal.Header className="bg-primary" closeButton>
          <Modal.Title className="text-center">Edit Movie</Modal.Title>
        </Modal.Header>
        <Form className="bg-secondary" onSubmit={(e) => editMovie(e, movieId)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                required
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                min="1"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                required
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={editClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={
                title === '' ||
                director === '' ||
                description === '' ||
                year === '' ||
                year < 1888 ||
                genre === ''
              }
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
