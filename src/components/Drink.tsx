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

type Drink = [ number, string, string, string, string, string, string, string ]

const Drink = () => {
  const { id } = useParams();
  const [drink, setDrink] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/drinks/${id}`)
      .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return response.json();
      }
    })
    .then(data => {
      setDrink(data.rows[0]);
      setLoading(false);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }, [id]);

  return (
    <Card className= "md:w-[600px]" >
      { loading ?
        <Skeleton className="h-4 w-[250px]" />
        :
        <>
          <CardHeader>
            <CardTitle className = 'text-xl'>
              { drink[1] }
            </CardTitle>
            <CardDescription>
              { drink[3] }
            </CardDescription>
          </CardHeader>
          <Separator className = "my-4" />
          <CardContent className = "text-left" >
            <h3 className = "font-semibold" >Ingredients</h3>
            <p>{ drink[2] }</p>
            <Separator className = "my-4" />
            <h3 className = "font-semibold" >Sizes (in ounces)</h3>
            <p>{ drink[4] }</p>
            <Separator className = "my-4" />
            <h3 className = "font-semibold" >Steps</h3>
            {drink[5].split(',').map((step, index) => 
                <p>
                  { index + 1 } - { step }
                </p>
            )}
            <Separator className = "my-4" />
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className = "font-semibold" >Tags</AccordionTrigger>
                <AccordionContent>
                  {drink[6].split(',').map((tag, index) => 
                      <p key={ index }>
                        { tag }
                      </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
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
