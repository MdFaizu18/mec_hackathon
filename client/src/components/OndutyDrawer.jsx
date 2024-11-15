import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import customFetch from '../utils/CustomFetch';

const OndutyDrawer = ({ isOpen, onClose }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // Form states
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [course, setCourse] = useState('');
    const [semester, setSemester] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [reason, setReason] = useState('');

    // Fetch current user
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await customFetch.get('/dashboard-student/current-user');
                const user = response.data.user;

                setCurrentUser(user);
                setStudentName(user?.name || '');
                setStudentId(user?.registerNo || '');
                setCourse(user?.department || '');
            } catch (error) {
                console.error('Failed to fetch current user:', error);
                toast.error('Unable to fetch user data');
            }
        };

        fetchCurrentUser();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = {
                studentName,
                studentId,
                course,
                semester,
                contactNumber,
                dateFrom,
                dateTo,
                reason,
            };

            console.log("Data sent to server:", data);

            await customFetch.post('/student/on-duty', data);
            toast.success("Permission submitted successfully");
            onClose();
        } catch (error) {
            console.error('Error:', error.response || error.message);
            toast.error(error.response?.data?.msg || 'Failed to submit on-duty request');
        }
    };

    if (!currentUser) {
        // Render a loading indicator while `currentUser` is being fetched
        return (
            <div className={`fixed inset-y-0 right-0 w-full sm:w-2/5 bg-gray-50 shadow-lg transform transition-transform duration-300 ease-in-out z-50`}>
                <div className="p-6 flex justify-center items-center h-full">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`fixed inset-y-0 right-0 w-full sm:w-2/5 bg-gray-50 shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
            <div className="p-6">
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-blue-600">On-Duty Permission Request</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Student Name */}
                    <div>
                        <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student Name</label>
                        <input
                            type="text"
                            id="studentName"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Student ID */}
                    <div>
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Register No</label>
                        <input
                            type="text"
                            id="studentId"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Course */}
                    <div>
                        <label htmlFor="course" className="block text-sm font-medium text-gray-700">Department</label>
                        <input
                            type="text"
                            id="course"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Semester */}
                    <div>
                        <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
                        <select
                            id="semester"
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select Semester</option>
                            {[...Array(8)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    Semester {index + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Contact Number */}
                    <div>
                        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                        <input
                            type="text"
                            id="contactNumber"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Contact Number */}
                   

                    {/* Date Range */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700">Date From</label>
                            <input
                                type="date"
                                id="dateFrom"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700">Date To</label>
                            <input
                                type="date"
                                id="dateTo"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Reason */}
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
                        <textarea
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OndutyDrawer;

                  





