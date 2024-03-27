"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import qs from 'query-string';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@mui/material';

interface SliderProps {
  allValue: number[];
  valueKey: string;
  name: string;
};

function getIndex_afterRefreshed<T>(arr: number[], valuebot: number, valuetop: number): number[] {
  const indices: number[] = [];
  arr.forEach((element, index) => {
      if (element === valuebot) {
        indices[0] = index
      }
      if (element === valuetop) {
        indices[1] = index
      }
  });
  return indices;
}

function removeDuplicates<RangeSliderFilter>(arr: RangeSliderFilter[]): RangeSliderFilter[] {
  return Array.from(new Set(arr));
}

const RangeSlider: React.FC<SliderProps> = ({
  allValue,
  valueKey,
  name,
}) => {
  const allValueWithoutDuplicates: number[] = removeDuplicates(allValue);
  const sortedValues = allValueWithoutDuplicates.slice().sort((a, b) => a - b);
  
  const [displayValue, setDisplayVal] = React.useState<number[]>([]);
  const [firstload, setFirstload] = React.useState<boolean>(true);
  let [value, setValue] = React.useState<number[]>([]);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const bottom = valueKey.concat("min");
  const top = valueKey.concat("max");

  const max = sortedValues.length - 1;
  const min = 0;
  
  let satuan = name.substring(
    name.indexOf("(") + 1, 
    name.lastIndexOf(")")
  );

  if(firstload){
    setFirstload(false);
    setDisplayVal([sortedValues[0], sortedValues[sortedValues.length-1]])
    const current2 = qs.parse(searchParams.toString());
    const query2 = { ...current2 };
    if(query2[bottom] && query2[top]){
      const indices: number[] = getIndex_afterRefreshed(sortedValues, Number(query2[bottom]), Number(query2[top]));
      setValue([indices[0], indices[1]])
    }
    else{
      setValue([0, sortedValues.length-1])
    }
  }


  const handleChange = (event: Event) => {
    // @ts-ignore
    let valueNow = [sortedValues[event.target!.value[0]], sortedValues[event.target!.value[1]]] as number[];
    const current = qs.parse(searchParams.toString());
    setDisplayVal([valueNow[0], valueNow[1]] as number[])
    // @ts-ignore
    setValue([event.target!.value[0], event.target!.value[1]] as number[])

    if (valueNow[0] === sortedValues[0] && valueNow[1] === sortedValues[sortedValues.length-1]) {
      const query = { ...current };
      query[bottom] = null;
      query[top] = null;
      const url = qs.stringifyUrl({
        url: window.location.href,
        query,
      }, { skipNull: true });
      router.push(url, { scroll: false });
    }
    else {    
      const query = {
        ...current,
        [bottom]: valueNow[0],
        [top]: valueNow[1],
      };
      const url = qs.stringifyUrl({
        url: window.location.href,
        query,
      }, { skipNull: true });
      router.push(url, { scroll: false });
    }
  };

  function resetButton() {
    setValue([min, max] as number[]);
    setDisplayVal([sortedValues[0], sortedValues[sortedValues.length-1]] as number[])
    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
    };
    query[bottom] = null;
    query[top] = null;
    const url = qs.stringifyUrl({
      url: window.location.href,
      query,
    }, { skipNull: true });
    router.push(url, { scroll: false });
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">
        {name}
      </h3>
      <hr className="my-4" />
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>           
        {displayValue[0]} {satuan} - {displayValue[1]} {satuan}
      </div>
      <div className="flex flex-wrap gap-2">
        <Box sx={{ width: "100%" }}>
          <Slider
            value={value}
            onChange={handleChange}
            min={min}
            max={max}
            step={1}
            defaultValue={[min, max]}
            // @ts-ignore
            color={value[0] == 0 && value[1] == sortedValues.length-1 ? "primary" : "error"}
          />
        </Box>
      </div>
      <Button onClick={resetButton}>RESET</Button>
    </div>
  );
}

export default RangeSlider;