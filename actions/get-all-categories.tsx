import { AllCategory } from "@/types";
import { ApolloClient, InMemoryCache, createHttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const URL=`${process.env.GRAPHQL_ENDPOINT}`;
const GQL=`${process.env.FETCH_ALL_CATEGORIES}`;
const TOKEN=`${process.env.FETCH_ALL_CATEGORIES_TOKEN}`;

const getAllCategories = async (): Promise<AllCategory[]> => {
  let allCategories: Array<AllCategory> = []
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

  for (let i = 0; i < data.categories.data.length; i++) {
    let category: AllCategory = {
      id: data.categories.data[i].id,
      name: data.categories.data[i].attributes.name,
      slug: data.categories.data[i].attributes.slug
    }
    allCategories.push(category)
  }

  return allCategories;
};

export default getAllCategories;

