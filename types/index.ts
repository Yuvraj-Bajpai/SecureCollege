export interface College {
  id: string
  name: string
  slug: string
  city: string
  state: string
  category: CollegeCategory
  establishmentYear: number
  approval: string
  type: CollegeType
  ownership: OwnershipType
  nirfRank: number | null
  officialWebsite: string
  logo: string
  coverImage: string
  description: string
  highlights: string[]
  courses: Course[]
  facilities: string[]
  reviews: Review[]
  virtualTourUrl: string | null
  campusImages: string[]
  location: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  stats: CollegeStats
  admission: AdmissionInfo
  contact: ContactInfo
  createdAt: Date
  updatedAt: Date
}

export type CollegeCategory = 
  | "Engineering" 
  | "Medical" 
  | "Management" 
  | "Arts"
  | "Commerce"
  | "Law"
  | "Science"

export type CollegeType = "Government" | "Private" | "Autonomous" | "Deemed University"

export type OwnershipType = "Public" | "Private" | "Public-Private Partnership"

export interface Course {
  id: string
  name: string
  degree: string
  duration: string
  fees: {
    annual: number
    total?: number
  }
  seats: number
  eligibility: string[]
  cutoff: CutoffData
}

export interface CutoffData {
  year: number
  general: number
  obc?: number
  sc?: number
  st?: number
  ews?: number
  [key: string]: number | undefined
}

export interface Review {
  id: string
  userId: string
  userName: string
  userImage: string | null
  rating: number
  title: string
  content: string
  pros: string[]
  cons: string[]
  verified: boolean
  helpful: number
  createdAt: Date
  updatedAt: Date
}

export interface CollegeStats {
  totalStudents: number
  totalFaculty: number
  studentFacultyRatio: number
  placementPercentage: number
  averagePackage: number
  highestPackage: number
  totalCompanies: number
  nirfRank?: number
}

export interface AdmissionInfo {
  entranceExams: string[]
  applicationDeadline: Date
  selectionCriteria: string[]
  documentsRequired: string[]
  applicationFee: number
  applyUrl: string
}

export interface ContactInfo {
  email: string[]
  phone: string[]
  principal?: string
  admissionOffice?: string
}

export interface SearchFilters {
  states?: string[]
  cities?: string[]
  categories?: CollegeCategory[]
  ownership?: OwnershipType[]
  types?: CollegeType[]
  nirfRank?: number
  minPackage?: number
  facilities?: string[]
  entranceExams?: string[]
}

export interface ComparisonItem {
  collegeId: string
  college?: College
}

export interface User {
  id: string
  name: string
  email: string
  image: string | null
  role: UserRole
  preferences: UserPreferences
  bookmarks: string[]
  createdAt: Date
}

export type UserRole = "student" | "parent" | "advisor" | "admin"

export interface UserPreferences {
  preferredStates: string[]
  preferredCategories: CollegeCategory[]
  maxBudget: number | null
  priorityFactors: string[]
}

