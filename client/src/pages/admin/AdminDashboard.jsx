

import { useState } from 'react'
import { BarChart, Bell, BookOpen, Calendar, Plus, Users, X } from 'lucide-react'
import Sidebar from '../../components/Sidebar'

export default function AdminDashboard() {
    const [activeSection, setActiveSection] = useState('dashboard')
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

            {/* Main Content */}
            <main className="flex-1">
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between p-4">
                        <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <Bell className="h-6 w-6 text-gray-600" />
                            </button>
                            <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
                        </div>
                    </div>
                </header>

                <div className="p-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {[
                            { label: 'Total Students', value: '1,234', icon: Users },
                            { label: 'Active Courses', value: '42', icon: BookOpen },
                            { label: 'Upcoming Exams', value: '8', icon: Calendar },
                            { label: 'Events This Month', value: '6', icon: Calendar },
                        ].map((stat, index) => (
                            <div key={index} className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">{stat.label}</p>
                                        <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-full">
                                        <stat.icon className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        {['Add New Course', 'Schedule Exam', 'Create Event'].map((action, index) => (
                            <button
                                key={index}
                                onClick={toggleDrawer}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Plus className="h-5 w-5" />
                                <span>{action}</span>
                            </button>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                            <div className="space-y-4">
                                {[
                                    { title: 'New Course Added', desc: 'Advanced Web Development', time: '2 hours ago' },
                                    { title: 'Exam Scheduled', desc: 'Database Management Systems', time: '3 hours ago' },
                                    { title: 'Scholarship Posted', desc: 'Merit Scholarship 2024', time: '5 hours ago' },
                                    { title: 'Event Created', desc: 'Tech Symposium 2024', time: '1 day ago' },
                                ].map((activity, index) => (
                                    <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <BarChart className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{activity.title}</h3>
                                            <p className="text-sm text-gray-600">{activity.desc}</p>
                                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add/Edit Drawer */}
            {isDrawerOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">Add New Item</h2>
                                <button onClick={toggleDrawer} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                        <option>Course</option>
                                        <option>Exam</option>
                                        <option>Event</option>
                                        <option>Scholarship</option>
                                        <option>Internship</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}