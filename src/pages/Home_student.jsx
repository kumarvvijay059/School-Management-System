import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';
import './Home_student.css';

const Home_student = ({ token }) => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [studentCourses, setStudentCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone_no: '',
    address: '',
    avatar_url: '',
    class: '',
  });
  const [courseData, setCourseData] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  const fetchStudentData = async () => {
    try {
      const { data, error } = await supabase
        .from('Student')
        .select('*')
        .eq('student_id', token.user.id)
        .single();

      if (error) {
        throw error;
      }
      setStudentData(data);
      setFormData(data);
    } catch (error) {
      console.error('Error fetching student data:', error.message);
    }
  };

  // const fetchStudentCourses = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('StudentCourse')
  //       .select('*')
  //       .eq('student_id', token.user.id);

  //     if (error) {
  //       throw error;
  //     }
  //     setStudentCourses(data);
  //   } catch (error) {
  //     console.error('Error fetching student courses:', error.message);
  //   }
  // };

  const fetchStudentCourses = async () => {
    try {
      // Fetch student courses from StudentCourse table
      const { data: studentCoursesData, error: studentCoursesError } = await supabase
        .from('StudentCourse')
        .select(' id , course_id, completed , marks , attendance')
        .eq('student_id', token.user.id);

      if (studentCoursesError) {
        throw studentCoursesError;
      }

      // Fetch course names from Courses table
      const { data: courseNamesData, error: courseNamesError } = await supabase
        .from('Courses')
        .select('course_id, name');

      if (courseNamesError) {
        throw courseNamesError;
      }

      // Merge data from both queries based on course_id
      const mergedData = studentCoursesData.map(studentCourse => {
        const courseName = courseNamesData.find(course => course.course_id === studentCourse.course_id);
        return {
          ...studentCourse,
          course_name: courseName ? courseName.name : 'Unknown Course'
        };
      });

      setStudentCourses(mergedData);
    } catch (error) {
      console.error('Error fetching student courses:', error.message);
    }
  };


  const fetchAllCourses = async () => {
    try {
      const { data, error } = await supabase.from('Courses').select('*');

      if (error) {
        throw error;
      }
      setCourseData(data);
    } catch (error) {
      console.error('Error fetching courses:', error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('Student')
        .update({
          name: formData.name,
          phone_no: formData.phone_no,
          address: formData.address,
          avatar_url: formData.avatar_url,
          class: formData.class,
        })
        .eq('student_id', token.user.id)
        .single();

      if (error) {
        throw error;
      }
      setStudentData(data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  const handleAddStudentCourse = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('StudentCourse')
        .insert([
          {
            student_id: token.user.id,
            course_id: selectedCourseId,
            completed: false,
          },
        ]);

      if (error) {
        throw error;
      }
      console.log('Student course added successfully:', data);
      fetchStudentCourses();
    } catch (error) {
      console.error('Error adding student course:', error.message);
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

  useEffect(() => {
    fetchStudentData();
    fetchStudentCourses();
    fetchAllCourses();
  }, [token]);

  return (
    <div className="profile-container">
      {studentData ? (
        <div className="profile">
          <img src={formData.avatar_url} alt="Profile Avatar" className="avatar" />
          <div className="profile-info">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              onChange={handleInputChange}
            />
            Class
            <input
              type="text"
              name="class"
              value={formData.class}
              placeholder="Class"
              onChange={handleInputChange}
            />
            Phone_no
            <input
              type="text"
              name="phone_no"
              value={formData.phone_no}
              placeholder="Phone"
              onChange={handleInputChange}
            />
            Address
            <input
              type="text"
              name="address"
              value={formData.address}
              placeholder="Address"
              onChange={handleInputChange}
            />
            Avatar Link
            <input
              type="text"
              name="avatar_url"
              value={formData.avatar_url}
              placeholder="Avatar URL"
              onChange={handleInputChange}
            />
            <button onClick={handleUpdateProfile}>Update Profile</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <h2>Courses Taken by Student</h2>
      <div className="courses-container">
        {studentCourses.map((studentCourse) => (
          <div key={studentCourse.course_id} className="course-card">
            <h3>Id: {studentCourse.id}</h3>
            <h3>Course Name: {studentCourse.course_name}</h3>
            <h3>Course Id: {studentCourse.course_id}</h3>
            <h3>Marks: {studentCourse.marks}</h3>
            <h3>Attendance: {studentCourse.attendance}</h3>
            <p>Completed: {studentCourse.completed ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
      <h2>Add Course Enrollement</h2>
      <form onSubmit={handleAddStudentCourse}>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          <option value="">Select a Course</option>
          {courseData.map((course) => (
            <option key={course.course_id} value={course.course_id}>
              {course.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Course</button>
      </form>
      <a href="https://buy.stripe.com/test_14k7u85ve0OscxidQQ">Pay fee</a>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home_student;

