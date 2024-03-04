import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Size } from '@/types';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';


const SearchBox: React.FC = () => {
  const [finalProductSearchbox, setProductSearchbox] = useState<Size[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const client = new ApolloClient({
        uri: 'http://localhost:1337/graphql',
        cache: new InMemoryCache(),
      });

      try {
        const { data } = await client.query({
          query: gql`
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
          `,
        });

        let productForSearchbox: Array<Size> = []
        for(let i = 0; i< data.products.data.length;i++){
            let temp: Size = {
                value: data.products.data[i].id,
                label: data.products.data[i].attributes.name
              }
              productForSearchbox.push(temp)
        }

        setProductSearchbox(productForSearchbox);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount


  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Size | null,
  ) => {
    // console.log(value);
    if(value != undefined){
      router.push(`/products/${value?.value}`);
    }
  };

  return (
    <Autocomplete
      options={finalProductSearchbox}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params}/>}
      onChange={handleChange}
    />
  );
};

export default SearchBox;