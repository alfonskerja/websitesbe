import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
  return (
    <div className="bg-white pt-28">
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <div className="hidden lg:block">
            <div  className="mb-8"><Skeleton animation="wave" /></div>
            <div  className="mb-8"><Skeleton animation="wave" /></div>
            <div  className="mb-8"><Skeleton animation="wave" /></div>
            <div  className="mb-8"><Skeleton animation="wave" /></div>
            <div  className="mb-8"><Skeleton animation="wave" /></div>
            <div  className="mb-8"><Skeleton animation="wave" /></div>
            <div  className="mb-8"><Skeleton animation="wave" /></div>
            <div  className="mb-8"><Skeleton animation="wave" /></div>
            <div  className="mb-8"><Skeleton animation="wave" /></div>
            <div  className="mb-8"><Skeleton animation="wave" /></div>
          </div> 
            <div className="mt-6 lg:col-span-4 lg:mt-0">
                <Skeleton animation="wave" />
                <hr className="m-4"/>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 h-28">
                        <Skeleton animation="wave"/>
                    </div>
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                        <Skeleton animation="wave"/>
                    </div>
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                        <Skeleton animation="wave"/>
                    </div>
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                        <Skeleton animation="wave"/>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 h-28">
                        <Skeleton animation="wave"/>
                    </div>
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                        <Skeleton animation="wave"/>
                    </div>
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                        <Skeleton animation="wave"/>
                    </div>
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                        <Skeleton animation="wave"/>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 h-28">
                        <Skeleton animation="wave"/>
                    </div>
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                        <Skeleton animation="wave"/>
                    </div>
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                        <Skeleton animation="wave"/>
                    </div>
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                        <Skeleton animation="wave"/>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 h-28">
                        <Skeleton animation="wave"/>
                    </div>
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                        <Skeleton animation="wave"/>
                    </div>
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                        <Skeleton animation="wave"/>
                    </div>
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                        <Skeleton animation="wave"/>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}