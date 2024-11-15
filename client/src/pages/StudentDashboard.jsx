

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Book, Calendar, Trophy, Library, MessageSquare, LineChart } from 'lucide-react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import OndutyDrawer from '../components/OndutyDrawer'

export default function StudentDashboard() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false) // Lift state here

    const slides = [
        { title: "Welcome to Student Portal", subtitle: "Access all your academic resources in one place", image: "/placeholder.svg?height=400&width=800" },
        { title: "Upcoming Examinations", subtitle: "Stay prepared with our exam schedule", image: "/placeholder.svg?height=400&width=800" },
        { title: "Library Resources", subtitle: "Access thousands of digital resources", image: "/placeholder.svg?height=400&width=800" }
    ]

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Carousel */}
            <div className="relative bg-gray-900">
                <div className="relative h-[400px] overflow-hidden">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div className="absolute inset-0 bg-black/50" />
                            <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
                                    <p className="text-xl">{slide.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/30 rounded-full hover:bg-white/50">
                        <ChevronLeft className="h-6 w-6 text-white" />
                    </button>
                    <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/30 rounded-full hover:bg-white/50">
                        <ChevronRight className="h-6 w-6 text-white" />
                    </button>
                </div>

                {/* Permission Request Section */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-4xl">
                    <div className="mx-4 flex flex-col md:flex-row items-center gap-4 rounded-lg bg-white p-6 shadow-lg">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-lg font-semibold text-gray-800">Permission for On-Duty</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Need a day off for important reasons? Click the button below to request permission for on-duty status.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsDrawerOpen(true)} // Open drawer here
                            className="whitespace-nowrap rounded-md bg-blue-600 px-4 py-2.5 text-sm text-white hover:bg-blue-700"
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Access Grid */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
                <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                        { icon: Book, title: 'Courses', desc: 'Access your enrolled courses' },
                        { icon: Calendar, title: 'Schedule', desc: 'View your class timeline' },
                        { icon: Trophy, title: 'Grades', desc: 'Check your performance' },
                        { icon: Library, title: 'Library', desc: 'Browse digital resources' },
                        { icon: MessageSquare, title: 'Forums', desc: 'Discuss with peers' },
                        { icon: LineChart, title: 'Progress', desc: 'Track your learning' },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="p-3 bg-blue-100 rounded-full">
                                <item.icon className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="mt-4 font-semibold text-gray-900">{item.title}</h3>
                            <p className="mt-1 text-sm text-gray-500 text-center">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <OndutyDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            <Footer />
        </div>
    )
}
