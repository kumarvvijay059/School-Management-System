import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';
import './Home_teacher.css';

const Home_teacher = ({ token }) => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [marks, setMarks] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [error, setError] = useState(null);

  // Function to update student course
  const updateStudentCourse = async () => {
    try {
      const { data, error } = await supabase
        .from('StudentCourse')
        .update({ marks, attendance })
        .eq('id', id);
      if (error) throw error;
      setError(null); 
      console.log('Student course updated successfully');
    } catch (error) {
      setError(error.message);
      console.error('Error updating student course:', error.message);
    }
  };

  const [teacherData, setTeacherData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    phone_no: '',
    avatar_url: '',
    salary: 0,
  });

  const [courses, setCourses] = useState([]);


  useEffect(() => {
    fetchTeacherProfile();
    fetchTeacherCourses();
  }, []);

  const fetchTeacherProfile = async () => {
    try {
      if (token && token.user) {
        const { data, error } = await supabase
          .from('Teacher')
          .select('name, gender, phone_no, avatar_url, salary')
          .eq('teacher_id', token.user.id)
          .single();

        if (error) throw error;
        setTeacherData(data);
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching teacher profile:', error.message);
    }
  };

  const fetchTeacherCourses = async () => {
    try {
      if (token && token.user) {
        const { data, error } = await supabase
          .from('Courses')
          .select('course_id, name')
          .eq('teacher_id', token.user.id);

        if (error) throw error;
        setCourses(data || []);
      }
    } catch (error) {
      console.error('Error fetching teacher courses:', error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (token && token.user) {
        const { error } = await supabase
          .from('Teacher')
          .update(formData)
          .eq('teacher_id', token.user.id);

        if (error) throw error;
        console.log('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  if (!teacherData) return <div>Loading...</div>;

  return (
    <div>
      <div className="teacher-profile-container">
        <h1>Teacher Profile</h1>
        <div className="teacher-profile-info">
          <img src={teacherData.avatar_url} alt="Teacher Avatar" className="teacher-avatar" />
          <p><strong>Name:</strong> {teacherData.name}</p>
          <p><strong>Gender:</strong> {teacherData.gender}</p>
          <p><strong>Phone Number:</strong> {teacherData.phone_no}</p>
          <p><strong>Salary:</strong> ${teacherData.salary}</p>
        </div>
        <form onSubmit={handleSubmit} className="teacher-profile-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="profile-input"
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="profile-input"
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              className="profile-input"
            />
          </label>
          <label>
            Salary:
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="profile-input"
            />
          </label>
          <label>
            Avatar URL:
            <input
              type="text"
              name="avatar_url"
              value={formData.avatar_url}
              onChange={handleChange}
              className="profile-input"
            />
          </label>
          <button type="submit" className="update-button">Update Profile</button>
        </form>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <div className="courses-container">
        <h2>Courses Taught</h2>
        <div className="course-cards">
          {courses.map(course => (
            <div key={course.course_id} className="course-card">
              <h3>{course.name}</h3>
              {/* Add more details about the course if needed */}
            </div>
          ))}
        </div>
      </div>
      <div>
      <h2>Update Student Course</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateStudentCourse();
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
        <button type="submit"> Update </button>
        {error && <div>{error}</div>}
      </form>
    </div>
    </div>
  );
};

export default Home_teacher;




