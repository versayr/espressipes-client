import { useState, useEffect } from 'react'
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs'
import Specials from './Specials'
import Search from './Search'

const Home = () => {
  const [specials, setSpecials] = useState([]);

  useEffect(() => {
    fetch(`https://espressipes-server.vercel.app/drinks/specials`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return response.json();
      }
    })
    .then(data => {
      setSpecials(data.rows)
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }, []);

  return (
    <>
      <h1 className = "font-bold text-2xl mt-6">Espresso Recipes</h1>
      <Tabs defaultValue = "specials" className = "sm:w-full md:w-[600px] text-lg mt-6">
        <TabsList className = "grid w-full grid-cols-3">
          <TabsTrigger value = "specials">Specials</TabsTrigger>
          <TabsTrigger value = "search">Search</TabsTrigger>
          <TabsTrigger value = "filter">Filter</TabsTrigger>
        </TabsList>
        <TabsContent value = "specials">
          <Specials items = { specials } />
        </TabsContent>
        <TabsContent value = "search">
          <Search />
        </TabsContent>
        <TabsContent value = "filter">
          <p>Coming soon!</p>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default Home
