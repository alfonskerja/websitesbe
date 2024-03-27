import { ApolloClient, InMemoryCache, createHttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const URL=`${process.env.GRAPHQL_ENDPOINT}`;
const GQL=`${process.env.FETCH_ALL_SIZES}`;
const TOKEN=`${process.env.FETCH_ALL_SIZES_TOKEN}`;

const getAllSizes = async (): Promise<number[]> => {
  let allSizes: Array<number> = []
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

  for (let i = 0; i < data.sizes.data.length; i++) {
    allSizes.push(Number(data.sizes.data[i].attributes.name))
  }


  return allSizes;
};

export default getAllSizes;

