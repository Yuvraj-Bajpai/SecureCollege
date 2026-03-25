export const SITE_CONFIG = {
  name: "Secure College",
  tagline: "Your Gateway to Dream Colleges",
  description: "Find and compare top private colleges across India with deep insights, virtual tours, and expert guidance — for every course, every rank.",
  url: "https://securecollege.in",
  contactEmail: "securecollege6@gmail.com",
  phone: "+91 90441 43686",
  brandColors: {
    primary: "#6B9EFF", // Logo blue
    secondary: "#000000", // Logo black
    accent: "#4A7FFF",
  },
}

export const NAVIGATION_LINKS = [
  { label: "Home", href: "/" },
  { label: "Students", href: "/students" },
  { label: "Premium", href: "/premium" },
  { label: "About", href: "/about" },
  { label: "Partner With Us", href: "/partner" },
]

export const FEATURED_STATES = [
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Delhi",
  "West Bengal",
  "Uttar Pradesh",
]

export const FEATURED_CITIES = [
  "Mumbai",
  "Bangalore",
  "Pune",
  "Chennai",
  "Hyderabad",
  "Delhi",
  "Kolkata",
  "Ahmedabad",
]

export const COLLEGE_CATEGORIES = [
  "Engineering",
  "Medical",
  "Management",
  "Arts",
  "Commerce",
  "Law",
  "Science",
] as const

export const ENTRANCE_EXAMS = [
  "JEE Main",
  "JEE Advanced",
  "MHT CET",
  "KCET",
  "TNEA",
  "AP EAMCET",
  "TS EAMCET",
  "WBJEE",
  "BITSAT",
  "VITEEE",
  "SRMJEEE",
  "MET",
  "Other",
]

export const FACILITIES = [
  "Library",
  "Laboratories",
  "Hostel",
  "Cafeteria",
  "Sports Complex",
  "Gym",
  "Medical Facilities",
  "Wi-Fi Campus",
  "Auditorium",
  "Transportation",
  "Bank & ATM",
  "Shopping Center",
]

export const STAT_DEFINITIONS = {
  totalStudents: "Total enrolled students",
  totalFaculty: "Teaching faculty members",
  studentFacultyRatio: "Student to faculty ratio",
  placementPercentage: "Percentage of students placed",
  averagePackage: "Average annual package (LPA)",
  highestPackage: "Highest annual package (LPA)",
  totalCompanies: "Total companies visiting campus",
  nirfRank: "NIRF ranking (if applicable)",
}

export const BENEFITS = [
  {
    title: "Comprehensive Data",
    description: "Access detailed information about colleges, courses, fees, and placements.",
    icon: "Database",
  },
  {
    title: "Expert Reviews",
    description: "Read authentic reviews from students, alumni, and experts.",
    icon: "Users",
  },
  {
    title: "Virtual Tours",
    description: "Explore college campuses virtually from anywhere.",
    icon: "Camera",
  },
  {
    title: "Smart Compare",
    description: "Compare multiple colleges side-by-side on key parameters.",
    icon: "TrendingUp",
  },
]

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/secure-college-a4858138a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  instagram: "https://www.instagram.com/securecollegee/?hl=en",
  mailto: "mailto:securecollege6@gmail.com",
}

/** Shared copy for home + students “Loved by ambitious students” sections */
export const STUDENT_TESTIMONIALS = [
  {
    name: 'Aayush Sharma',
    college: 'Galgotias University',
    text: 'Secure College made my admission process very smooth. Abhay sir and Sahil sir were very responsive and helped me with everything, from admission form filling to last-moment formalities and even hostel admission support.',
    rating: 5,
  },
  {
    name: 'Ishita Dayal',
    college: 'ABES College',
    text: 'My experience with Secure College was really good. Avantika ma’am and Abhay sir guided me at every step, cleared all doubts quickly, and made admission plus hostel process easy and stress-free.',
    rating: 5,
  },
  {
    name: 'Rahul Joshi',
    college: 'JSS Noida',
    text: 'Secure College helped me a lot during my admission. Sahil sir and Abhay sir were always responsive, supported me in form filling, documentation, and hostel admission, and made the whole process simple and smooth.',
    rating: 5,
  },
] as const

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Guides", href: "/guides" },
    { label: "FAQs", href: "/faqs" },
    { label: "Help Center", href: "/help" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
}

export const COLLEGE_TYPES = ["Government", "Private", "Autonomous", "Deemed University"] as const

export const OWNERSHIP_TYPES = ["Public", "Private", "Public-Private Partnership"] as const

export const INDIAN_STATES = [
  'All India',
  'Uttar Pradesh',
  'Delhi NCR',
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Telangana',
  'Haryana',
  'Rajasthan',
  'West Bengal',
  'Andhra Pradesh',
  'Madhya Pradesh',
  'Gujarat',
  'Punjab',
  'Kerala',
  'Odisha',
  'Bihar',
  'Jharkhand',
  'Chhattisgarh',
  'Uttarakhand',
  'Assam',
  'Himachal Pradesh',
  'Goa',
  'Jammu & Kashmir',
  'Chandigarh',
  'Other States'
]

