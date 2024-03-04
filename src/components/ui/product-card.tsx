"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Products } from "@/types";

interface ReviewCard {
  data: Products
}

const ProductCard: React.FC<ReviewCard> = ({
  data
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${data?.id}`);
  };
  
  // data.tags.map((item) => (
  //   console.log(item)
  // ))

  return ( 
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Image & actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image 
          src={data.coverUrl} 
          alt="" 
          sizes="(max-width: 600px) 100vw, (max-width: 960px) 75vw, 1200px"
          fill
          // className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        {/* <p className="text-sm text-gray-500"> 
        {data.tags.map((item) => (
            <a>[{item.name}] </a>
        ))}
        </p><hr />
        <p className="text-sm text-gray-500"> 
        {data.availables.map((item) => (
            <a>[{item.name}] </a>
        ))}
        </p> */}
      </div>
    </div>
  );
}

export default ProductCard;
