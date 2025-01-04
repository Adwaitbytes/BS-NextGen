import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [userProfile, setUserProfile] = useState(null);

  // Study Groups State
  const [studyGroups, setStudyGroups] = useState([
    {
      id: 1,
      name: 'Mathematics Study Group',
      subject: 'Mathematics',
      members: ['John', 'Alice', 'Bob'],
      schedule: 'Monday, Wednesday 4:00 PM',
    },
    {
      id: 2,
      name: 'Physics Study Group',
      subject: 'Physics',
      members: ['Sarah', 'Mike', 'Emma'],
      schedule: 'Tuesday, Thursday 3:00 PM',
    },
    {
      id: 3,
      name: 'Computer Science Study Group',
      subject: 'Computer Science',
      members: ['David', 'Lisa', 'Tom'],
      schedule: 'Wednesday, Friday 5:00 PM',
    },
  ]);

  // Assignments State
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Mathematics Assignment 1',
      subject: 'Mathematics',
      deadline: '2025-01-10',
      description: 'Complete exercises 1-10',
      completed: false,
      progress: 30,
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      subject: 'Physics',
      deadline: '2025-01-15',
      description: 'Write lab report for Experiment 3',
      completed: false,
      progress: 60,
    },
  ]);

  // Schedule State
  const [schedule, setSchedule] = useState([
    {
      id: 1,
      subject: 'Mathematics',
      day: 'Saturday',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      location: 'Room 101',
      professor: 'Dr. Smith'
    },
    {
      id: 2,
      subject: 'Physics',
      day: 'Saturday',
      startTime: '11:00 AM',
      endTime: '12:30 PM',
      location: 'Lab 204',
      professor: 'Dr. Johnson'
    },
    {
      id: 3,
      subject: 'Computer Science',
      day: 'Saturday',
      startTime: '02:00 PM',
      endTime: '03:30 PM',
      location: 'Lab 301',
      professor: 'Dr. Wilson'
    }
  ]);

  // Learning Resources State
  const [learningResources, setLearningResources] = useState([
    {
      id: 1,
      title: 'Introduction to Python Programming',
      description: 'Learn Python basics with hands-on examples',
      category: 'Programming',
      url: 'https://example.com/python-course',
      author: 'John Doe',
      rating: 4.5,
      thumbnail: '/python-thumb.jpg',
      tags: ['Python', 'Programming', 'Beginner']
    },
    {
      id: 2,
      title: 'Data Structures and Algorithms',
      description: 'Master fundamental data structures and algorithms',
      category: 'Computer Science',
      url: 'https://example.com/dsa-course',
      author: 'Jane Smith',
      rating: 4.8,
      thumbnail: '/dsa-thumb.jpg',
      tags: ['DSA', 'Algorithms', 'Programming']
    },
    {
      id: 3,
      title: 'Linear Algebra Essentials',
      description: 'Core concepts of linear algebra explained',
      category: 'Mathematics',
      url: 'https://example.com/linear-algebra',
      author: 'Prof. Williams',
      rating: 4.6,
      thumbnail: '/math-thumb.jpg',
      tags: ['Mathematics', 'Linear Algebra']
    }
  ]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsAuthenticated(true);
      setUserProfile({
        id: 1,
        name: credentials.email.split('@')[0],
        email: credentials.email,
        role: 'student'
      });
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    setSidebarOpen(false);
    navigate('/login');
  };

  const updateProfile = (newProfile) => {
    setUserProfile(newProfile);
  };

  const updateSchedule = (newSchedule) => {
    setSchedule(newSchedule);
  };

  const updateAssignments = (newAssignments) => {
    setAssignments(newAssignments);
  };

  const updateStudyGroups = (newStudyGroups) => {
    setStudyGroups(newStudyGroups);
  };

  const updateLearningResources = (newResources) => {
    setLearningResources(newResources);
  };

  const addClassToSchedule = (newClass) => {
    setSchedule(prev => [...prev, newClass]);
  };

  const removeClassFromSchedule = (classToRemove) => {
    setSchedule(prev => prev.filter(cls => 
      !(cls.day === classToRemove.day && cls.startTime === classToRemove.startTime)
    ));
  };

  const editClassInSchedule = (oldClass, updatedClass) => {
    setSchedule(prev => prev.map(cls =>
      (cls.day === oldClass.day && cls.startTime === oldClass.startTime)
        ? updatedClass
        : cls
    ));
  };

  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    localStorage.setItem('schedule', JSON.stringify(schedule));
    localStorage.setItem('assignments', JSON.stringify(assignments));
    localStorage.setItem('learningResources', JSON.stringify(learningResources));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [darkMode, schedule, assignments, learningResources, userProfile]);

  // Theme functions
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Sidebar functions
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    // Theme
    darkMode,
    toggleDarkMode,

    // Auth
    isAuthenticated,
    userProfile,
    updateProfile,
    login,
    logout,
    loading,
    error,
    clearError,

    // Study Groups
    studyGroups,
    updateStudyGroups,

    // Assignments
    assignments,
    updateAssignments,

    // Schedule
    schedule,
    updateSchedule,
    addClassToSchedule,
    removeClassFromSchedule,
    editClassInSchedule,

    // Learning Resources
    learningResources,
    updateLearningResources,

    // Sidebar
    sidebarOpen,
    toggleSidebar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
