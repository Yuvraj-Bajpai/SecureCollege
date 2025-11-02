'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Send, MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle,
  Facebook, Twitter, Instagram, Linkedin, Youtube, ChevronDown, ChevronUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SOCIAL_LINKS, SITE_CONFIG } from '@/lib/constants'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: 'student',
    queryType: '',
    message: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const queryTypes = [
    'General Inquiry',
    'Admission Support',
    'Technical Support',
    'Partnership',
    'Feedback',
    'Other'
  ]

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.queryType) newErrors.queryType = 'Please select a query type'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    if (!formData.consent) newErrors.consent = 'Please give consent'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        userType: 'student',
        queryType: '',
        message: '',
        consent: false
      })
      setTimeout(() => setShowSuccess(false), 5000)
    }, 1500)
  }

  const faqs = [
    {
      id: '1',
      question: 'How can I add my college to Secure College?',
      answer: 'Colleges can be added by our team after verification. Please email us at info@securecollege.in with your college details for review.'
    },
    {
      id: '2',
      question: 'Are all college ratings verified?',
      answer: 'Yes, we verify all student reviews and ratings before publishing to ensure authenticity and prevent spam.'
    },
    {
      id: '3',
      question: 'How do I update college information?',
      answer: 'If you are an authorized representative of a college, contact us through this form or email info@securecollege.in to request updates.'
    },
    {
      id: '4',
      question: 'Can I get admission counseling through Secure College?',
      answer: 'Yes! Our expert counselors are available to help with college selection, admission process, and career guidance. Schedule a consultation through our platform.'
    },
    {
      id: '5',
      question: 'Is Secure College free to use?',
      answer: 'Absolutely! All basic features including college search, comparison, and reviews are completely free. Some premium features may require a subscription.'
    }
  ]

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ]

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "Secure College",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": SITE_CONFIG.contactEmail,
                "telephone": SITE_CONFIG.phone
              }
            }
          })
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-50 to-blue-100 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Get in Touch with Secure College
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Have a question? We&apos;re here to help. Reach out to us through any of the channels below.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* Left: Contact Form (60%) */}
            <div className="lg:col-span-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  {showSuccess ? (
                    <div className="text-center py-12">
                      <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-600" />
                      <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-gray-600">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className={cn(
                            errors.name && "border-error focus:border-error focus:ring-error"
                          )}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="text-sm text-error mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={cn(
                            errors.email && "border-error focus:border-error focus:ring-error"
                          )}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-sm text-error mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone *
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className={cn(
                            errors.phone && "border-error focus:border-error focus:ring-error"
                          )}
                          placeholder="+91 9876543210"
                        />
                        {errors.phone && (
                          <p className="text-sm text-error mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* User Type */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          I am a *
                        </label>
                        <div className="flex gap-6">
                          {['student', 'parent', 'counselor', 'college'].map((type) => (
                            <label key={type} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="userType"
                                value={type}
                                checked={formData.userType === type}
                                onChange={(e) => handleChange('userType', e.target.value)}
                                className="w-4 h-4 text-primary"
                              />
                              <span className="capitalize">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Query Type */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Query Type *
                        </label>
                        <select
                          value={formData.queryType}
                          onChange={(e) => handleChange('queryType', e.target.value)}
                          className={cn(
                            "w-full h-11 rounded-md border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary",
                            errors.queryType && "border-error focus:border-error focus:ring-error"
                          )}
                        >
                          <option value="">Select a query type</option>
                          {queryTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        {errors.queryType && (
                          <p className="text-sm text-error mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.queryType}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          rows={6}
                          className={cn(
                            "w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none",
                            errors.message && "border-error focus:border-error focus:ring-error"
                          )}
                          placeholder="Please describe your query in detail..."
                        />
                        {errors.message && (
                          <p className="text-sm text-error mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Consent */}
                      <div>
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.consent}
                            onChange={(e) => handleChange('consent', e.target.checked)}
                            className="w-4 h-4 text-primary mt-0.5"
                          />
                          <span className="text-sm text-gray-700">
                            I consent to being contacted by Secure College regarding my query. *
                          </span>
                        </label>
                        {errors.consent && (
                          <p className="text-sm text-error mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.consent}
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary-600"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right: Info Cards (40%) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Office Address */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Office Address</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        123 Education Street,<br />
                        New Delhi, Delhi 110001<br />
                        India
                      </p>
                      <a 
                        href="https://maps.google.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        View on Map →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phone & Email */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Phone</h3>
                      <p className="text-gray-600 text-sm mb-1">
                        {SITE_CONFIG.phone}
                      </p>
                      <p className="text-xs text-gray-500">Mon-Fri, 9AM-6PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Email</h3>
                      <a 
                        href={`mailto:${SITE_CONFIG.contactEmail}`}
                        className="text-primary hover:underline text-sm"
                      >
                        {SITE_CONFIG.contactEmail}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Follow Us</h3>
                  <div className="flex items-center gap-3">
                    <a
                      href={SOCIAL_LINKS.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={SOCIAL_LINKS.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href={SOCIAL_LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={SOCIAL_LINKS.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors"
                      aria-label="YouTube"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-3">Business Hours</h3>
                      <div className="space-y-2">
                        {businessHours.map((schedule, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-600">{schedule.day}</span>
                            <span className="font-medium">{schedule.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <Collapsible 
                  key={faq.id} 
                  open={openFaq === faq.id}
                  onOpenChange={(isOpen) => setOpenFaq(isOpen ? faq.id : null)}
                >
                  <Card>
                    <CollapsibleTrigger className="w-full">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-left">{faq.question}</h3>
                          {openFaq === faq.id ? (
                            <ChevronUp className="w-5 h-5 text-primary flex-shrink-0 ml-4" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-primary flex-shrink-0 ml-4" />
                          )}
                        </div>
                      </CardContent>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="px-6 pb-6 pt-0">
                        <p className="text-gray-600">{faq.answer}</p>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </div>
        </section>

        {/* Alternative Contact Methods */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Other Ways to Reach Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Speak directly with our support team
                </p>
                <a 
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-primary hover:underline font-medium"
                >
                  {SITE_CONFIG.phone}
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Drop us a line anytime
                </p>
                <a 
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="text-primary hover:underline font-medium"
                >
                  {SITE_CONFIG.contactEmail}
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Visit Us</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Walk-in appointments welcome
                </p>
                <a 
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  View Location →
                </a>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  )
}

