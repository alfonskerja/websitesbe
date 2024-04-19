import { Size } from "@/types";

const API=`http://localhost:3001/api/680c5eee-7ed7-41bc-b14b-4185f8a1c379/searchbox`;

const getProductsForSearchbox = async (): Promise<Size[]> => {
    let productForSearchbox: Array<Size> = [];
    const response = await fetch(API, {
      
    });
    if (!response.ok) {
      throw new Error('Failed to fetch searchbox');
    }
    const data = await response.json();
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        let temp: Size = {
            value: data[i].id,
            label: data[i].name
        };
        console.log(temp)
        productForSearchbox.push(temp);
    }


    return productForSearchbox;
};

export default getProductsForSearchbox;

