import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function UpdateWorkoutStatus({ workout, getWorkoutData }) {
  const notyf = new Notyf();

  const [workoutId] = useState(workout._id);
  const [status, setStatus] = useState(
    workout.status === 'pending' ? false : true
  );

  function completeWorkout() {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/workouts/completeWorkoutStatus/${workoutId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          notyf.success('Workout status updated successfully');
          getWorkoutData();
          setStatus(true);
        } else {
          notyf.error('Something went wrong. Please try again');
          getWorkoutData();
        }
      });
  }

  return (
    <>
      <Button
        variant={status ? 'secondary' : 'warning'}
        className="px-1 py-0"
        onClick={() => {
          completeWorkout();
        }}
        disabled={status}
      >
        <i class="bi bi-check-lg"></i>
      </Button>
    </>
  );
}
