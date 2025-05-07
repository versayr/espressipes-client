import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Drink {
  id: number,
  name: string,
  ingredients: string,
  description: string,
  sizes: string,
  steps: string,
  tags: string,
  createdAt: "DATETIME",
  isCurrentSpecial: boolean,
}

const Drink = () => {
  const { id } = useParams();
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://espressipes-server.vercel.app/drinks/${id}`)
      .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return response.json();
      }
    })
    .then(data => {
      setDrinks(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card className= "sm:w-full md:w-[600px]" >
      { loading ?
        <>
          <CardHeader>
            <Skeleton className="h-5 w-[200px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-[250px] mb-6" />
            <Skeleton className="h-4 w-[270px] mb-6" />
            <Skeleton className="h-4 w-[250px] mb-6" />
            <Skeleton className="h-4 w-[270px] mb-6" />
            <Skeleton className="h-4 w-[250px] mb-6" />
            <Skeleton className="h-4 w-[270px] mb-6" />
            <Skeleton className="h-4 w-[250px] mb-6" />
          </CardContent>
        </>
        :
        <>
          { drinks.map(drink =>
          <div key = {`${drink.id}${drink.name}`}>
            <CardHeader>
              <CardTitle className = 'text-xl'>
                { drink.name }
              </CardTitle>
              <CardDescription>
                { drink.description }
              </CardDescription>
            </CardHeader>
            <Separator className = "my-4" />
            <CardContent className = "text-left" >
              <h3 className = "font-semibold" >Ingredients</h3>
              <p>{ drink.ingredients }</p>
              <Separator className = "mt-4" />
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className = "font-semibold" >Sizes</AccordionTrigger>
                  <AccordionContent>
                    { drink.sizes.split(',').map((size, index) => <p key = { index } className = "mb-1" > { size } </p> )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Separator className = "mb-4" />
              <h3 className = "font-semibold" >Steps</h3>
              { drink.steps.split(',').map((step, index) => 
              <p key = {`${index}`} className = "my-2" > <strong>{ index + 1 } )</strong>  { step } </p>) }
              <Separator className = "mt-4" />
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className = "font-semibold" >Tags</AccordionTrigger>
                  <AccordionContent>
                    {drink.tags.split(',').map((tag, index) => 
                    <p key={ index }> { tag } </p>)} 
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </div>
  )}
          <Separator />
          <CardFooter className = "place-content-center" >
            <Button asChild >
              <Link to = '/' >
                Home
              </Link>
            </Button>
          </CardFooter>
        </>
      }
    </Card>
  )
}

export default Drink;
