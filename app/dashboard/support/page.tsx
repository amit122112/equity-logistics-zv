"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, FileText, Send } from "lucide-react"
import { getToken } from "@/lib/auth"

export default function SupportPage() {
  const [supportMessage, setSupportMessage] = useState("")
  const [supportCategory, setSupportCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  // Remove this line:
  // const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const token = getToken()

      // Log the request details for debugging
      console.log("Sending support request:", {
        category: supportCategory,
        message: supportMessage,
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Support`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category: supportCategory,
          message: supportMessage,
        }),
      })

      console.log("Support API response status:", response.status)

      if (!response.ok) {
        const errorData = await response.text()
        console.error("Support API error:", errorData)
        throw new Error(`Error submitting support request: ${response.status} ${errorData}`)
      }

      // Success state
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setSupportMessage("")
      setSupportCategory("")

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error("Support request failed:", error)
      setIsSubmitting(false)
      setSubmitError(error instanceof Error ? error.message : "Failed to submit support request")
    }
  }

  return (
    <div className="bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black">Support Center</h1>
        <p className="text-gray-600">Get help with your shipments and account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg shadow border border-green-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <Phone className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Call Us</h3>
              <p className="text-sm text-gray-600">Mon-Fri, 9am-5pm</p>
              <p className="mt-2 text-green-600 font-medium">+61 xxxxxxxx</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg shadow border border-purple-100">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <Mail className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Email Support</h3>
              <p className="text-sm text-gray-600">24/7 email support</p>
              <p className="mt-2 text-purple-600 font-medium">support@example.com.au</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-lg shadow border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-md text-blue-700">
            <FileText size={20} />
          </div>
          <h2 className="text-lg font-semibold text-black">Submit a Support Request</h2>
        </div>

        {submitSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Request Submitted</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Thank you for contacting us. Our support team will respond to your inquiry within 24 hours.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{submitError}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={supportCategory}
                onChange={(e) => setSupportCategory(e.target.value)}
                className="w-full border border-gray-300 text-black rounded-md py-2 px-3"
                required
              >
                <option value="">Select a category</option>
                <option value="Shipment">Shipment Issue</option>
                <option value="Account">Account Problem</option>
                <option value="Billing">Billing Question</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                placeholder="Describe your issue in detail..."
                className="w-full border border-gray-300 text-black rounded-md py-2 px-3 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit Request
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
