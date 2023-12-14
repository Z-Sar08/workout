import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useNavigate } from 'react-router-dom';


import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    // Show confirmation dialog before proceeding with deletion
    if (window.confirm('Are you sure you want to delete this workout?')) {
      deleteWorkout();
    }
  };

  const deleteWorkout = async () => {
    try {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: 'DELETE',
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'DELETE_WORKOUT', payload: json });
      }
    } catch (error) {
      console.error('Error during workout deletion:', error.message);
    }
  };


  const handleUpdateClick = async () => {
    // Extract data from workout
    const { title, type, reps, _id: id } = workout;

    const updatedWorkout = { title, type, reps };

    try {
      const response = await fetch(`/api/workouts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedWorkout),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (response.ok) {
        // Redirect to the homepage after updating
        navigate(`/workouts/${id}`);// Use history.push to navigate to a different route
        
      } else {
        console.error('Failed to update workout:', json.error);
      }
    } catch (error) {
      console.error('Error during workout update:', error.message);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Type of Exercise: </strong>{workout.type}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleUpdateClick} style={{ marginRight: '50px' }}>Update</span>
      <span className="material-symbols-outlined" onClick={handleDeleteClick}>Delete</span>
    </div>
  );
};

export default WorkoutDetails;
