import React from 'react'

const Footer = () => {
  return (
    <div>
    
          {/* Footer */}
          <footer className="bg-gray-900 text-white " style={{marginTop:'5%'}}>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* About Section */}
                      <div>
                          <h4 className="text-lg font-semibold mb-4">About StudentHub</h4>
                          <p className="text-sm text-gray-400">
                              StudentHub is your one-stop platform for managing academic tasks, accessing resources, and tracking progress. Empowering students for a brighter future.
                          </p>
                      </div>

                      {/* Quick Links */}
                      <div>
                          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                          <ul className="space-y-2">
                              <li>
                                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                                      Dashboard
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                                      Courses
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                                      Resources
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                                      Contact Us
                                  </a>
                              </li>
                          </ul>
                      </div>

                      {/* Contact Section */}
                      <div>
                          <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
                          <p className="text-sm text-gray-400">Email: support@studenthub.com</p>
                          <p className="text-sm text-gray-400">Phone: +123 456 7890</p>
                          <p className="text-sm text-gray-400 mt-4">
                              Follow us:
                              <a href="#" className="ml-2 text-blue-400 hover:text-blue-500">
                                  Facebook
                              </a>
                              <a href="#" className="ml-2 text-blue-400 hover:text-blue-500">
                                  Twitter
                              </a>
                              <a href="#" className="ml-2 text-blue-400 hover:text-blue-500">
                                  Instagram
                              </a>
                          </p>
                      </div>
                  </div>

                  {/* Divider and Copyright */}
                  <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                      <p className="text-sm text-gray-500">
                          © {new Date().getFullYear()} StudentHub. All rights reserved.
                      </p>
                  </div>
              </div>
          </footer>
</div>
  )
}

export default Footer