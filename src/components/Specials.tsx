import { Button } from "./ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Link } from 'react-router-dom'

type Drink = [ string, number]

type Specials = {
  items: Drink[]
}

const Specials: React.FC<Specials> = ({ items }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Specials</CardTitle>
        <CardDescription>Check out our newest drinks at a glance.</CardDescription>
      </CardHeader>
      <CardContent className = "grid gap-4 md:grid-cols-2">
        {items.map((drink, index) => {
          const [ title, id ] = drink;
          return <Button 
            variant = "outline" 
            size    = "lg"
            key     = { index } 
            asChild >
            <Link to={`/drink/${id}`} >
              { title }
            </Link>
          </Button>
        })}
      </CardContent>
    </Card>
  );
}

export default Specials
