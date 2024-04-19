import SingleProductTable from "@/src/components/single-product-table";
import { Card, CardContent } from "@/src/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/src/components/ui/carousel";
import { getSingleProduct } from "@/src/utils/get-data";
import { Divider, Link, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
    title: 'Single Products - SB Acoustics',
    description: 'All Products Provided by SB Acoustics',
}


const Singlepages = async ({
    params
  }: {
    params: { productId: string }
  }) => {
    let data = await getSingleProduct(params.productId)
    let datasheet_url = `${process.env.NEXT_PUBLIC_API_URL}${data.datasheet}`
    return(
        <div className="flex pt-28">
            <div className="flex w-1/2 justify-center h-1/2" >
                <div>
                    <div>
                        <Typography variant="h5" component="h3">
                            <Carousel className="w-full max-w-xs" opts={{
                                align: "start",
                                loop: true,
                                }}>
                                <CarouselContent>
                                    {data.Url.map((item: string, index: number) => (
                                        <CarouselItem key={item}>
                                            <Card>
                                                <CardContent className="flex justify-center fit w-auto">
                                                    <Image 
                                                        src={item} 
                                                        alt={data.Alt[index]} 
                                                        width={1000}
                                                        height={1000}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h5" component="h3">
                            <br/><p><u>Download:</u></p>
                        </Typography>
                        <Link key={data.id} href={datasheet_url} target="_blank">Download Datasheet</Link>
                    </div>
                </div>
            </div>
            <div>
                <Typography variant="h4" component="h3">
                    {data.name}
                <Divider/>
                </Typography>
                <p>Categories: 
                {data.categories.map((category, index) => (
                    <React.Fragment key={index}>
                        <Link key={index} href={`/products?categorySlug=${category.name.toLowerCase().replace(/\s+/g, '-')}`}> {category.name}</Link>
                        {index !== data.categories.length - 1 && ','}
                    </React.Fragment>
                ))}</p>
                <p>Sub Categories: 
                {data.sub_categories.map((subcategory, index) => (
                    <React.Fragment key={index}>
                        <Link key={index} href={`/products?subcategorySlug=${subcategory.name.toLowerCase().replace(/\s+/g, '-')}`}> {subcategory.name}</Link>
                        {index !== data.sub_categories.length - 1 && ','}
                    </React.Fragment>
                ))}</p>
                <p>Sub Sub Categories: 
                {data.sub_sub_categories.map((subsubcategory, index) => (
                    <React.Fragment key={index}>
                        <Link key={index} href={`/products?subsubcategorySlug=${subsubcategory.name.toLowerCase().replace(/\s+/g, '-')}`}> {subsubcategory.name}</Link>
                        {index !== data.sub_sub_categories.length - 1 && ','}
                    </React.Fragment>
                ))}</p>
                <Typography variant="h5" component="h3">
                <br/><u>Features:</u>
                </Typography>
                <ReactMarkdown>
                    {data.desc}
                </ReactMarkdown>
                <Typography variant="h5" component="h3">
                <br/><u>Specs:</u>
                </Typography>
                {SingleProductTable(data.specification)}
            </div>
        </div>
    );
}

export default Singlepages;