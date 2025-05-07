import { useState, useEffect } from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom'

const Search = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://espressipes-server.vercel.app/drinks`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return response.json();
      }
    })
    .then(data => {
      setDrinks(data.rows);
      setLoading(false);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search</CardTitle>
        <CardDescription>Type to find the recipe you need.</CardDescription>
      </CardHeader>
      <CardContent>
        <Command>
          <CommandInput 
            placeholder = "Type to search..." 
          />
          <CommandList>
            { loading ? 
              <>
                <Skeleton className="h-4 w-full mt-3" />
                <Skeleton className="h-4 w-7/8 mt-3" />
                <Skeleton className="h-4 w-full mt-3" />
                <Skeleton className="h-4 w-7/8 mt-3" />
                <Skeleton className="h-4 w-full mt-3" />
              </>
              :
              <CommandEmpty>No results found. Try the Filter tab!</CommandEmpty>
            }
            { drinks.map((drink, index) => 
            <CommandItem 
              key = { index }
              value = { drink[0] } >
              <Link to = {`/drink/${drink[1]}`} >
                { drink[0] }
              </Link>
            </CommandItem>) }
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  );
}

export default Search
