import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProduct } from '../../context/ProductContext';
import { useStaff } from '../../context/StaffContext'; // Import StaffContext
import { products as mockProducts, orders } from '../../data/mockData';
import { Package, Users, ShoppingCart, Activity, LogOut, Plus, X, CheckSquare, Calendar, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const B = import.meta.env.BASE_URL;

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { products, addProduct, updateProduct } = useProduct();
    const { employees, tasks, assignTask, leaveRequests, processLeaveRequest, updateEmployeeShift, addEmployee, updateEmployee } = useStaff(); // Use StaffContext
    const [activeTab, setActiveTab] = useState('overview');
    
    // Employee Modal State
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    
    // Product Modal State
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Task Modal State
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [taskAssignee, setTaskAssignee] = useState(null);

    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null); // { id, action: 'Approved'|'Denied' }

    const openAddEmployeeModal = () => {
        setEditingEmployee(null);
        setIsEmployeeModalOpen(true);
    };

    const openEditEmployeeModal = (employee) => {
        setEditingEmployee(employee);
        setIsEmployeeModalOpen(true);
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setIsProductModalOpen(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setIsProductModalOpen(true);
    };

    const handleSaveProduct = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const productData = {
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            category: formData.get('category'),
            stock: parseInt(formData.get('stock')),
            image: formData.get('image') || `${B}images/placeholder.png`
        };

        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
        } else {
            addProduct(productData);
        }
        setIsProductModalOpen(false);
    };

    const handleAssignTask = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTask = {
            title: formData.get('title'),
            priority: formData.get('priority'),
            due: formData.get('due'),

            assignedTo: taskAssignee.id
        };
        assignTask(newTask);
        setIsTaskModalOpen(false);
        setTaskAssignee(null);
    };

    const handleSaveEmployee = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const employeeData = {
            name: formData.get('name'),
            role: formData.get('role'),
            shift: formData.get('shift')
        };

        if (editingEmployee) {
            updateEmployee(editingEmployee.id, employeeData);
        } else {
            addEmployee(employeeData);
        }
        setIsEmployeeModalOpen(false);
        setEditingEmployee(null);
    };

    const handleProcessLeave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const remarks = formData.get('remarks');
        processLeaveRequest(selectedLeave.id, selectedLeave.action, remarks);
        setIsLeaveModalOpen(false);
        setSelectedLeave(null);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewStats products={products} orders={orders} employees={employees} />;
            case 'products': return <ProductTable products={products} onAdd={openAddModal} onEdit={openEditModal} />;
            case 'orders': return <OrdersTable orders={orders} />;
            case 'employees': return <EmployeeTable employees={employees} onAdd={openAddEmployeeModal} onEdit={openEditEmployeeModal} onAssignTask={(emp) => { setTaskAssignee(emp); setIsTaskModalOpen(true); }} />;
            case 'tasks': return <TasksTable tasks={tasks} employees={employees} />;
            case 'leaves': return <LeaveRequestsTable requests={leaveRequests} onAction={(req, action) => { setSelectedLeave({ ...req, action }); setIsLeaveModalOpen(true); }} />;
            default: return <OverviewStats />;
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', paddingTop: '80px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            {/* Sidebar */}
            <div style={{ width: '250px', background: `linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.2)), url('${B}images/adminn.png') no-repeat center center / cover`, color: 'white', padding: '20px', display: 'flex', flexDirection: 'column', fontFamily: "'Playfair Display', serif" }}>
                <h2 style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.8rem', textShadow: '2px 2px 4px black' }}>
                    <Activity color="#4ade80" /> Admin
                </h2>
                <nav style={{ flex: 1 }}>
                    <SidebarItem icon={<Activity size={24} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                    <SidebarItem icon={<Package size={24} />} label="Products & Stock" active={activeTab === 'products'} onClick={() => setActiveTab('products')} />
                    <SidebarItem icon={<ShoppingCart size={24} />} label="Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
                    <SidebarItem icon={<Users size={24} />} label="Employees" active={activeTab === 'employees'} onClick={() => setActiveTab('employees')} />
                    <SidebarItem icon={<CheckSquare size={24} />} label="Tasks" active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} />
                    <SidebarItem icon={<Calendar size={24} />} label="Leave Requests" active={activeTab === 'leaves'} onClick={() => setActiveTab('leaves')} />
                </nav>
                <button onClick={logout} style={{ background: 'transparent', border: 'none', color: '#f87171', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px', marginTop: 'auto' }}>
                    <LogOut size={20} /> Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto', background: `linear-gradient(rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.3)), url('${B}images/adminn.png') no-repeat center center / cover` }}>
                <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ color: '#ecfccb', margin: 0, fontFamily: 'Playfair Display, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{activeTab === 'leaves' ? 'Leave Requests' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 'bold', color: '#f1f5f9', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{user?.name}</span>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e293b', fontWeight: 'bold' }}>
                            {user?.name?.charAt(0)}
                        </div>
                    </div>
                </header>

                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    {renderContent()}
                </motion.div>
            </div>

            {/* Modal Container */}
            <AnimatePresence>
                {(isProductModalOpen || isTaskModalOpen || isLeaveModalOpen || isEmployeeModalOpen) && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{ 
                                background: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url('${B}images/adminn.png') no-repeat center center / cover`, 
                                padding: '30px', 
                                borderRadius: '15px', 
                                width: '500px', 
                                maxWidth: '90%', 
                                position: 'relative',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.7)',
                                color: 'white',
                                backdropFilter: 'blur(10px) brightness(1.1)'
                            }}
                        >
                            <button onClick={() => { setIsProductModalOpen(false); setIsTaskModalOpen(false); setIsLeaveModalOpen(false); setIsEmployeeModalOpen(false); }} style={{ position: 'absolute', top: '15px', right: '15px', background: '#ef4444', border: 'none', cursor: 'pointer', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}><X size={18} /></button>
                            
                            {isEmployeeModalOpen && (
                                <>
                                    <h2 style={{ marginBottom: '20px', color: 'white', textShadow: '2px 2px 4px black' }}>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
                                    <form onSubmit={handleSaveEmployee} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <label style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 'bold' }}>Full Name</label>
                                            <input name="name" placeholder="Full Name" defaultValue={editingEmployee?.name} required style={inputStyle} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <label style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 'bold' }}>Role</label>
                                            <input name="role" placeholder="e.g. Staff, Manager, Delivery" defaultValue={editingEmployee?.role || 'Staff'} required style={inputStyle} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <label style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 'bold' }}>Shift</label>
                                            <select name="shift" defaultValue={editingEmployee?.shift || 'Morning'} required style={inputStyle}>
                                                <option value="Morning" style={{ color: 'black' }}>Morning Shift</option>
                                                <option value="Afternoon" style={{ color: 'black' }}>Afternoon Shift</option>
                                                <option value="Evening" style={{ color: 'black' }}>Evening Shift</option>
                                                <option value="Night" style={{ color: 'black' }}>Night Shift</option>
                                            </select>
                                        </div>
                                        <button type="submit" style={{ padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, marginTop: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
                                            {editingEmployee ? 'Update Details' : 'Add Employee'}
                                        </button>
                                    </form>
                                </>
                            )}
                            
                            {/* Product Modal */}
                            {isProductModalOpen && (
                                <>
                                    <h2 style={{ marginBottom: '20px', color: 'white', textShadow: '2px 2px 4px black' }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                                    <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <label style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 'bold' }}>Product Name</label>
                                            <input name="name" placeholder="Product Name" defaultValue={editingProduct?.name} required style={inputStyle} />
                                        </div>
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                <label style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 'bold' }}>Price</label>
                                                <input name="price" type="number" step="0.01" placeholder="Price" defaultValue={editingProduct?.price} required style={inputStyle} />
                                            </div>
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                <label style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 'bold' }}>Stock</label>
                                                <input name="stock" type="number" placeholder="Stock" defaultValue={editingProduct?.stock} required style={inputStyle} />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <label style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 'bold' }}>Category</label>
                                            <select name="category" defaultValue={editingProduct?.category || 'Category'} required style={inputStyle}>
                                                <option disabled>Category</option>
                                                <option value="Dairy" style={{ color: 'black' }}>Dairy</option>
                                                <option value="Vegetables" style={{ color: 'black' }}>Vegetables</option>
                                                <option value="Fruits" style={{ color: 'black' }}>Fruits</option>
                                                <option value="Accessories" style={{ color: 'black' }}>Accessories</option>
                                            </select>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <label style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 'bold' }}>Image URL</label>
                                            <input name="image" placeholder="Image URL (optional)" defaultValue={editingProduct?.image} style={inputStyle} />
                                        </div>
                                        <button type="submit" style={{ padding: '12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, marginTop: '10px' }}>
                                            {editingProduct ? 'Update Product' : 'Add Product'}
                                        </button>
                                    </form>
                                </>
                            )}

                            {/* Task Assignment Modal */}
                            {isTaskModalOpen && (
                                <>
                                    <h2 style={{ marginBottom: '20px', color: 'white', textShadow: '2px 2px 4px black' }}>Assign Task to {taskAssignee?.name}</h2>
                                    <form onSubmit={handleAssignTask} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <label style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 'bold' }}>Task Title</label>
                                            <input name="title" placeholder="Task Title / Description" required style={inputStyle} />
                                        </div>
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                <label style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 'bold' }}>Priority</label>
                                                <select name="priority" required style={inputStyle}>
                                                    <option value="High" style={{ color: 'black' }}>High Priority</option>
                                                    <option value="Medium" style={{ color: 'black' }}>Medium Priority</option>
                                                    <option value="Low" style={{ color: 'black' }}>Low Priority</option>
                                                </select>
                                            </div>
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                <label style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 'bold' }}>Due Time</label>
                                                <input name="due" type="time" required style={inputStyle} />
                                            </div>
                                        </div>

                                        <button type="submit" style={{ padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, marginTop: '10px' }}>
                                            Assign Task
                                        </button>
                                    </form>
                                </>
                            )}

                            {/* Leave Action Modal */}
                            {isLeaveModalOpen && (
                                <>
                                    <h2 style={{ marginBottom: '20px', color: 'white', textShadow: '2px 2px 4px black' }}>{selectedLeave?.action} Leave Request</h2>
                                    <p style={{ marginBottom: '15px', color: '#cbd5e1', fontWeight: '500' }}>For {selectedLeave?.employeeName} ({selectedLeave?.type} on {selectedLeave?.date})</p>
                                    <form onSubmit={handleProcessLeave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <label style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 'bold' }}>Admin Remarks</label>
                                            <textarea name="remarks" placeholder="Add remarks/reason..." required style={{ ...inputStyle, minHeight: '100px' }} />
                                        </div>
                                        <button type="submit" style={{ 
                                            padding: '12px', 
                                            background: selectedLeave?.action === 'Approved' ? '#10b981' : '#ef4444', 
                                            color: 'white', 
                                            border: 'none', 
                                            borderRadius: '8px', 
                                            cursor: 'pointer', 
                                            fontWeight: 600, 
                                            marginTop: '10px' 
                                        }}>
                                            Confirm {selectedLeave?.action}
                                        </button>
                                    </form>
                                </>
                            )}

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const inputStyle = { 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid rgba(255, 255, 255, 0.2)', 
    background: 'rgba(255, 255, 255, 0.1)', 
    color: 'white', 
    fontSize: '1rem', 
    width: '100%',
    fontWeight: '500'
};

// Sub-components
const SidebarItem = ({ icon, label, active, onClick, backgroundImage }) => (
    <div onClick={onClick} style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '15px', 
        padding: '12px 15px', 
        borderRadius: '8px', 
        cursor: 'pointer', 
        marginBottom: '10px', 
        background: active ? (backgroundImage ? `url(${backgroundImage})` : '#334155') : 'transparent', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: active ? (backgroundImage ? 'white' : '#4ade80') : '#fff', /* Changed default color to white for visibility on image */
        textShadow: '1px 1px 3px rgba(0,0,0,0.8)', /* Strong shadow for readability */
        transition: 'all 0.2s',
        position: 'relative',
        overflow: 'hidden',
        fontSize: '1.2rem', /* Larger text */
        fontWeight: 'bold', /* Bolder text */
        boxShadow: active ? '0 0 15px rgba(74, 222, 128, 0.3)' : 'none',
        border: active ? '1px solid rgba(74, 222, 128, 0.5)' : '1px solid transparent'
    }}>
        {/* Overlay for better text readability if background image is present */}
        {active && backgroundImage && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 0 }}></div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', position: 'relative', zIndex: 1 }}>
            {icon} <span>{label}</span>
        </div>
    </div>
);

const OverviewStats = ({ products, orders, employees }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <StatCard title="Total Products" value={products?.length} color="#3b82f6" />
        <StatCard title="Active Orders" value={orders?.length} color="#f59e0b" />
        <StatCard title="Staff Members" value={employees?.length} color="#10b981" />
        <StatCard title="Low Stock Items" value={products?.filter(p => p.stock < 30).length} color="#ef4444" />
    </div>
);

const StatCard = ({ title, value, color }) => (
    <div style={{ 
        background: 'rgba(255, 255, 255, 0.15)', 
        backdropFilter: 'blur(10px)',
        padding: '25px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
        borderTop: `4px solid ${color}`,
        color: 'white',
        textShadow: '0 1px 2px rgba(0,0,0,0.3)' /* Added shadow */
    }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#f1f5f9', fontSize: '0.95rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</h3>
        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>{value}</p>
    </div>
);

const ProductTable = ({ products, onAdd, onEdit }) => (
    <div style={{ 
        background: 'rgba(255, 255, 255, 0.15)', 
        backdropFilter: 'blur(10px)',
        borderRadius: '12px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
        overflow: 'hidden',
        color: 'white'
    }}>
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h3 style={{ margin: 0, color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.3)', fontWeight: 'bold' }}>Product Inventory</h3>
            <button onClick={onAdd} style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                <Plus size={16} /> Add Product
            </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
            <thead style={{ background: 'rgba(0, 0, 0, 0.2)', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                <tr>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Name</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Category</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Price</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Stock</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ padding: '15px', fontWeight: 600, color: 'white', textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>{product.name}</td>
                        <td style={{ padding: '15px' }}><span style={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>{product.category}</span></td>
                        <td style={{ padding: '15px', color: 'white', fontWeight: 600 }}>₹{Number(product.price).toFixed(2)}</td>
                        <td style={{ padding: '15px', color: product.stock < 30 ? '#fca5a5' : '#86efac', fontWeight: 'bold', textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>{product.stock} units</td>
                        <td style={{ padding: '15px' }}>
                            <button onClick={() => onEdit(product)} style={{ padding: '6px 12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>Update</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const OrdersTable = ({ orders }) => (
    <div style={{ 
        background: 'rgba(255, 255, 255, 0.15)', 
        backdropFilter: 'blur(10px)',
        borderRadius: '12px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
        overflow: 'hidden',
        color: 'white'
    }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
            <thead style={{ background: 'rgba(0, 0, 0, 0.2)', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                <tr>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Order ID</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Customer</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Items</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Total</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Status</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '15px', fontWeight: 'bold', color: 'white', textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>#{order.id}</td>
                        <td style={{ padding: '15px', color: 'white', fontWeight: 500 }}>{order.customer}</td>
                        <td style={{ padding: '15px', color: 'white', fontWeight: 600, textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>{order.items}</td>
                        <td style={{ padding: '15px', color: 'white', fontWeight: 600 }}>₹{order.total.toFixed(2)}</td>
                        <td style={{ padding: '15px' }}>
                            <span style={{ 
                                padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700,
                                background: order.status === 'Delivered' ? 'rgba(220, 252, 231, 0.2)' : order.status === 'Pending' ? 'rgba(254, 249, 195, 0.2)' : 'rgba(224, 242, 254, 0.2)',
                                color: order.status === 'Delivered' ? '#86efac' : order.status === 'Pending' ? '#fde047' : '#7dd3fc',
                                textShadow: '0 1px 1px rgba(0,0,0,0.2)'
                            }}>
                                {order.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const EmployeeTable = ({ employees, onAdd, onEdit, onAssignTask }) => {
    const { updateEmployeeShift } = useStaff();

    return (
    <div style={{ 
        background: 'rgba(255, 255, 255, 0.15)', 
        backdropFilter: 'blur(10px)',
        borderRadius: '12px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
        overflow: 'hidden',
        color: 'white'
    }}>
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h3 style={{ margin: 0, color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.3)', fontWeight: 'bold' }}>Employee Management</h3>
            <button onClick={onAdd} style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                <Plus size={16} /> Add Employee
            </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
            <thead style={{ background: 'rgba(0, 0, 0, 0.2)', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                <tr>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Name</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Role</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Shift</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Status</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(emp => (
                    <tr key={emp.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '15px', fontWeight: 600, color: 'white', textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>{emp.name}</td>
                        <td style={{ padding: '15px', color: 'white', fontWeight: 600, textShadow: '0 1px 1px rgba(0,0,0,0.2)' }}>{emp.role}</td>
                        <td style={{ padding: '15px' }}>
                            <select 
                                value={emp.shift || 'Morning'} 
                                onChange={(e) => updateEmployeeShift(emp.id, e.target.value)}
                                style={{ 
                                    background: 'rgba(255, 255, 255, 0.2)', 
                                    color: 'white', 
                                    padding: '5px 10px', 
                                    borderRadius: '5px', 
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    cursor: 'pointer',
                                    fontWeight: '500'
                                }}
                            >
                                <option value="Morning" style={{ color: 'black' }}>Morning</option>
                                <option value="Afternoon" style={{ color: 'black' }}>Afternoon</option>
                                <option value="Evening" style={{ color: 'black' }}>Evening</option>
                                <option value="Night" style={{ color: 'black' }}>Night</option>
                            </select>
                        </td>
                        <td style={{ padding: '15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: emp.status === 'Active' ? '#10b981' : emp.status.includes('Break') ? '#f59e0b' : '#ef4444', boxShadow: '0 0 4px rgba(0,0,0,0.3)' }}></div>
                                <span style={{ color: 'white', fontWeight: 600 }}>{emp.status}</span>
                            </div>
                        </td>
                        <td style={{ padding: '15px' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => onEdit(emp)} style={{ padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>Edit</button>
                                <button onClick={() => onAssignTask(emp)} style={{ padding: '6px 12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>Assign Task</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

const TasksTable = ({ tasks, employees }) => (
    <div style={{ 
        background: 'rgba(255, 255, 255, 0.15)', 
        backdropFilter: 'blur(10px)',
        borderRadius: '12px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
        overflow: 'hidden',
        color: 'white'
    }}>
        {tasks.length === 0 ? (
           <div style={{ padding: '40px', textAlign: 'center', color: '#f1f5f9' }}>No tasks assigned.</div>
        ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
            <thead style={{ background: 'rgba(0, 0, 0, 0.2)', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                <tr>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold' }}>Task</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold' }}>Assigned To</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold' }}>Priority</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold' }}>Shift</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold' }}>Due</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold' }}>Status</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task => {
                    const employee = employees.find(e => e.id === task.assignedTo);
                    return (
                        <tr key={task.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <td style={{ padding: '15px', fontWeight: 600 }}>{task.title}</td>
                            <td style={{ padding: '15px' }}>{employee ? employee.name : 'Unknown'}</td>
                            <td style={{ padding: '15px' }}>
                                <span style={{
                                    color: task.priority === 'High' ? '#fca5a5' : task.priority === 'Medium' ? '#fcd34d' : '#93c5fd',
                                    fontWeight: 'bold'
                                }}>{task.priority}</span>
                            </td>
                            <td style={{ padding: '15px' }}>{task.shift || 'Any'}</td>
                            <td style={{ padding: '15px' }}>{task.due}</td>
                            <td style={{ padding: '15px' }}>
                                <span style={{ 
                                    padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700,
                                    background: task.status === 'Completed' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(254, 249, 195, 0.2)',
                                    color: task.status === 'Completed' ? '#86efac' : '#fde047'
                                }}>
                                    {task.status}
                                </span>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        )}
    </div>
);

const LeaveRequestsTable = ({ requests, onAction }) => (
    <div style={{ 
        background: 'rgba(255, 255, 255, 0.15)', 
        backdropFilter: 'blur(10px)',
        borderRadius: '12px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
        overflow: 'hidden',
        color: 'white'
    }}>
        {requests.length === 0 ? (
           <div style={{ padding: '40px', textAlign: 'center', color: '#f1f5f9' }}>No pending leave requests.</div>
        ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
            <thead style={{ background: 'rgba(0, 0, 0, 0.2)', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                <tr>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold' }}>Employee</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold' }}>Type</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold' }}>Date</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold' }}>Reason</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold' }}>Status</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 'bold' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {requests.map(req => (
                    <tr key={req.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '15px', fontWeight: '600' }}>{req.employeeName || 'Staff Member'}</td>
                        <td style={{ padding: '15px' }}>{req.type}</td>
                        <td style={{ padding: '15px' }}>{req.date}</td>
                        <td style={{ padding: '15px', fontStyle: 'italic', color: '#e2e8f0' }}>"{req.reason}"</td>
                        <td style={{ padding: '15px' }}>
                             <span style={{ 
                                padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700,
                                background: req.status === 'Approved' ? 'rgba(220, 252, 231, 0.2)' : req.status === 'Pending' ? 'rgba(254, 249, 195, 0.2)' : 'rgba(254, 226, 226, 0.2)',
                                color: req.status === 'Approved' ? '#86efac' : req.status === 'Pending' ? '#fde047' : '#fca5a5'
                            }}>
                                {req.status}
                            </span>
                        </td>
                        <td style={{ padding: '15px' }}>
                            {req.status === 'Pending' && (
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => onAction(req, 'Approved')} style={{ padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Approve</button>
                                    <button onClick={() => onAction(req, 'Denied')} style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Deny</button>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        )}
    </div>
);

export default Dashboard;
