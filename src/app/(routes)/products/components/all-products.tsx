"use client";

import { useSearchParams } from "next/navigation";

import { Filters, Products, RangeFilters } from "@/types";
import { Badge } from "@/src/components/ui/badge";
import NoResults from "@/src/components/ui/no-results";
import ProductCard from "@/src/components/ui/product-card";

interface MainProps {
  data: (Products)[];
};

const AllProducts: React.FC<MainProps> = ({
  data,
}) => {
    const searchParams = useSearchParams()
  
    let allfilters: Array<Filters>= []
    let allrangedfilters: Array<RangeFilters>= []
    let counter = 0
    const categorySlug = searchParams.get('categorySlug')
    if(categorySlug!=null){
        counter++
        let fil: Filters = {
            id: counter.toString(),
            name: categorySlug,
            origin: "Category",
            params: "categorySlug"
        }
        allfilters.push(fil)
    } 
    const subcategorySlug = searchParams.get('subcategorySlug')
    if(subcategorySlug!=null){ 
        counter++
        let fil: Filters = {
            id: counter.toString(),
            name: subcategorySlug,
            origin: "Sub Category",
            params: "subcategorySlug"
        }
        allfilters.push(fil)
    }
    const subsubcategorySlug = searchParams.get('subsubcategorySlug')
    if(subsubcategorySlug!=null) {
        counter++
        let fil: Filters = {
            id: counter.toString(),
            name: subsubcategorySlug,
            origin: "Sub Sub Category",
            params: "subsubcategorySlug"
        }
        allfilters.push(fil)
    }
    const sizeIdmin = searchParams.get('sizeIdmin')
    const sizeIdmax = searchParams.get('sizeIdmax')
    if(sizeIdmin!=null && sizeIdmax!=null) {
        counter++
        let fil: RangeFilters = {
            id: counter.toString(),
            namebottom: sizeIdmin,
            nametop: sizeIdmax,
            origin: "Size",
            params: "sizeId",
            unit: "Inch"
        }
        allrangedfilters.push(fil)
    }
    const sensitivityValuemin = searchParams.get('sensitivityValuemin')
    const sensitivityValuemax = searchParams.get('sensitivityValuemax')
    if(sensitivityValuemin!= null && sensitivityValuemax!= null) {
        counter++
        let fil: RangeFilters = {
            id: counter.toString(),
            namebottom: sensitivityValuemin,
            nametop: sensitivityValuemax,
            origin: "Sensitivity",
            params: "sensitivityValue",
            unit: "dB"
        }
        allrangedfilters.push(fil)
    }
    const impedanceValuemin = searchParams.get('impedanceValuemin')
    const impedanceValuemax = searchParams.get('impedanceValuemax')
    if(impedanceValuemin!=null && impedanceValuemax!=null) {
        counter++
        let fil: RangeFilters = {
            id: counter.toString(),
            namebottom: impedanceValuemin,
            nametop: impedanceValuemax,
            origin: "Impedance",
            params: "impedanceValue",
            unit: "Ω"
        }
        allrangedfilters.push(fil)
    }
    const voiceCoilValuemin = searchParams.get('voiceCoilValuemin')
    const voiceCoilValuemax = searchParams.get('voiceCoilValuemax')
    if(voiceCoilValuemin!=null && voiceCoilValuemax!=null) {
        counter++
        let fil: RangeFilters = {
            id: counter.toString(),
            namebottom: voiceCoilValuemin,
            nametop: voiceCoilValuemax,
            origin: "Voice Coil",
            params: "voiceCoilValue",
            unit: "mm"
        }
        allrangedfilters.push(fil)
    }
    const airResonanceValuemin = searchParams.get('airResonanceValuemin')
    const airResonanceValuemax = searchParams.get('airResonanceValuemax')
    if(airResonanceValuemin!=null && airResonanceValuemax!=null) {
        counter++
        let fil: RangeFilters = {
            id: counter.toString(),
            namebottom: airResonanceValuemin,
            nametop: airResonanceValuemax,
            origin: "Air Resonance",
            params: "airResonanceValue",
            unit: "Hz"
        }
        allrangedfilters.push(fil)
    }
    const qFactorQTSValuemin = searchParams.get('qFactorQTSValuemin')
    const qFactorQTSValuemax = searchParams.get('qFactorQTSValuemax')
    if(qFactorQTSValuemin!=null && qFactorQTSValuemax!=null) {
        counter++
        let fil: RangeFilters = {
            id: counter.toString(),
            namebottom: qFactorQTSValuemin,
            nametop: qFactorQTSValuemax,
            origin: "Q Factor QTS",
            params: "qFactorQTSValue",
            unit: ""
        }
        allrangedfilters.push(fil)
    }
    const netWeightValuemin = searchParams.get('netWeightValuemin')
    const netWeightValuemax = searchParams.get('netWeightValuemax')
    if(netWeightValuemin!=null && netWeightValuemax!=null) {
        counter++
        let fil: RangeFilters = {
            id: counter.toString(),
            namebottom: netWeightValuemin,
            nametop: netWeightValuemax,
            origin: "Net Weight",
            params: "netWeightValue",
            unit: "kg"
        }
        allrangedfilters.push(fil)
    }

    let showedReviewsFinal: Array<Products> = []
    if(categorySlug != null || subcategorySlug != null || subsubcategorySlug !=null || 
        sensitivityValuemin != null || sensitivityValuemax != null || 
        sizeIdmin!= null || sizeIdmax!= null ||
        impedanceValuemin!= null || impedanceValuemax!= null ||
        voiceCoilValuemin!= null || voiceCoilValuemax!= null ||
        airResonanceValuemin!= null || airResonanceValuemax!= null ||
        qFactorQTSValuemin!= null || qFactorQTSValuemax!= null ||
        netWeightValuemin!= null || netWeightValuemax!= null
        ){ 
        for (let i = 0; i < data.length; i++) {
            if(categorySlug != null){
                for (let j = 0; j < data[i].categories.length; j++) {
                    if(data[i].categories[j].slug == categorySlug){
                        showedReviewsFinal.push(data[i])
                        break;
                    }
                }
            }
            if(subsubcategorySlug != null){
                for (let j = 0; j < data[i].sub_sub_categories.length; j++) {
                    if(data[i].sub_sub_categories[j].slug == subsubcategorySlug){
                        showedReviewsFinal.push(data[i])
                        break;
                    }
                }
            }
            if(subcategorySlug != null){
                for (let j = 0; j < data[i].sub_categories.length; j++) {
                    if(data[i].sub_categories[j].slug == subcategorySlug){
                        showedReviewsFinal.push(data[i])
                        break;
                    }
                }
            }
            if(sizeIdmin != null && sizeIdmax != null){
                if(Number(data[i].size.value) >= Number(sizeIdmin) && Number(data[i].size.value) <= Number(sizeIdmax)){
                    showedReviewsFinal.push(data[i])
                }
            }
            
            if(sensitivityValuemin != null && sensitivityValuemax != null){
                if(Number(data[i].specification.sensitivity) >= Number(sensitivityValuemin) && Number(data[i].specification.sensitivity) <= Number(sensitivityValuemax)){
                    showedReviewsFinal.push(data[i])
                }
            }
            if(impedanceValuemin != null && impedanceValuemax != null){
                if(Number(data[i].specification.impedance) >= Number(impedanceValuemin) && Number(data[i].specification.impedance) <= Number(impedanceValuemax)){
                    showedReviewsFinal.push(data[i])
                }
            }
            if(voiceCoilValuemin != null && voiceCoilValuemax != null){
                if(Number(data[i].specification.voice_coil_diameter) >= Number(voiceCoilValuemin) && Number(data[i].specification.voice_coil_diameter) <= Number(voiceCoilValuemax)){
                    showedReviewsFinal.push(data[i])
                }
            }
            if(airResonanceValuemin != null && airResonanceValuemax != null){
                if(Number(data[i].specification.free_air_resonance_fs) >= Number(airResonanceValuemin) && Number(data[i].specification.free_air_resonance_fs) <= Number(airResonanceValuemax)){
                    showedReviewsFinal.push(data[i])
                }
            }
            if(qFactorQTSValuemin != null && qFactorQTSValuemax != null){
                if(Number(data[i].specification.total_q_factor_qts) >= Number(qFactorQTSValuemin) && Number(data[i].specification.total_q_factor_qts) <= Number(qFactorQTSValuemax)){
                    showedReviewsFinal.push(data[i])
                }
            }
            if(netWeightValuemin != null && netWeightValuemax != null){
                if(Number(data[i].specification.net_weight) >= Number(netWeightValuemin) && Number(data[i].specification.net_weight) <= Number(netWeightValuemax)){
                    showedReviewsFinal.push(data[i])
                }
            }
        }
        if(counter > 1){
            let index: string[] = [];
            let index_showedReviewsFinal: number[] = [];
            let counter_index: number[] = [];
            let counterReviews: Array<Products> = []
            let counter_baru = 0
            for (let i = 0; i < showedReviewsFinal.length; i++) {
                if(index.length == 0){
                    index.push(showedReviewsFinal[i].id)
                    index_showedReviewsFinal.push(i)
                    counter_index.push(1)
                }
                else{
                    for (let j = 0; j < index.length; j++) {
                        if(showedReviewsFinal[i].id == index[j]){
                            counter_index[j]++
                            counter_baru = 1
                            break
                        }
                    }
                    if(counter_baru==0){
                        index.push(showedReviewsFinal[i].id)
                        index_showedReviewsFinal.push(i)
                        counter_index.push(1)
                    }
                    counter_baru = 0
                }
            }
            for (let i = 0; i < index.length; i++) {
                if(counter_index[i] == counter){
                    counterReviews.push(showedReviewsFinal[index_showedReviewsFinal[i]])
                }
            }
            showedReviewsFinal = counterReviews
        }
    }
    else{
        showedReviewsFinal = data
    }

    return ( 
        <div className="mt-6 lg:col-span-4 lg:mt-0">
            
            <h3 className="text-lg font-semibold">
            Total Product Shown: {showedReviewsFinal.length}
            </h3>
            <nav className="mr-6 flex items-center space-x-4 lg:space-x-6">
            {allfilters.map((item: Filters, i) => (
                <Badge className="flex m-2 p-2" key={i}>{item.origin}: {item.name}
                {/* <div onClick={() => deleteFilter(item.params)}><XCircleIcon/></div> */}
                </Badge>
            ))}
            </nav>
            <nav className=" mr-6 flex items-center space-x-4 lg:space-x-6">
            {allrangedfilters.map((item: RangeFilters, i) => (
                <Badge className="flex m-2 p-2" key={i}>{item.origin}: {item.namebottom} - {item.nametop} {item.unit} &nbsp;&nbsp;
                {/* <div onClick={() => deleteRangeFilter(item.params)} key={i}><XCircleIcon/></div> */}
                </Badge>
            ))}
            </nav><hr className="m-4"/>
            {showedReviewsFinal.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {showedReviewsFinal.map((item: Products, i) => (
                <ProductCard key={item.id} data={item}>
                </ProductCard>
            ))}
            </div>
        </div>
    );
};

export default AllProducts;
