import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
                <Image src="/medify_logo.png" alt="Medify Logo" width={200} height={200} className="mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Your health, our priority</p>                
                <p className="text-sm">&copy; {new Date().getFullYear()} Medify. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                    <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
                    <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                    <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </footer>
   </div>
  )
}

export default Footer