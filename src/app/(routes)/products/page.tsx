import AllProducts from "./components/all-products";
import Combobox from "./components/combobox";
import RangeSlider from "./components/rangeslider";
import { getData } from "@/src/utils/get-data";

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'All Products - SB Acoustics',
  description: 'All Products Provided by SB Acoustics',
}

export default async function ProductPage () {
  const data = await getData()
  
  return(
    <div className="bg-white pt-28">
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <div className="hidden lg:block">
            <RangeSlider
              valueKey="sizeId"
              name="Size Range (Inch)"
              allValue={data.allsizes}
            />
            <RangeSlider
              valueKey="sensitivityValue"
              name="Sensitivity Range (dB)"
              allValue={data.allproduct.allSensitivity}
            />
            <RangeSlider
              valueKey="impedanceValue"
              name="Impedance Range (Ω)"
              allValue={data.allproduct.allImpedance}
            />
            <RangeSlider
              valueKey="voiceCoilValue"
              name="Voice Coil Diameter (mm)"
              allValue={data.allproduct.allVoiceCoilDiameter}
            />
            <RangeSlider
              valueKey="airResonanceValue"
              name="Air Resonance FS Range (Hz)"
              allValue={data.allproduct.allAirResonanceFS}
            />
            <RangeSlider
              valueKey="qFactorQTSValue"
              name="Q Factor QTS Range"
              allValue={data.allproduct.allQFactorQTS}
            />
            <RangeSlider
              valueKey="netWeightValue"
              name="Net Weight Range (kg)"
              allValue={data.allproduct.allNetWeight}
            />
            <Combobox
              valueKey="categorySlug"
              name="Category"
              data={data.allcategories}
            />
            <Combobox
              valueKey="subcategorySlug"
              name="Sub Category"
              data={data.allsubcategories}
            />
            <Combobox
              valueKey="subsubcategorySlug"
              name="Sub Sub Category"
              data={data.allsubsubcategories}
            />
          </div>
          <AllProducts data={data.allproduct.allProducts}/>
        </div>
      </div>
    </div>
  );
}
