import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function EditWorkout({ workout, getWorkoutData }) {
  const notyf = new Notyf();

  const [workoutId] = useState(workout._id);
  const [name, setName] = useState(workout.name);
  const [duration, setDuration] = useState(parseInt(workout.duration, 10) || 1);

  const [showEdit, setShowEdit] = useState(false);

  const editOpen = () => {
    setShowEdit(true);
  };

  const editClose = () => {
    setShowEdit(false);
  };

  const editWorkout = (e, workoutId) => {
    e.preventDefault();

    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/workouts/updateWorkout/${workoutId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: name,
          duration: duration + ' mins',
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          notyf.success('Successfully Updated');
          getWorkoutData();
          editClose();
        } else {
          notyf.error('Something went wrong. Please try again');
          getWorkoutData();
          editClose();
        }
      });
  };

  return (
    <>
      <Button
        variant="primary"
        className="px-1 py-0"
        onClick={() => editOpen()}
      >
        <i class="bi bi-pencil-square"></i>
      </Button>

      <Modal show={showEdit} onHide={editClose}>
        <Modal.Header className="bg-primary" closeButton>
          <Modal.Title className="text-center">Edit Workout</Modal.Title>
        </Modal.Header>
        <Form
          className="bg-secondary"
          onSubmit={(e) => editWorkout(e, workoutId)}
        >
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="number"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="1"
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
