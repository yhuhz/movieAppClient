import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function AddWorkout({ getWorkoutData }) {
  const notyf = new Notyf();

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  const [showAdd, setShowAdd] = useState(false);

  const addOpen = () => {
    setShowAdd(true);
  };

  const addClose = () => {
    setShowAdd(false);
  };

  const addWorkout = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/addWorkout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name: name,
        duration: duration + ' mins',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.userId) {
          notyf.success('Workout added successfully');
          getWorkoutData();
          addClose();
          setName('');
          setDuration('');
        } else {
          getWorkoutData();
          notyf.error('Something went wrong. Please try again');
          addClose();
        }
      });
  };

  return (
    <>
      <Button className="mt-3" variant="success" onClick={addOpen}>
        <i className="bi bi-plus-square"></i> New Workout
      </Button>

      <Modal show={showAdd} onHide={addClose}>
        <Modal.Header className="bg-success text-center" closeButton>
          <Modal.Title>Add Workout</Modal.Title>
        </Modal.Header>
        <Form className="bg-secondary" onSubmit={addWorkout}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                placeholder="Walking"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="number"
                required
                value={duration}
                placeholder="Please input minutes"
                onChange={(e) => setDuration(e.target.value)}
                min="1"
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
              disabled={name === '' || duration === '' || duration < 1}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
