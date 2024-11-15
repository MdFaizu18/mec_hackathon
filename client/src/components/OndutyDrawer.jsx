import { toast } from 'react-toastify';
import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Form } from 'react-router-dom'
import customFetch from '../utils/CustomFetch'
import axios from 'axios';

const OndutyDrawer = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        studentName: '',
        studentId: '',
        course: '',
        semester: '',
        contactNumber: '',
        dateFrom: '',
        dateTo: '',
        reason: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = {
                studentName: formData.studentName,
                studentId: formData.studentId,
                course: formData.course,
                semester: formData.semester,
                contactNumber: formData.contactNumber,
                dateFrom: formData.dateFrom,
                dateTo: formData.dateTo,
                reason: formData.reason,
            };

            const response = await axios.post('/api/v1/student/on-duty', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('API Response:', response); // Debugging
            if (response.status === 200) {
                toast.success('On-duty request submitted successfully!');
                setFormData({
                    studentName: '',
                    studentId: '',
                    course: '',
                    semester: '',
                    contactNumber: '',
                    dateFrom: '',
                    dateTo: '',
                    reason: '',
                });
                onClose();
            } else {
                throw new Error('Unexpected response from server.');
            }
        } catch (error) {
            console.error('Error:', error.response || error.message); // Debugging
            toast.error(error.response?.data?.msg || 'Failed to submit on-duty request');
        }
    };





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
                <Form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                            Student Name
                        </label>
                        <input
                            type="text"
                            id="studentName"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Student ID Field */}
                    <div>
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                            Student ID
                        </label>
                        <input
                            type="text"
                            id="studentId"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Course Field */}
                    <div>
                        <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                            Course
                        </label>
                        <input
                            type="text"
                            id="course"
                            name="course"
                            value={formData.course}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Semester Field */}
                    <div>
                        <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                            Semester
                        </label>
                        <input
                            type="text"
                            id="semester"
                            name="semester"
                            value={formData.semester}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Contact Number Field */}
                    <div>
                        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            id="contactNumber"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Date Range */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700">
                                Date From
                            </label>
                            <input
                                type="date"
                                id="dateFrom"
                                name="dateFrom"
                                value={formData.dateFrom}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700">
                                Date To
                            </label>
                            <input
                                type="date"
                                id="dateTo"
                                name="dateTo"
                                value={formData.dateTo}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Reason Field */}
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                            Reason
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
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
                </Form>
            </div>
        </div>
    )
}

export default OndutyDrawer
