import { useNavigate } from 'react-router-dom'
import { Book, GraduationCap, Users, Calendar, UserPlus, CheckCircle, Link } from 'lucide-react'

export default function LandingPage() {
    const navigate = useNavigate()

    const navigateToLogin = () => navigate('/login')
    const navigateToRegister = () => navigate('/register')

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <GraduationCap className="h-8 w-8 text-blue-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">StudentHub</span>
                        </div>

                        {/* Buttons: Always Visible */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={navigateToLogin}
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Login
                            </button>
                            <button
                                onClick={navigateToRegister}
                                className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </nav>
            </header>


            <main className="flex-grow">
                <section className="my-auto">
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <div className="flex flex-col md:flex-row items-center justify-between" style={{ gap: '30px' }}>
                                <div className="md:w-1/2 mb-8 md:mb-0">
                                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to StudentHub</h1>
                                    <p className="text-xl text-gray-600 mb-6">Your one-stop portal for all your academic needs.</p>
                                    <div className="space-y-4">
                                        <FeatureItem icon={Book} text="Access all your courses in one place" />
                                        <FeatureItem icon={Users} text="Collaborate with classmates on projects" />
                                        <FeatureItem icon={Calendar} text="Keep track of assignments and exams" />
                                    </div>
                                </div>
                                <div className="md:w-1/2">
                                    <GraduationCap className="h-32 w-32 text-blue-500 mx-auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <HowItWorksItem
                                icon={UserPlus}
                                title="Sign Up"
                                description="Create an account to get started with StudentHub."
                            />
                            <HowItWorksItem
                                icon={Link}
                                title="Connect"
                                description="Join your courses and collaborate with classmates."
                            />
                            <HowItWorksItem
                                icon={CheckCircle}
                                title="Succeed"
                                description="Stay on top of your academics and achieve your goals."
                            />
                        </div>
                    </div>
                </section>

              
            </main>

            <footer className="bg-blue-100 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-black text-sm">© 2024 StudentHub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

function FeatureItem({ icon: Icon, text }) {
    return (
        <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white">
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            <div className="text-base text-gray-700">{text}</div>
        </div>
    )
}

function HowItWorksItem({ icon: Icon, title, description }) {
    return (
        <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-500 text-white mx-auto mb-4">
                <Icon className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}


