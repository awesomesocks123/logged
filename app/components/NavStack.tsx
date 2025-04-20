'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function NavStack() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-md hover:bg-gray-200 transition-colors"
      >
        <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
      </button>

      {/* Sidebar navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Side panel */}
          <div className="relative h-full w-64 bg-white shadow-xl">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-md hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            {/* Navigation links */}
            <nav className="pt-16 px-4 space-y-4">
              <Link 
                href="/dashboard" 
                className="block p-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/tasks"
                className="block p-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Tasks
              </Link>
              <Link
                href="/settings"
                className="block p-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}