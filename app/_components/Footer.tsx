import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-8">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <Image src="/medify_logo.png" alt="Medify Logo" width={160} height={160} />
              <p className="text-gray-400 text-sm max-w-xs text-center md:text-left">
                AI-powered medical voice agents delivering compassionate, intelligent healthcare guidance 24/7.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-10 text-sm">
              <div className="flex flex-col gap-2">
                <p className="text-white font-semibold mb-1">Company</p>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
                <Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white font-semibold mb-1">Legal</p>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white font-semibold mb-1">Product</p>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
                <Link href="/sign-up" className="text-gray-400 hover:text-white transition-colors">Get Started</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Medify. All rights reserved.</p>
            <p>Your health, our priority.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer