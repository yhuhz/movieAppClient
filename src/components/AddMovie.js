import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function AddMovie({ getMovieData }) {
  const notyf = new Notyf();

  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(1888);
  const [genre, setGenre] = useState('');

  const [showAdd, setShowAdd] = useState(false);

  const addOpen = () => {
    setShowAdd(true);
  };

  const addClose = () => {
    setShowAdd(false);
  };

  const addMovie = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/addMovie/`, {
      method: 'POST',
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
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          getMovieData();
          notyf.error('Something went wrong. Please try again');
          addClose();
        } else {
          notyf.success('Movie added successfully');
          getMovieData();
          addClose();
          setTitle('');
          setDirector('');
          setDescription('');
          setYear(1888);
          setGenre('');
        }
      });
  };

  return (
    <>
      <Button className="mt-3 w-100" variant="success" onClick={addOpen}>
        <i className="bi bi-plus-square"></i> Add a Movie
      </Button>

      <Modal show={showAdd} onHide={addClose}>
        <Modal.Header className="bg-success text-center" closeButton>
          <Modal.Title>Add Movie</Modal.Title>
        </Modal.Header>
        <Form className="bg-secondary" onSubmit={addMovie}>
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
            <Button variant="secondary" onClick={addClose}>
              Close
            </Button>
            <Button
              variant="success"
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
