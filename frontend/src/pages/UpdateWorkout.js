import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [reps, setReps] = useState('');

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(`/api/workouts/${id}`);
        const json = await response.json();

        if (response.ok) {
          setTitle(json.title);
          setType(json.type);
          setReps(json.reps);
        } else {
          console.error('Failed to fetch workout data:', json.error);
        }
      } catch (error) {
        console.error('Error during workout data fetching:', error.message);
      }
    };

    fetchWorkout();
  }, [id]);

  const handleUpdate = async () => {
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
        // Redirect to the workout details page or home page after updating
        
        navigate(`/`); // Adjust the path based on your route setup
        
      } else {
        console.error('Failed to update workout:', json.error);
      }
    } catch (error) {
      console.error('Error during workout update:', error.message);
    }
  };

  return (
    <div className="update-workout">
      <h3>Update Workout</h3>
      <form onSubmit={handleUpdate}>
        <label>Exercise Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Type:</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <label>Number of Reps:</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

        <button type="submit">Update Workout</button>
      </form>
    </div>
  );
};

export default UpdateWorkout;
