'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Send, MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle,
  Facebook, Twitter, Instagram, Linkedin, Youtube, ChevronDown, ChevronUp,
  MessageSquare, HelpCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SOCIAL_LINKS, SITE_CONFIG } from '@/lib/constants'
import { PremiumCard } from '@/components/ui/PremiumCard'

const ParticleBackground = dynamic(
  () => import('@/components/common/ParticleBackground').then((mod) => mod.ParticleBackground),
  { ssr: false }
)

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

function ContactForm() {
  const searchParams = useSearchParams()
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

  useEffect(() => {
    const type = searchParams.get('type')
    if (type === 'partnership') {
      setFormData(prev => ({ ...prev, queryType: 'Partnership', userType: 'college' }))
    }
  }, [searchParams])

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

  return (
    <Card className="border border-white/10 bg-white/5 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          Send us a Message
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
            <p className="text-[#A1A1AA]">
              We&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A1A1AA]">
                  Name *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={cn(
                    "bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary",
                    errors.name && "border-red-500/50 focus:border-red-500"
                  )}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A1A1AA]">
                  Email *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={cn(
                    "bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary",
                    errors.email && "border-red-500/50 focus:border-red-500"
                  )}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A1A1AA]">
                  Phone *
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={cn(
                    "bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-primary",
                    errors.phone && "border-red-500/50 focus:border-red-500"
                  )}
                  placeholder="+91 9876543210"
                />
                {errors.phone && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Query Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A1A1AA]">
                  Query Type *
                </label>
                <select
                  value={formData.queryType}
                  onChange={(e) => handleChange('queryType', e.target.value)}
                  className={cn(
                    "w-full h-10 rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary",
                    errors.queryType && "border-red-500/50 focus:ring-red-500"
                  )}
                >
                  <option value="" className="bg-[#121212]">Select a query type</option>
                  {queryTypes.map((type) => (
                    <option key={type} value={type} className="bg-[#121212]">{type}</option>
                  ))}
                </select>
                {errors.queryType && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.queryType}
                  </p>
                )}
              </div>
            </div>

            {/* User Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-[#A1A1AA]">
                I am a *
              </label>
              <div className="flex flex-wrap gap-4">
                {['student', 'parent', 'counselor', 'college'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="userType"
                      value={type}
                      checked={formData.userType === type}
                      onChange={(e) => handleChange('userType', e.target.value)}
                      className="w-4 h-4 border-white/20 bg-white/5 text-primary focus:ring-primary"
                    />
                    <span className="capitalize text-sm text-[#A1A1AA] group-hover:text-white transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#A1A1AA]">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                rows={5}
                className={cn(
                  "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder:text-gray-600",
                  errors.message && "border-red-500/50 focus:ring-red-500"
                )}
                placeholder="Please describe your query in detail..."
              />
              {errors.message && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Consent */}
            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => handleChange('consent', e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary mt-1"
                />
                <span className="text-sm text-[#A1A1AA] group-hover:text-white transition-colors">
                  I consent to being contacted by Secure College regarding my query and agree to the privacy policy. *
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.consent}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="xl"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)

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
    <div className="relative min-h-screen bg-[#0A0A0A] bg-gradient-to-b from-[#0F0F0F] to-[#0A0A0A] text-white overflow-hidden">
      <ParticleBackground />

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 inset-x-0 h-[40rem] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(91,141,239,0.12),transparent)] blur-3xl" />
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#5B8DEF]/10 blur-3xl" />
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#5B8DEF]/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-[#8B5CF6]/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="show"
              variants={sectionVariants}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                style={{ textShadow: '0 0 18px rgba(91, 141, 239, 0.35)' }}
              >
                Let&apos;s Start a <span className="text-primary">Conversation</span>
              </h1>
              <p className="text-lg md:text-xl text-[#A1A1AA] max-w-2xl mx-auto">
                Have questions about colleges, admissions, or partnerships? Our team is here to provide the support you need.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
            {/* Left: Info Column (4/12) */}
            <div className="lg:col-span-5 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <PremiumCard className="h-full">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                            <MapPin className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-white mb-1">Our Office</h3>
                            <p className="text-[#A1A1AA] text-sm leading-relaxed">
                              123 Education Street, New Delhi,<br />
                              Delhi 110001, India
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                            <Phone className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-white mb-1">Phone</h3>
                            <p className="text-[#A1A1AA] text-sm">{SITE_CONFIG.phone}</p>
                            <p className="text-xs text-[#52525B] mt-1">Mon-Fri, 9AM-6PM IST</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                            <Mail className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-white mb-1">Email</h3>
                            <p className="text-[#A1A1AA] text-sm">{SITE_CONFIG.contactEmail}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <h3 className="font-bold text-white mb-4">Follow Our Journey</h3>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { icon: Facebook, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
                          { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' },
                          { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
                          { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
                          { icon: Youtube, href: SOCIAL_LINKS.youtube, label: 'YouTube' },
                        ].map((social) => (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-[#A1A1AA] hover:bg-primary hover:text-white transition-all border border-white/5 hover:border-primary"
                            aria-label={social.label}
                          >
                            <social.icon className="w-5 h-5" />
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white mb-3">Business Hours</h3>
                          <div className="space-y-2">
                            {businessHours.map((schedule, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span className="text-[#A1A1AA]">{schedule.day}</span>
                                <span className="text-white font-medium">{schedule.hours}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            </div>

            {/* Right: Form Column (7/12) */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Suspense fallback={<div className="h-[600px] w-full bg-white/5 animate-pulse rounded-2xl" />}>
                  <ContactForm />
                </Suspense>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white/[0.02]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
                  <HelpCircle className="w-3 h-3" />
                  Support Center
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                <p className="text-[#A1A1AA]">Quick answers to common questions about our platform.</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq) => (
                  <Collapsible 
                    key={faq.id} 
                    open={openFaq === faq.id}
                    onOpenChange={(isOpen) => setOpenFaq(isOpen ? faq.id : null)}
                  >
                    <Card className="border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden transition-all hover:bg-white/10">
                      <CollapsibleTrigger className="w-full">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-left text-white">{faq.question}</h3>
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center bg-white/5 transition-transform",
                              openFaq === faq.id ? "rotate-180 bg-primary/20" : ""
                            )}>
                              <ChevronDown className={cn(
                                "w-5 h-5 transition-colors",
                                openFaq === faq.id ? "text-primary" : "text-[#A1A1AA]"
                              )} />
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="px-6 pb-6 pt-0 border-t border-white/5 mt-0 animate-in fade-in slide-in-from-top-1">
                          <p className="text-[#A1A1AA] text-sm leading-relaxed pt-4">{faq.answer}</p>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
