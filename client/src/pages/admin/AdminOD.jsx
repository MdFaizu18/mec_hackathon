import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import customFetch from '../../utils/CustomFetch';

export default function AdminOD() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [odRequests, setOdRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Fetch OD requests from the server
    useEffect(() => {
        const fetchOdRequests = async () => {
            try {
                const response = await customFetch.get('/student/on-duty');
                setOdRequests(response.data);
            } catch (error) {
                console.error('Error fetching OD requests:', error);
            }
        };

        fetchOdRequests();
    }, []);

    // Handle approval or rejection
    const updateStatus = async (id, status) => {
        if (status !== 'Approved' && status !== 'Rejected') {
            console.error(`Invalid status: ${status}. Status must be 'Approved' or 'Rejected'.`);
            return;
        }

        try {
            await customFetch.patch(`/student/on-duty/${id}`, { status });
            setOdRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === id ? { ...request, status } : request
                )
            );
            console.log(`Request ID: ${id} updated to status: ${status}`);
            setSelectedRequest(null); // Close modal after update
        } catch (error) {
            console.error(`Error updating OD request (ID: ${id}) to status: ${status}`, error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

            {/* Main Content */}
            <main className="flex-1">
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between p-4">
                        <h1 className="text-2xl font-semibold text-gray-800">OD Permissions</h1>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <Bell className="h-6 w-6 text-gray-600" />
                            </button>
                            <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
                        </div>
                    </div>
                </header>

                {/* OD Requests Table */}
                <div className="p-6">
                    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="text-left p-4">Name</th>
                                <th className="text-left p-4">Student ID</th>
                                <th className="text-left p-4">Course</th>
                                <th className="text-left p-4">Semester</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-left p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {odRequests.map((request) => (
                                <tr key={request._id} className="border-t">
                                    <td className="p-4">{request.studentName}</td>
                                    <td className="p-4">{request.studentId}</td>
                                    <td className="p-4">{request.course}</td>
                                    <td className="p-4">{request.semester}</td>
                                    <td className="p-4">{request.status}</td>
                                    <td className="p-4">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                            onClick={() => setSelectedRequest(request)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {selectedRequest && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                            <h2 className="text-xl font-bold mb-4">Request Details</h2>
                            <p><strong>Name:</strong> {selectedRequest.studentName}</p>
                            <p><strong>Student ID:</strong> {selectedRequest.studentId}</p>
                            <p><strong>Reason:</strong> {selectedRequest.reason}</p>
                            <p><strong>Date From:</strong> {new Date(selectedRequest.dateFrom).toLocaleDateString()}</p>
                            <p><strong>Date To:</strong> {new Date(selectedRequest.dateTo).toLocaleDateString()}</p>
                            <p><strong>Contact:</strong> {selectedRequest.contactNumber}</p>

                            <div className="mt-6 flex justify-end space-x-4">
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={() => updateStatus(selectedRequest._id, 'Approved')}
                                >
                                    Approve
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => updateStatus(selectedRequest._id, 'Rejected')}
                                >
                                    Reject
                                </button>
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                    onClick={() => setSelectedRequest(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
