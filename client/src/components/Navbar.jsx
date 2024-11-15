import { useState } from 'react'
import {
    GraduationCap,
    LogIn,
    Menu,
    UserPlus,
    X,
} from 'lucide-react'

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <GraduationCap className="h-8 w-8 text-blue-600" />
                        <span className="ml-2 text-xl font-bold">StudentHub</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center space-x-4">
                        <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                            Dashboard
                        </button>
                        <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                            Notifications
                        </button>
                    </div>

                    {/* User Actions */}
                    <div className="hidden sm:flex items-center space-x-4">
                        <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                            <UserPlus className="h-4 w-4 mr-2" />
                            User
                        </button>
                        <button className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            <LogIn className="h-4 w-4 mr-2" />
                            Logout
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={toggleMobileMenu} className="sm:hidden">
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6 text-gray-500" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-500" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="sm:hidden bg-white shadow-md">
                    <div className="px-4 py-2 space-y-2">
                        <button className="block w-full text-left px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                            Dashboard
                        </button>
                        <button className="block w-full text-left px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                            Notifications
                        </button>
                        <button className="block w-full text-left px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                            User
                        </button>
                        <button className="block w-full text-left px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded">
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
