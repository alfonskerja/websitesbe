import { AllCategory } from "@/types";
import { ApolloClient, InMemoryCache, createHttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const API=`${process.env.FETCH_ALL_SUB_SUB_CATEGORIES}`;

const getAllSubSubCategories = async (): Promise<AllCategory[]> => {
  let all_Sub_Sub_Categories: Array<AllCategory> = []
  const response = await fetch(API);
  if (!response.ok) {
    throw new Error('Failed to fetch Sub Sub Categories');
  }
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    let sub_sub_category: AllCategory = {
      id: data[i].id,
      name: data[i].name,
      slug: data[i].slug
    }
    all_Sub_Sub_Categories.push(sub_sub_category)
  }

  return all_Sub_Sub_Categories;
};

export default getAllSubSubCategories;

