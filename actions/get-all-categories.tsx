import { AllCategory } from "@/types";

const API=`${process.env.FETCH_ALL_CATEGORIES}`;

const getAllCategories = async (): Promise<AllCategory[]> => {
  let allCategories: Array<AllCategory> = []
  const response = await fetch(API);
  if (!response.ok) {
    throw new Error('Failed to fetch Categories');
  }
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    let category: AllCategory = {
      id: data[i].id,
      name: data[i].name,
      slug: data[i].slug
    }
    allCategories.push(category)
  }

  return allCategories;
};

export default getAllCategories;

