'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, PenTool, BookOpen, Trophy, School, Calendar, Info, LogOut, Menu } from 'lucide-react';

export default function Sidebar({ activeSection, setActiveSection }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate(); // React Router hook for navigation

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', route: '/admin-dashboard' },
        { icon: PenTool, label: 'Manage Exams', id: 'exams', route: '/admin-dashboard/manage-exams' },
        { icon: BookOpen, label: 'Manage Courses', id: 'courses', route: '/admin-dashboard/manage-courses' },
        { icon: Trophy, label: 'Internships', id: 'internships', route: '/admin-dashboard/internships' },
        { icon: School, label: 'OD Permission', id: 'scholarships', route: '/admin-dashboard/od-notify' },
        { icon: Calendar, label: 'Events', id: 'events', route: '/admin-dashboard/events' },
        { icon: Info, label: 'General Info', id: 'info', route: '/admin-dashboard/general-info' },
    ];

    const handleNavigation = (id, route) => {
        setActiveSection(id);
        navigate(route);
    };

    return (
        <aside className={`bg-blue-600 text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
            <div className="p-4 flex items-center justify-between">
                <h1 className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>AdminHub</h1>
                <button onClick={toggleSidebar} className="p-2 hover:bg-blue-700 rounded-lg">
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            <nav className="mt-8 px-4">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => handleNavigation(item.id, item.route)}
                                className={`flex items-center space-x-3 p-3 rounded-lg w-full hover:bg-blue-700 ${activeSection === item.id ? 'bg-blue-700' : ''
                                    }`}
                            >
                                <item.icon className="h-6 w-6" />
                                <span className={!isSidebarOpen ? 'hidden' : ''}>{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="absolute bottom-4 left-4 right-4">
                <button className="flex items-center space-x-3 p-3 rounded-lg w-full">
                    <LogOut className="h-6 w-6" />
                    <span className={!isSidebarOpen ? 'hidden' : ''}>Logout</span>
                </button>
            </div>
        </aside>
    );
}
