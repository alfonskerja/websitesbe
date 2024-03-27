import { Size } from "@/types";
import { ApolloClient, InMemoryCache, createHttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const URL='http://localhost:1337/graphql';
const GQL=`
query getProducts {
  products(pagination: { limit: 100 }) {
    data {
      id
      attributes {
        name
      }
    }
  }
}
`;
const TOKEN='8a591be048af0ebea17128d749dc580e2ac6d3ee427def1ad4f1fc02452caaa962ac119837bfc7144c64727c94436a7c58fb30095c6e158c464765b988b3a95fd9103bcebd5651e977fd85f8b59f1533316dc91d72ebd35c7a22dc03b4f6c69678ede8c272a465d3da0648a75fcbdff417bc2c0a0d0b77539de37ec65cbde002';

const getProductsForSearchbox = async (): Promise<Size[]> => {
    let productForSearchbox: Array<Size> = [];
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

    for (let i = 0; i < data.products.data.length; i++) {
        let temp: Size = {
            value: data.products.data[i].id,
            label: data.products.data[i].attributes.name
        };
        productForSearchbox.push(temp);
    }


    return productForSearchbox;
};

export default getProductsForSearchbox;

