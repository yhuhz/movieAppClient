import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function DeleteWorkout({ workout, getWorkoutData }) {
  const notyf = new Notyf();

  const [workoutId] = useState(workout._id);

  const [showDelete, setShowDelete] = useState(false);

  const deleteOpen = () => {
    setShowDelete(true);
  };

  const deleteClose = () => {
    setShowDelete(false);
  };

  const deleteWorkout = (e, workoutId) => {
    e.preventDefault();

    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/workouts/deleteWorkout/${workoutId}`,
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
        if (data.success === true) {
          notyf.success('Workout successfully deleted');
          getWorkoutData();
          deleteClose();
        } else {
          notyf.error('Something went wrong. Please try again');
          getWorkoutData();
          deleteClose();
        }
      });
  };

  return (
    <>
      <Button variant="danger" className="px-1 py-0" onClick={deleteOpen}>
        <i className="bi bi-trash"></i>
      </Button>

      <Modal show={showDelete} onHide={deleteClose}>
        <Modal.Header className="bg-danger" closeButton>
          <Modal.Title className="text-center">Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-secondary">
          <p>
            Are you sure you want to delete this workout? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer className="bg-secondary">
          <Button variant="secondary" onClick={deleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={(e) => deleteWorkout(e, workoutId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
