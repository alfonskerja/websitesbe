"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { RangeSliderFilter } from '@/types';
import qs from 'query-string';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button, SliderPropsColorOverrides } from '@mui/material';

interface SliderProps {
  allValue: RangeSliderFilter[];
  valueKey: string;
  name: string;
};

const RangeSlider: React.FC<SliderProps> = ({
  allValue,
  valueKey,
  name,
}) => {
  
  const sortedValues = allValue.slice().sort((a, b) => a.value - b.value);

  
  const [uniqueval, setUniqueval] = React.useState<number[]>([]);
  const [displayValue, setDisplayVal] = React.useState<number[]>([]);
  const [sliderStyling, setSliderStyling] = React.useState<SliderPropsColorOverrides>();
  
  let [value, setValue] = React.useState<number[]>([]);
  let satuan = name.substring(
    name.indexOf("(") + 1, 
    name.lastIndexOf(")")
  );

  if(uniqueval[0] == undefined){
    let tempUniqueval: number[] = [];
    for (let i = 0;i<sortedValues.length;i++){
      if(i==0){
        tempUniqueval.push(sortedValues[i].value)
      }
      else{
        if(tempUniqueval[tempUniqueval.length-1] != sortedValues[i].value){
          tempUniqueval.push(sortedValues[i].value)
        }
      }
    }
    setUniqueval(tempUniqueval);
    setDisplayVal([sortedValues[0].value, sortedValues[sortedValues.length-1].value])
    setValue([0, sortedValues.length-1])
    setSliderStyling("primary" as SliderPropsColorOverrides)
  }

  const searchParams = useSearchParams();
  const router = useRouter();
  const bottom = valueKey.concat("min");
  const top = valueKey.concat("max");

  const max = uniqueval.length - 1;
  const min = 0;

  const handleChange = (event: Event) => {
    let valueNow = [uniqueval[event.target!.value[0]], uniqueval[event.target!.value[1]]] as number[];
    const current = qs.parse(searchParams.toString());
    setDisplayVal([valueNow[0], valueNow[1]] as number[])
    setValue([event.target!.value[0], event.target!.value[1]] as number[])

    if (valueNow[0] === sortedValues[0].value && valueNow[1] === sortedValues[sortedValues.length-1].value) {
      setSliderStyling("primary" as SliderPropsColorOverrides)
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
      setSliderStyling("error" as SliderPropsColorOverrides)
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
    setSliderStyling("primary" as SliderPropsColorOverrides)
    setValue([min, max] as number[]);
    setDisplayVal([sortedValues[0].value, sortedValues[sortedValues.length-1].value] as number[])
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
            // valueLabelDisplay="auto"
            min={min}
            max={max}
            step={1}
            defaultValue={[min, max]}
            color={sliderStyling}
            // scale={calculateScale}
          />
        </Box>
      </div>
      <Button onClick={resetButton}>RESET</Button>
    </div>
  );
}

export default RangeSlider;