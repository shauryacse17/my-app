 import React, { useState } from 'react';

const Dashboard = () => {
    const [theme, setTheme] = useState('light'); 
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Complete project proposal', priority: 'high', completed: false },
        { id: 2, title: 'Review team progress', priority: 'medium', completed: true },
        { id: 3, title: 'Schedule client meeting', priority: 'low', completed: false },
    ]);
    const [showAddTask, setShowAddTask] = useState(false); 
    const [newTask, setNewTask] = useState(''); 
    const [files, setFiles] = useState([]); 

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const toggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleAddTask = () => {
        if (newTask.trim() === '') return;  
        const newTaskItem = {
            id: tasks.length + 1,
            title: newTask,
            priority: 'medium',  
            completed: false,
        };
        setTasks([...tasks, newTaskItem]);  
        setNewTask('');  
        setShowAddTask(false);  
    };

    const handleFileUpload = (e) => {
        const selectedFiles = Array.from(e.target.files); 
        setFiles(selectedFiles); 
    };

    return (
        <div style={theme === 'light' ? styles.lightTheme : styles.darkTheme}>
            <div style={styles.dashboard}>
                
                <div style={styles.header}>
                    <h1>Dashboard</h1>
                    <button onClick={toggleTheme} style={styles.themeButton}>
                        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </button>
                </div>

                
                <div style={styles.taskManagement}>
                    <h2>Task Management</h2>
                    <div style={styles.quickActions}>
                        <button
                            onClick={() => setShowAddTask(!showAddTask)}
                            style={styles.actionButton}
                        >
                            ➕ Add Task
                        </button>
                        <label htmlFor="file-upload" style={styles.actionButton}>
                            📁 Upload Files
                            <input
                                id="file-upload"
                                type="file"
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                            />
                        </label>
                        
                    </div>

                     
                    {showAddTask && (
                        <div style={styles.addTaskContainer}>
                            <input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                placeholder="Enter task title"
                                style={styles.taskInput}
                            />
                            <button onClick={handleAddTask} style={styles.addTaskButton}>
                                Add
                            </button>
                        </div>
                    )}

                     
                    <div style={styles.taskList}>
                        {tasks.map(task => (
                            <div key={task.id} style={styles.taskItem}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTaskCompletion(task.id)}
                                />
                                <span style={{
                                    ...styles.taskTitle,
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    color: task.priority === 'high' ? '#ff4d4d' : task.priority === 'medium' ? '#ffa64d' : '#4dff4d',
                                }}>
                                    {task.title}
                                </span>
                            </div>
                        ))}
                    </div>

                   
                    {files.length > 0 && (
                        <div style={styles.uploadedFiles}>
                            <h3>Uploaded Files:</h3>
                            <ul>
                                {files.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    lightTheme: {
        backgroundColor: '#f4f4f4',
        color: '#333',
        minHeight: '100vh',
        padding: '2rem',
    },
    darkTheme: {
        backgroundColor: '#333',
        color: '#fff',
        minHeight: '100vh',
        padding: '2rem',
    },
    dashboard: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    themeButton: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    overviewPanel: {
        marginBottom: '2rem',
    },
    overviewCards: {
        display: 'flex',
        gap: '1rem',
    },
    card: {
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        flex: 1,
    },
    progressBar: {
        width: '100%',
        height: '10px',
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        margin: '0.5rem 0',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#007bff',
        borderRadius: '5px',
    },
    teamAvatars: {
        display: 'flex',
        gap: '0.5rem',
    },
    taskManagement: {
        marginBottom: '2rem',
    },
    quickActions: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
    },
    actionButton: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    addTaskContainer: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
    },
    taskInput: {
        flex: 1,
        padding: '0.5rem',
        fontSize: '1rem',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },
    addTaskButton: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    taskList: {
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    taskItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.5rem',
    },
    taskTitle: {
        marginLeft: '0.5rem',
    },
    uploadedFiles: {
        marginTop: '1rem',
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};

export default Dashboard;