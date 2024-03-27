import { AllCategory } from "@/types";
import { ApolloClient, InMemoryCache, createHttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const URL=`${process.env.GRAPHQL_ENDPOINT}`;
const GQL=`${process.env.FETCH_ALL_SUB_CATEGORIES}`;
const TOKEN=`${process.env.FETCH_ALL_SUB_CATEGORIES_TOKEN}`;

const getAllSubCategories = async (): Promise<AllCategory[]> => {
  let all_Sub_Categories: Array<AllCategory> = []
  const httpLink = createHttpLink({
    uri: URL,
  });

  const authLink = setContext((_, { headers }) => {
    const token = TOKEN;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '', 
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
  const GET_DATA = gql`
    ${GQL}
  `;
  const { data } = await client.query({query: GET_DATA})

  for (let i = 0; i < data.subCategories.data.length; i++) {
    let sub_category: AllCategory = {
      id: data.subCategories.data[i].id,
      name: data.subCategories.data[i].attributes.name,
      slug: data.subCategories.data[i].attributes.slug
    }
    all_Sub_Categories.push(sub_category)
  }

  return all_Sub_Categories;
};

export default getAllSubCategories;

