import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import Navbar1 from './Navbar1';

const Homepage = ({ token }) => {
  const navigate = useNavigate();
  const [adminProfileData, setAdminProfileData] = useState(null);
  const [adminProfileformData, setAdminProfileFormData] = useState({
    name: '',
    gender: '',
    phone_no: '',
    avatar_url: '',
  });

  const fetchAdminProfile = async () => {
    try {
      const { user } = token;
      if (user) {
        const { data, error } = await supabase
          .from('Admin')
          .select('name, gender, phone_no, avatar_url')
          .eq('admin_id', user.id)
          .single();

        if (error) throw error;
        setAdminProfileData(data);
        setAdminProfileFormData(data);
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error.message);
    }
  };

  const handleProfileChange = (e) => {
    setAdminProfileFormData ({ ...adminProfileformData, [e.target.name]: e.target.value });
   };

   const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = token;
      const { error } = await supabase
        .from('Admin')
        .update(adminProfileformData)
        .eq('admin_id', user.id);

      if (error) throw error;
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  const [courseName, setCourseName] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [formData, setFormData] = useState({
    admin_id: '',
    gender: '',
    phone_no: '',
    name: '',
    avatar_url: ''
  });
  //
  const [studentFormData, setStudentFormData] = useState({
    student_id: '', // This will be auto-generated or fetched from user.id
    name: '',
    class: '',
    phone_no: '',
    gender: '',
    avatar_url: '',
    address: '',
    DOB: ''
  });

  const [teacherFormData, setTeacherFormData] = useState({
    teacher_id: '',
    name: '',
    gender: '',
    salary: '',
    phone_no: '',
    avatar_url: ''
  });

  const [adminUUIDs, setAdminUUIDs] = useState([]);
  const [studentUUIDs, setStudentUUIDs] = useState([]);
  const [teacherUUIDs, setTeacherUUIDs] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //
  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    setStudentFormData({ ...studentFormData, [name]: value });
  };

  const handleTeacherInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherFormData({ ...teacherFormData, [name]: value });
  };

  const handleSubmitCourses = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('Courses')
        .insert([{ name: courseName , teacher_id: teacherId }]);
      if (error) {
        throw error;
      }
      console.log('Course added successfully:', data);
      
    } catch (error) {
      console.error('Error adding course:', error.message);
    }
  };

  const addAdminData = async () => {
    try {
      const { user } = token;
      const { data, error } = await supabase.from('Admin').insert({
        admin_id: formData.admin_id,
        gender: formData.gender,
        phone_no: formData.phone_no,
        name: formData.name,
        avatar_url: formData.avatar_url
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error adding admin data:', error.message);
    }
  };
  
  const addStudentData = async () => {
    try {
      const { user } = token;
      const { data, error } = await supabase.from('Student').insert({
        student_id: studentFormData.student_id,
        name: studentFormData.name,
        class: studentFormData.class,
        phone_no: studentFormData.phone_no,
        avatar_url: studentFormData.avatar_url,
        address: studentFormData.address,
        DOB: studentFormData.DOB,
        // gender: studentFormData.gender
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error adding student data:', error.message);
    }
  };

  const addTeacherData = async () => {
    try {
      const { user } = token;
      const { data, error } = await supabase.from('Teacher').insert({
        teacher_id: teacherFormData.teacher_id,
        name: teacherFormData.name,
        gender: teacherFormData.gender,
        salary: teacherFormData.salary,
        phone_no: teacherFormData.phone_no,
        avatar_url: teacherFormData.avatar_url
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error adding teacher data:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAdminData();
    setFormData({
      admin_id: '',
      gender: '',
      phone_no: '',
      name: '',
      avatar_url: ''
    });
  };
  
  const handleSubmitStudent = async (e) => {
    e.preventDefault();
    await addStudentData();
    setStudentFormData({
      student_id: '', // Reset student_id if needed
      name: '',
      class: '',
      phone_no: '',
      gender: '',
      avatar_url: '',
      address: '',
      DOB: ''
    });
  };

  const handleSubmitTeacher = async (e) => {
    e.preventDefault();
    await addTeacherData();
    setTeacherFormData({
      teacher_id: '',
      name: '',
      gender: '',
      salary: '',
      phone_no: '',
      avatar_url: ''
    });
  };

  const fetchUserUUIDsAdmin = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('id').eq('full_name' , 'Admin');

      if (error) {
        throw error;
      }

      if (data) {
        const userUUIDs = data.map(user => user.id);
        setAdminUUIDs(userUUIDs);
      }
    } catch (error) {
      console.error('Error fetching admin UUIDs:', error.message);
    }
  };

  const fetchUserUUIDsStudent = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('id').eq('full_name' , 'Student');

      if (error) {
        throw error;
      }

      if (data) {
        const userUUIDs = data.map(user => user.id);
        setStudentUUIDs(userUUIDs);
      }
    } catch (error) {
      console.error('Error fetching student UUIDs:', error.message);
    }
  };

  const fetchUserUUIDsTeacher = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('id').eq('full_name' , 'Teacher');

      if (error) {
        throw error;
      }

      if (data) {
        const userUUIDs = data.map(user => user.id);
        setTeacherUUIDs(userUUIDs);
      }
    } catch (error) {
      console.error('Error fetching teacher UUIDs:', error.message);
    }
  };

  const [adminData, setAdminData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);

  const fetchAdmin = async () => {
    try {
      const { data, error } = await supabase.from('Admin').select('*');
      if (data) {
        setAdminData(data);
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error fetching admin data:', error.message);
    }
  };

  const fetchStudent = async () => {
    try {
      const { data, error } = await supabase.from('Student').select('*');
      if (data) {
        setStudentData(data);
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error fetching student data:', error.message);
    }
  };

  const fetchTeacher = async () => {
    try {
      const { data, error } = await supabase.from('Teacher').select('*');
      if (data) {
        setTeacherData(data);
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error fetching teacher data:', error.message);
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
    fetchAdminProfile();
    fetchUserUUIDsAdmin();
    fetchUserUUIDsStudent();
    fetchUserUUIDsTeacher();
    fetchAdmin();
    fetchStudent();
    fetchTeacher();
  }, []);

  if (!adminProfileData) return <div>Loading...</div>;

  return (
    <div>
    <Navbar1 />

    <div className="admin-profile-container">
      <h1>Admin Profile</h1>
      <div className="admin-profile-info">
        <img src={adminProfileData.avatar_url} alt="Admin Avatar" className="admin-avatar" />
        <p><strong>Name:</strong> {adminProfileData.name}</p>
        <p><strong>Gender:</strong> {adminProfileData.gender}</p>
        <p><strong>Phone Number:</strong> {adminProfileData.phone_no}</p>
      </div>
      <form onSubmit={handleProfileSubmit} className="admin-profile-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={adminProfileformData.name}
            onChange={handleProfileChange}
            className="profile-input"
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={adminProfileformData.gender}
            onChange={handleProfileChange}
            className="profile-input"
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone_no"
            value={adminProfileformData.phone_no}
            onChange={handleProfileChange}
            className="profile-input"
          />
        </label>
        <label>
          Avatar URL:
          <input
            type="text"
            name="avatar_url"
            value={adminProfileformData.avatar_url}
            onChange={handleProfileChange}
            className="profile-input"
          />
        </label>
        <button type="submit" className="update-button">Update Profile</button>
        <br />
        <button onClick={handleLogout}>Logout</button>
      </form>
    </div>


      <h2>Add Admin</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Admin ID:
          <input
            type="text"
            name="admin_id"
            value={formData.admin_id}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Avatar Link:
          <input
            type="text"
            name="avatar_url"
            value={formData.avatar_url}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Admin Data</button>
      </form>
      

      <div>
        <h3>Admin</h3>
        <ul>
          {adminUUIDs.map((uuid, index) => (
            <li key={index}>{uuid}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Student</h3>
        <ul>
          {studentUUIDs.map((uuid, index) => (
            <li key={index}>{uuid}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Teacher</h3>
        <ul>
          {teacherUUIDs.map((uuid, index) => (
            <li key={index}>{uuid}</li>
          ))}
        </ul>
      </div>
      {/* Form for adding student data */}
      <div>
        <h3>Add Student Data</h3>
        <form onSubmit={handleSubmitStudent}>
          <label>
            Student ID:
            <input
              type="text"
              name="student_id"
              value={studentFormData.student_id}
              onChange={handleStudentInputChange}
            />
          </label>
          <br />
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={studentFormData.name}
              onChange={handleStudentInputChange}
            />
          </label>
          <br />
          <label>
            Class:
            <input
              type="text"
              name="class"
              value={studentFormData.class}
              onChange={handleStudentInputChange}
            />
          </label>
          <br />
          <label>
            Phone Number:
            <input
              type="text"
              name="phone_no"
              value={studentFormData.phone_no}
              onChange={handleStudentInputChange}
            />
          </label>
          <br />
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={studentFormData.gender}
              onChange={handleStudentInputChange}
            />
          </label>
          <br />
          <label>
            Avatar URL:
            <input
              type="text"
              name="avatar_url"
              value={studentFormData.avatar_url}
              onChange={handleStudentInputChange}
            />
          </label>
          <br />
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={studentFormData.address}
              onChange={handleStudentInputChange}
            />
          </label>
          <br />
          <label>
            Date of Birth:
            <input
              type="date"
              name="DOB"
              value={studentFormData.DOB}
              onChange={handleStudentInputChange}
            />
          </label>
          <br />
          <button type="submit">Add Student Data</button>
        </form>
      </div>


       <div>
        <h3>Add Teacher Data</h3>
        <form onSubmit={handleSubmitTeacher}>
        <label>
            Teacher ID:
            <input
              type="text"
              name="teacher_id"
              value={teacherFormData.teacher_id}
              onChange={handleTeacherInputChange}
            />
          </label>
          <br />
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={teacherFormData.name}
              onChange={handleTeacherInputChange}
            />
          </label>
          <br />
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={teacherFormData.gender}
              onChange={handleTeacherInputChange}
            />
          </label>
          <label>
            Avatar_Link:
            <input
              type="text"
              name="avatar_url"
              value={teacherFormData.avatar_url}
              onChange={handleTeacherInputChange}
            />
          </label>
          <br />
          <label>
            Salary:
            <input
              type="number"
              name="salary"
              value={teacherFormData.salary}
              onChange={handleTeacherInputChange}
            />
          </label>
          <br />
          <label>
            Phone Number:
            <input
              type="text"
              name="phone_no"
              value={teacherFormData.phone_no}
              onChange={handleTeacherInputChange}
            />
          </label>
          <br />
          <button type="submit">Add Teacher Data</button>
        </form>
      </div>

      {/* Display fetched admin data */}
<div>
  <h3>Admin</h3>
  <table className="data-table">
    <thead>
      <tr>
        <th>Admin ID</th>
        <th>Gender</th>
        <th>Phone Number</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {adminData.map((admin, index) => (
        <tr key={index}>
          <td>{admin.admin_id}</td>
          <td>{admin.gender}</td>
          <td>{admin.phone_no}</td>
          <td>{admin.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Display fetched student data */}
<div>
  <h3>Student</h3>
  <table className="data-table">
    <thead>
      <tr>
        <th>Student ID</th>
        <th>Name</th>
        <th>Phone Number</th>
        <th>Avatar URL</th>
        <th>Address</th>
        <th>Date of Birth</th>
      </tr>
    </thead>
    <tbody>
      {studentData.map((student, index) => (
        <tr key={index}>
          <td>{student.student_id}</td>
          <td>{student.name}</td>
          <td>{student.phone_no}</td>
          <td>{student.avatar_url}</td>
          <td>{student.address}</td>
          <td>{student.DOB}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Display fetched teacher data */}
<div>
  <h3>Teacher</h3>
  <table className="data-table">
    <thead>
      <tr>
        <th>Teacher ID</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Salary</th>
        <th>Phone Number</th>
      </tr>
    </thead>
    <tbody>
      {teacherData.map((teacher, index) => (
        <tr key={index}>
          <td>{teacher.teacher_id}</td>
          <td>{teacher.name}</td>
          <td>{teacher.gender}</td>
          <td>{teacher.salary}</td>
          <td>{teacher.phone_no}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
{/* Adding courses */}
<div>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmitCourses}>
        <label>
          Course Name:
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </label>
        <label>
          Teacher ID:
          <input
            type="text"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Course</button>
      </form>
    </div>

    </div>
  );
};

export default Homepage;
