import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const UpdateStudentCourse = ({token}) => {
  const [id, setId] = useState('');
  const [marks, setMarks] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to update student course
  const updateStudentCourse = async (id) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('StudentCourse')
        .update({ marks, attendance })
        .eq('id', id);
      if (error) throw error;
      setLoading(false);
      // Redirect to some page after successful update
    //   navigate('/success');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Update Student Course</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateStudentCourse(id);
        }}
      >
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="marks">Marks:</label>
          <input
            type="number"
            id="marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="attendance">Attendance:</label>
          <input
            type="number"
            id="attendance"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default UpdateStudentCourse;
