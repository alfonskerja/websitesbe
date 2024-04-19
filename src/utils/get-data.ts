import getAllCategories from "@/actions/get-all-categories"
import getAllProducts from "@/actions/get-all-products"
import getAllSizes from "@/actions/get-all-sizes"
import getAllSubCategories from "@/actions/get-all-sub-categories"
import getAllSubSubCategories from "@/actions/get-all-sub-sub-categories"
import getProduct from "@/actions/get-one-product"
import { AllCategory, AllProductsForHome, CachedAllProducts } from "@/types"
import { cache } from "react"


export const getData = cache(async () => {
    const allProductsFull : AllProductsForHome = await getAllProducts()
    const allCategories : Array<AllCategory> = await getAllCategories();
    const all_Sub_Categories : Array<AllCategory> = await getAllSubCategories();
    const all_Sub_Sub_Categories : Array<AllCategory> = await getAllSubSubCategories();
    const allSizes: Array<number> = await getAllSizes();
    const everything : CachedAllProducts = {
        allproduct: allProductsFull,
        allcategories: allCategories,
        allsubcategories: all_Sub_Categories,
        allsubsubcategories: all_Sub_Sub_Categories,
        allsizes: allSizes
    }
    return everything;
})

export const getSingleProduct = cache(async(id :string) =>{
    const singleproduct = await getProduct(id)
    return singleproduct;
}) 
  