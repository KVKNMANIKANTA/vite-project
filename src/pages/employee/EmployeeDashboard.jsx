import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
// import { employeeTasks } from '../../data/mockData'; // Removed mock data import
import { useStaff } from '../../context/StaffContext'; // Import StaffContext
import { CheckCircle, Clock, Coffee, LogOut, Sun, Moon, Sunset, Sunrise, Calendar, AlertCircle, Users, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmployeeDashboard = () => {
    const { user, logout } = useAuth();
    const { employees, tasks, leaveRequests, updateEmployeeStatus, updateTaskStatus, submitLeaveRequest } = useStaff(); // Use Context
    
    // Get current employee status from context
    // In a real app, user.id would be the employee ID.
    const currentEmployeeId = user?.id || 1; 
    const employeeData = employees.find(e => e.id === currentEmployeeId);
    const status = employeeData?.status || 'Active';
    const shift = employeeData?.shift || 'Morning';

    const [showLeaveForm, setShowLeaveForm] = useState(false);
    const [leaveRequest, setLeaveRequest] = useState({ type: 'Sick Leave', date: '', reason: '' });

    // Filter tasks for this employee
    const myTasks = tasks.filter(t => t.assignedTo === currentEmployeeId);
    
    // Filter leave requests for this employee
    const myLeaveRequests = leaveRequests.filter(r => r.employeeId === currentEmployeeId);

    const handleStatusChange = (newStatus) => {
        updateEmployeeStatus(currentEmployeeId, newStatus);
    };

    const toggleTaskStatus = (taskId) => {
        const task = myTasks.find(t => t.id === taskId);
        if (task) {
            const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
            updateTaskStatus(taskId, newStatus);
        }
    };

    const handleLeaveSubmit = (e) => {
        e.preventDefault();
        submitLeaveRequest({
            employeeId: currentEmployeeId,
            employeeName: user?.name,
            ...leaveRequest
        });
        setLeaveRequest({ type: 'Sick Leave', date: '', reason: '' });
        setShowLeaveForm(false);
        // Optional: Show success message/toast
    };

    const getStatusColor = (currentStatus) => {
        switch (currentStatus) {
            case 'Active': return '#4ade80';
            case 'Break': return '#facc15';
            case 'Leave': return '#f87171';
            default: return '#94a3b8';
        }
    };

    const getShiftIcon = (currentShift) => {
        switch (currentShift) {
            case 'Morning': return <Sunrise size={20} color="#fbbf24" />;
            case 'Afternoon': return <Sun size={20} color="#f59e0b" />;
            case 'Evening': return <Sunset size={20} color="#f97316" />;
            case 'Night': return <Moon size={20} color="#6366f1" />;
            default: return <Clock size={20} color="#94a3b8" />;
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', paddingTop: '80px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            {/* Sidebar / Status Panel */}
            <div style={{ 
                width: '300px', 
                background: "linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.4)), url('/images/adminn.png') no-repeat center center / cover", 
                color: 'white', 
                padding: '30px', 
                display: 'flex', 
                flexDirection: 'column',
                borderRight: '1px solid rgba(255,255,255,0.1)',
                fontFamily: "'Playfair Display', serif"
            }}>
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '10px', textShadow: '2px 2px 4px black' }}>
                        <Users color="#4ade80" /> Hello, {user?.name}
                    </h2>
                    <p style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 'bold', textShadow: '1px 1px 2px black' }}>Staff ID: #EMP-{currentEmployeeId.toString().padStart(3, '0')}</p>

                </div>

                {/* Status Toggle */}
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', textShadow: '2px 2px 4px black' }}>Current Status</h3>
                    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                        <StatusButton active={status === 'Active'} onClick={() => handleStatusChange('Active')} icon={<Sun size={18} />} color="#4ade80" label="Active / Working" />
                        <StatusButton active={status === 'Break'} onClick={() => handleStatusChange('Break')} icon={<Coffee size={18} />} color="#facc15" label="On Break" />
                        <StatusButton active={status === 'Leave'} onClick={() => handleStatusChange('Leave')} icon={<Calendar size={18} />} color="#f87171" label="On Leave" />
                    </div>
                </div>

                {/* Leave Request Button */}
                <button 
                    onClick={() => setShowLeaveForm(true)}
                    style={{ 
                        background: 'rgba(0,0,0,0.5)', 
                        border: '1px solid rgba(255,255,255,0.2)', 
                        color: 'white', 
                        padding: '12px', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        marginBottom: '20px', 
                        fontWeight: 'bold',
                        textShadow: '1px 1px 2px black',
                        backdropFilter: 'blur(5px)'
                    }}
                >
                    <Calendar size={18} /> Request Leave
                </button>

                {/* My Leave Requests Section */}
                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1rem', color: '#e2e8f0', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px' }}>My Requests</h3>
                     {myLeaveRequests.length === 0 ? (
                        <p style={{ fontSize: '0.85rem', color: '#cbd5e1', fontStyle: 'italic' }}>No active requests.</p>
                     ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                             {myLeaveRequests.map(req => (
                                 <div key={req.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                                         <span style={{ fontWeight: 'bold' }}>{req.type}</span>
                                         <span style={{ 
                                             color: req.status === 'Approved' ? '#86efac' : req.status === 'Denied' ? '#fca5a5' : '#fde047',
                                             fontWeight: 'bold',
                                             textShadow: '1px 1px 1px black'
                                         }}>{req.status}</span>
                                     </div>
                                     <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>{req.date}</div>
                                     {req.adminRemarks && (
                                         <div style={{ marginTop: '5px', fontSize: '0.8rem', color: '#e2e8f0', fontStyle: 'italic', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '4px' }}>
                                             " {req.adminRemarks} "
                                         </div>
                                     )}
                                 </div>
                             ))}
                        </div>
                     )}
                </div>

                <button onClick={logout} style={{ background: 'transparent', border: 'none', color: '#fca5a5', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px', marginTop: 'auto', fontWeight: 'bold', textShadow: '1px 1px 2px black' }}>
                    <LogOut size={20} /> Logout
                </button>
            </div>

            {/* Main Content Area */}
            <div style={{ 
                flex: 1, 
                padding: '40px', 
                background: "linear-gradient(rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.3)), url('/images/adminn.png') no-repeat center center / cover", 
                overflowY: 'auto' 
            }}>
                <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ margin: 0, color: '#ecfccb', fontFamily: "'Playfair Display', serif", textShadow: '2px 2px 4px black' }}>My Dashboard</h1>
                        <p style={{ color: 'white', fontWeight: 'bold', textShadow: '1px 1px 3px black' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: getStatusColor(status), boxShadow: `0 0 10px ${getStatusColor(status)}` }}></div>
                            <span style={{ fontWeight: 'bold', color: 'white', textShadow: '1px 1px 3px black', fontSize: '1.2rem' }}>Status: {status}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {getShiftIcon(shift)}
                            <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold', textShadow: '1px 1px 3px black' }}>Shift: {shift}</span>
                        </div>
                    </div>
                </header>

                {/* Task List */}
                <section>
                    <h2 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', textShadow: '2px 2px 4px black' }}>
                        <CheckCircle size={24} color="#4ade80" /> Assigned Tasks
                    </h2>
                    <div style={{ display: 'grid', gap: '15px' }}>
                        {myTasks.length === 0 ? (
                            <div style={{ 
                                padding: '30px', 
                                background: 'rgba(0,0,0,0.4)', 
                                backdropFilter: 'blur(5px)', 
                                borderRadius: '12px', 
                                textAlign: 'center', 
                                color: '#e2e8f0',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                No tasks assigned currently. Enjoy your day! 🌟
                            </div>
                        ) : (
                        myTasks.map(task => (
                            <motion.div 
                                key={task.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ 
                                    background: 'rgba(0, 0, 0, 0.6)', 
                                    backdropFilter: 'blur(10px)',
                                    padding: '20px', 
                                    borderRadius: '12px', 
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderLeft: `5px solid ${task.priority === 'High' ? '#ef4444' : task.priority === 'Medium' ? '#f59e0b' : '#3b82f6'}`,
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    transition: 'transform 0.2s, background 0.2s' 
                                }}
                                whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.1)' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <input 
                                        type="checkbox" 
                                        checked={task.status === 'Completed'} 
                                        onChange={() => toggleTaskStatus(task.id)}
                                        style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#10b981' }}
                                    />
                                    <div>
                                        <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', fontWeight: 'bold', textShadow: '1px 1px 2px black', color: task.status === 'Completed' ? '#94a3b8' : 'white', textDecoration: task.status === 'Completed' ? 'line-through' : 'none' }}>{task.title}</h3>
                                        <div style={{ display: 'flex', gap: '10px', fontSize: '0.9rem', color: '#e2e8f0' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', fontWeight: '500', gap: '4px', textShadow: '1px 1px 1px black' }}><Clock size={14} /> Due: {task.due}</span>
                                            <span style={{ 
                                                background: task.priority === 'High' ? 'rgba(239, 68, 68, 0.2)' : task.priority === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                                                color: task.priority === 'High' ? '#fca5a5' : task.priority === 'Medium' ? '#fcd34d' : '#93c5fd',
                                                padding: '2px 8px', borderRadius: '4px', fontWeight: 600, textShadow: '1px 1px 1px black',
                                                border: `1px solid ${task.priority === 'High' ? '#ef4444' : task.priority === 'Medium' ? '#f59e0b' : '#3b82f6'}`
                                            }}>{task.priority} Priority</span>
                                        </div>
                                    </div>
                                </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                                        <span style={{ 
                                            padding: '5px 12px', 
                                            borderRadius: '20px', 
                                            fontSize: '0.85rem', 
                                            fontWeight: 700,
                                            background: task.status === 'Completed' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                            color: task.status === 'Completed' ? '#86efac' : 'white',
                                            textShadow: '1px 1px 1px black',
                                            border: '1px solid rgba(255,255,255,0.2)'
                                        }}>
                                            {task.status}
                                        </span>

                                    </div>
                            </motion.div>
                        ))
                        )}
                    </div>
                </section>
            </div>

            {/* Leave Request Modal */}
            <AnimatePresence>
                {showLeaveForm && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{ 
                                background: "linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.5)), url('/images/adminn.png') no-repeat center center / cover", 
                                padding: '30px', 
                                borderRadius: '16px', 
                                width: '400px', 
                                maxWidth: '90%',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                                position: 'relative'
                            }}
                        >
                            <button onClick={() => setShowLeaveForm(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: '#ef4444', border: 'none', cursor: 'pointer', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}><X size={18} /></button>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'white', textAlign: 'center', fontWeight: 'bold', textShadow: '2px 2px 4px black' }}>Request Leave</h2>
                            <form onSubmit={handleLeaveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#e2e8f0', fontWeight: '600', textShadow: '1px 1px 2px black' }}>Leave Type</label>
                                    <select 
                                        value={leaveRequest.type} 
                                        onChange={(e) => setLeaveRequest({...leaveRequest, type: e.target.value})}
                                        style={{ 
                                            width: '100%', 
                                            padding: '12px', 
                                            borderRadius: '8px', 
                                            background: 'rgba(255, 255, 255, 0.1)', 
                                            border: '1px solid rgba(255, 255, 255, 0.2)', 
                                            color: 'white',
                                            fontSize: '1rem',
                                            fontWeight: '500' 
                                        }}
                                    >
                                        <option value="Sick Leave" style={{ color: 'black' }}>Sick Leave</option>
                                        <option value="Casual Leave" style={{ color: 'black' }}>Casual Leave</option>
                                        <option value="Emergency" style={{ color: 'black' }}>Emergency</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#e2e8f0', fontWeight: '600', textShadow: '1px 1px 2px black' }}>Date</label>
                                    <input 
                                        type="date" 
                                        required
                                        value={leaveRequest.date} 
                                        onChange={(e) => setLeaveRequest({...leaveRequest, date: e.target.value})}
                                        style={{ 
                                            width: '100%', 
                                            padding: '12px', 
                                            borderRadius: '8px', 
                                            background: 'rgba(255, 255, 255, 0.1)', 
                                            border: '1px solid rgba(255, 255, 255, 0.2)', 
                                            color: 'white',
                                            fontSize: '1rem',
                                            fontWeight: '500'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#e2e8f0', fontWeight: '600', textShadow: '1px 1px 2px black' }}>Reason</label>
                                    <textarea 
                                        rows="3"
                                        required
                                        value={leaveRequest.reason} 
                                        onChange={(e) => setLeaveRequest({...leaveRequest, reason: e.target.value})}
                                        placeholder="Brief reason for leave..."
                                        style={{ 
                                            width: '100%', 
                                            padding: '12px', 
                                            borderRadius: '8px', 
                                            background: 'rgba(255, 255, 255, 0.1)', 
                                            border: '1px solid rgba(255, 255, 255, 0.2)', 
                                            color: 'white',
                                            fontSize: '1rem',
                                            resize: 'none',
                                            fontWeight: '500'
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                                    <button 
                                        type="button" 
                                        onClick={() => setShowLeaveForm(false)}
                                        style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: '#4ade80', color: '#0f172a', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}
                                    >
                                        Submit Request
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const StatusButton = ({ active, onClick, icon, color, label }) => (
    <button 
        onClick={onClick}
        style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px 15px', 
            borderRadius: '8px', 
            border: active ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.2)',
            background: active ? `rgba(${parseInt(color.slice(1,3),16)}, ${parseInt(color.slice(3,5),16)}, ${parseInt(color.slice(5,7),16)}, 0.3)` : 'rgba(0,0,0,0.4)', 
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontWeight: 'bold',
            fontSize: '1rem',
            textShadow: '1px 1px 2px black',
            boxShadow: active ? `0 0 15px ${color}60` : 'none',
            transform: active ? 'scale(1.05)' : 'scale(1)'
        }}
    >
        {icon}
        {label}
    </button>
);

export default EmployeeDashboard;
