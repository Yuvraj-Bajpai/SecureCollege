// jest.setup.js
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
    entries: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
    forEach: jest.fn(),
  }),
  usePathname: () => '/',
}))

// Mock Next.js fonts
jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'font-inter',
    style: { fontFamily: 'Inter' },
  }),
  Poppins: () => ({
    className: 'font-poppins',
    style: { fontFamily: 'Poppins' },
  }),
}))

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'