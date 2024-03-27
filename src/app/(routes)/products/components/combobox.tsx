"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button as Buttonmui } from '@mui/material';
import { AllCategory } from "@/types"
import qs from "query-string"
import { useSearchParams, useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { Button } from "@/src/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/src/components/ui/command";

let counter = 1

interface ComboProps {
    data: (AllCategory )[];
    name: string;
    valueKey: string;
  };
  
  const Combobox: React.FC<ComboProps> = ({
    data,
    name,
    valueKey,
  }) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string>("")
  const [selectedvalue, setSelectedValue] = React.useState<string>("")
  const [firstload, setFirstload] = React.useState<boolean>(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  if(firstload){
    setFirstload(false);
    const current2 = qs.parse(searchParams.toString());
    const query2 = { ...current2 };
    if(query2[valueKey]){
      //@ts-ignore
      setSelectedValue(query2[valueKey])
      //@ts-ignore
      setValue(query2[valueKey])
    }
    else{
    }
  }

  if(open==true){
    counter = 2
  }
  if(open==false && counter ==2){
    counter = 1
    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      [valueKey]: value
    };
    
    if (current[valueKey] != "" && value.toString() === "") {
        query[valueKey] = null;
    }

    const url = qs.stringifyUrl({
      url: window.location.href,
      query,
    }, { skipNull: true });
    setSelectedValue(value)
    router.push(url, {scroll: false});
  }

  function resetButton(){
    setSelectedValue("")
    const current = qs.parse(searchParams.toString());
    const query = {
    ...current,
    };
    query[valueKey] = null

    const url = qs.stringifyUrl({
    url: window.location.href,
    query,
    }, { skipNull: true });
    router.push(url);
    setValue("")
  }

  return (
    <div className="mb-8">
        <h3 className="text-lg font-semibold">
        {name}
        </h3>
        <hr className="my-4" />
        <div className="flex flex-wrap gap-2">
            <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>      
                {selectedvalue ? (
                  <Button
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "justify-between w-full text-white bg-red-600" 
                  )}
                  >
                  <div><p className="text-center">{selectedvalue}</p></div>
                  </Button>
                ) : (
                  <Button
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "justify-between w-full text-white bg-black" 
                )}
                >
                  <div><p className="text-center">Select {name}...</p></div>
                  </Button>
                )}
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                <CommandInput placeholder="Search Category..." />
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup className=" max-h-40 overflow-auto">
                    {data.map((singledata) => (
                    <CommandItem
                        key={singledata.slug}
                        value={singledata.slug}
                        onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                        }}
                    >
                        <Check
                        className={cn(
                            "mr-2 h-4 w-4",
                            value === singledata.slug ? "opacity-100" : "opacity-0"
                        )}
                        />
                        {singledata.name}
                    </CommandItem>
                    ))}
                </CommandGroup>
                </Command>
            </PopoverContent>
            </Popover>
        </div>
        <Buttonmui onClick={resetButton}>RESET</Buttonmui>
    </div>
  )
}

export default Combobox;