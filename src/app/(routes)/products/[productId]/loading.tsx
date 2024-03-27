import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Divider, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { CarouselContent } from '@/src/components/ui/carousel';

export default function Animations() {
  return (
    <div className="flex pt-28">
            <div className="flex w-1/2 justify-center h-1/2" >
                <Skeleton animation="wave" height={1000} width={1000}/>
            </div>
            <div>
                <Typography variant="h4" component="h3">
                    <Skeleton animation="wave" />
                <Divider/>
                </Typography>
                <p>Categories: <Skeleton animation="wave" /></p>
                <p>Sub Categories: <Skeleton animation="wave" /></p>
                <p>Sub Sub Categories: <Skeleton animation="wave" /></p>
                <Typography variant="h5" component="h3">
                <br/><u>Features:</u>
                </Typography>
                <Skeleton animation="wave" />
                <Typography variant="h5" component="h3">
                <br/><u>Specs:</u>
                </Typography>
                <Skeleton animation="wave" />
            </div>
        </div>
  );
}