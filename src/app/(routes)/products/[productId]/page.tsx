
import { Card, CardContent } from "@/src/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/src/components/ui/carousel";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const Singlepages = async ({
    params
  }: {
    params: { productId: number }
  }) => {
    const client = new ApolloClient({
        uri: 'http://localhost:1337/graphql',
        cache: new InMemoryCache()
    });
    
    const { data } = await client.query({
        query: gql`
        query {
        products(filters: { id: { eq: ${params.productId} } }) {
            data {
                attributes {
                    image_catalogue {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    name
                }
            }
        }
        }
        `
    })
    let img_url: string[] = []
    for(let i = 0; i< data.products.data[0].attributes.image_catalogue.data.length;i++){
        img_url.push(process.env.NEXT_PUBLIC_API_URL!.toString()!.concat(data.products.data[0].attributes.image_catalogue.data[i].attributes.url.toString()))
    }
    
    return(
        <div className="flex pt-28">
            <div className="flex w-1/2 justify-center h-1/2" >
                <Carousel className="w-full max-w-xs" opts={{
                    align: "start",
                    loop: true,
                }}>
                <CarouselContent>
                {img_url.map((item: string) => (
                    <CarouselItem key={item}>
                        <Card>
                        <CardContent className="flex justify-center fit w-auto">
                            <img src={item} alt="" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                        </CardContent>
                        </Card>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
            </div>
            <div className="flex w-1/2">
                {data.products.data[0].attributes.name}
            </div>
        </div>
    );
}

export default Singlepages;