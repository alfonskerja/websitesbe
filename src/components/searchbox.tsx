import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Size } from '@/types';
import getProductsForSearchbox from '@/actions/get-product-for-searchbox';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
    const router = useRouter();
    const [finalProductSearchbox, setFinalProductSearchbox] = useState<Size[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data : Size[] = await getProductsForSearchbox();
                setFinalProductSearchbox(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (
                event: React.SyntheticEvent<Element, Event>,
                value: Size | null,
            ) => { 
                if (value !== null) {
                    router.push(`/products/${value.value}`);
                }
            };

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={finalProductSearchbox}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Search a Product.." />}
            onChange={handleChange}
        />
    );
}