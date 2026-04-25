import React, { createContext, useState, useContext, useEffect } from 'react';
import { employees as mockEmployees, employeeTasks as mockTasks } from '../data/mockData';

const StaffContext = createContext(null);

export const StaffProvider = ({ children }) => {
  // Initialize from localStorage or mockData
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('staff_employees');
    return saved ? JSON.parse(saved) : mockEmployees;
  });
  
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('staff_tasks');
    return saved ? JSON.parse(saved) : mockTasks; // Note: mockTasks might need 'assignedTo' update
  });
  
  const [leaveRequests, setLeaveRequests] = useState(() => {
    const saved = localStorage.getItem('staff_leaveRequests');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('staff_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('staff_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('staff_leaveRequests', JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  // --- Employee Actions ---

  const updateEmployeeStatus = (id, newStatus) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, status: newStatus } : emp
    ));
  };

  const updateEmployeeShift = (id, newShift) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, shift: newShift } : emp
    ));
  };

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now(),
      status: 'Active'
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, ...updatedData } : emp
    ));
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const submitLeaveRequest = (request) => {
    const newRequest = {
      ...request,
      id: Date.now(),
      status: 'Pending',
      adminRemarks: ''
    };
    setLeaveRequests(prev => [newRequest, ...prev]);
  };

  // --- Admin Actions ---

  const assignTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      status: 'Pending'
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const processLeaveRequest = (requestId, status, remarks) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status, adminRemarks: remarks } : req
    ));
    
    // If approved, optionally auto-update employee status to 'Leave' (can be done manually too)
    if (status === 'Approved') {
       const req = leaveRequests.find(r => r.id === requestId);
       if (req) {
           updateEmployeeStatus(req.employeeId, 'Leave');
       }
    }
  };

  return (
    <StaffContext.Provider value={{
      employees,
      tasks,
      leaveRequests,
      updateEmployeeStatus,
      updateEmployeeShift,
      addEmployee,
      updateEmployee,
      updateTaskStatus,
      submitLeaveRequest,
      assignTask,
      processLeaveRequest
    }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => useContext(StaffContext);
