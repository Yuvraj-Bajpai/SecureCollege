export async function GET() {
  return Response.json({ 
    status: 'ok', 
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || 'development'
  })
}

