import { AllCategory } from "@/types";

const API=`${process.env.FETCH_ALL_SUB_CATEGORIES}`;

const getAllSubCategories = async (): Promise<AllCategory[]> => {
  let all_Sub_Categories: Array<AllCategory> = []
  const response = await fetch(API);
  if (!response.ok) {
    throw new Error('Failed to fetch Sub Categories');
  }
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    let sub_category: AllCategory = {
      id: data[i].id,
      name: data[i].name,
      slug: data[i].slug
    }
    all_Sub_Categories.push(sub_category)
  }

  return all_Sub_Categories;
};

export default getAllSubCategories;

