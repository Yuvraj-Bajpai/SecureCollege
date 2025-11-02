import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  highlight?: boolean
  className?: string
}

export function StatCard({ 
  label, 
  value, 
  icon, 
  highlight = false,
  className = '' 
}: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-text-secondary mb-1">
              {label}
            </p>
            <p className={`text-2xl font-bold ${highlight ? 'text-primary' : 'text-text'}`}>
              {value}
            </p>
          </div>
          {icon && (
            <div className="text-primary opacity-80">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

