"use client";

import Image from "next/image";
import { Products } from "@/types";
import Link from "next/link";

interface ReviewCard {
  data: Products
}

const ProductCard: React.FC<ReviewCard> = ({
  data
}) => {
  return ( 
    <Link href={{
      pathname: `/products/${data?.id}`,
      query: { name : data.name },
    }} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image 
          src={data.coverUrl} 
          alt="" 
          sizes="(max-width: 600px) 100vw, (max-width: 960px) 75vw, 1200px"
          fill
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
