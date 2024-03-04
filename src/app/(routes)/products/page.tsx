import { AllCategory, Products, Size, RangeSliderFilter, Specifications } from "@/types"
import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import AllProducts from "./components/all-products";
import Combobox from "./components/combobox";
import RangeSlider from "./components/rangeslider";

let isRun = false
let allProducts: Array<Products> = []
let allSizes: Array<RangeSliderFilter> = []
let allSensitivity: Array<RangeSliderFilter> = []
let allImpedance: Array<RangeSliderFilter> = []
let allVoiceCoilDiameter: Array<RangeSliderFilter> = []
let allAirResonanceFS: Array<RangeSliderFilter> = []
let allQFactorQTS: Array<RangeSliderFilter> = []
let allNetWeight: Array<RangeSliderFilter> = []
let allCategories: Array<AllCategory> = []
let all_Sub_Categories: Array<AllCategory> = []
let all_Sub_Sub_Categories: Array<AllCategory> = []

export default async function ProductPage () {
  if(!isRun){
    const client = new ApolloClient({
      uri: 'http://localhost:1337/graphql',
      cache: new InMemoryCache()
    });
  
    const { data } = await client.query({
      query: gql`
      query getProducts {
        sizes(pagination: {limit:100}) {
          data {
            attributes {
              name
              value
            }
            id
          }
        }
        categories(pagination: {limit:100}) {
          data {
            id
            attributes {
              name
              slug
            }
          }
        }
        subCategories(pagination: {limit:100}) {
          data {
            id
            attributes {
              name
              slug
            }
          }
        }
        subSubCategories(pagination: {limit:100}) {
          data {
            id
            attributes {
              name
              slug
            }
          }
        }
        products(pagination: {limit:100}) {
          data {
            id
            attributes {
              cover {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
              name
              sizes {
                data {
                  attributes {
                    name
                    value
                  }
                  id
                }
              }
              slug
              categories {
                data {
                  id
                  attributes {
                    name
                    slug
                  }
                }
              }
              sub_categories {
                data {
                  id
                  attributes {
                    name
                    slug
                  }
                }
              }
              sub_sub_categories {
                data {
                  id
                  attributes {
                    name
                    slug
                  }
                }
              }
              specification {
                impedance
                voice_coil_diameter
                free_air_resonance_fs
                sensitivity
                total_q_factor_qts
                net_weight
              }
            }
          }
        }
      }
      `
    })
    isRun = true
    console.log("Panjang data: ", data.products.data.length)


    //FOR FILTERS
    for (let i = 0; i < data.sizes.data.length; i++) {
      let size: RangeSliderFilter = {
        value: Number(data.sizes.data[i].attributes.name)
      }
      allSizes.push(size)
    }
    for (let i = 0; i < data.categories.data.length; i++) {
      let category: AllCategory = {
        id: data.categories.data[i].id,
        name: data.categories.data[i].attributes.name,
        slug: data.categories.data[i].attributes.slug
      }
      allCategories.push(category)
    }
    for (let i = 0; i < data.subCategories.data.length; i++) {
      let sub_category: AllCategory = {
        id: data.subCategories.data[i].id,
        name: data.subCategories.data[i].attributes.name,
        slug: data.subCategories.data[i].attributes.slug
      }
      all_Sub_Categories.push(sub_category)
    }
    for (let i = 0; i < data.subSubCategories.data.length; i++) {
      let sub_sub_category: AllCategory = {
        id: data.subSubCategories.data[i].id,
        name: data.subSubCategories.data[i].attributes.name,
        slug: data.subSubCategories.data[i].attributes.slug
      }
      all_Sub_Sub_Categories.push(sub_sub_category)
    }

    //AllProducts
    for (let i = 0; i < data.products.data.length; i++) {
      let prod_cat: Array<AllCategory> = []
      let prod_sub_cat: Array<AllCategory> = []
      let prod_sub_sub_cat: Array<AllCategory> = []
      for (let j = 0; j < data.products.data[i].attributes.categories.data.length; j++) {
        let category: AllCategory = {
          id: data.products.data[i].attributes.categories.data[j].id,
          name: data.products.data[i].attributes.categories.data[j].attributes.name,
          slug: data.products.data[i].attributes.categories.data[j].attributes.slug
        }
        prod_cat.push(category)
      }    
      for (let j = 0; j < data.products.data[i].attributes.sub_categories.data.length; j++) {
        let subcategory: AllCategory = {
          id: data.products.data[i].attributes.sub_categories.data[j].id,
          name: data.products.data[i].attributes.sub_categories.data[j].attributes.name,
          slug: data.products.data[i].attributes.sub_categories.data[j].attributes.slug
        }
        prod_sub_cat.push(subcategory)
      }
      for (let j = 0; j < data.products.data[i].attributes.sub_sub_categories.data.length; j++) {
        let subsubcategory: AllCategory = {
          id: data.products.data[i].attributes.sub_sub_categories.data[j].id,
          name: data.products.data[i].attributes.sub_sub_categories.data[j].attributes.name,
          slug: data.products.data[i].attributes.sub_sub_categories.data[j].attributes.slug
        }
        prod_sub_sub_cat.push(subsubcategory)
      }

      let size = {} as Size;
      if(data.products.data[i].attributes.sizes.data[0]!=null){
        let size2: Size = {
          label: data.products.data[i].attributes.sizes.data[0].attributes.value,
          value: Number(data.products.data[i].attributes.sizes.data[0].attributes.name)
        }
        size = size2
      }

      //Sensitivity
      if(data.products.data[i].attributes.specification[0].sensitivity!=null){
        let sensitive: RangeSliderFilter = {
          value: Number(data.products.data[i].attributes.specification[0].sensitivity),
        }
        allSensitivity.push(sensitive)
      }
      //Impedance
      if(data.products.data[i].attributes.specification[0].impedance!=null){
        let impedance: RangeSliderFilter = {
          value: Number(data.products.data[i].attributes.specification[0].impedance),
        }
        allImpedance.push(impedance)
      }
      //Voice Coil Diameter
      if(data.products.data[i].attributes.specification[0].voice_coil_diameter!=null){
        let voice_coil_diameter: RangeSliderFilter = {
          value: Number(data.products.data[i].attributes.specification[0].voice_coil_diameter),
        }
        allVoiceCoilDiameter.push(voice_coil_diameter)
      }
      //Air Resonance FS
      if(data.products.data[i].attributes.specification[0].free_air_resonance_fs!=null){
        let free_air_resonance_fs: RangeSliderFilter = {
          value: Number(data.products.data[i].attributes.specification[0].free_air_resonance_fs),
        }
        allAirResonanceFS.push(free_air_resonance_fs)
      }
      //Q Factor QTS
      if(data.products.data[i].attributes.specification[0].total_q_factor_qts!=null){
        let total_q_factor_qts: RangeSliderFilter = {
          value: Number(data.products.data[i].attributes.specification[0].total_q_factor_qts),
        }
        allQFactorQTS.push(total_q_factor_qts)
      }
      //Net Weight
      if(data.products.data[i].attributes.specification[0].net_weight!=null){
        let net_weight: RangeSliderFilter = {
          value: Number(data.products.data[i].attributes.specification[0].net_weight),
        }
        allNetWeight.push(net_weight)
      }

      let specific: Specifications = {
        impedance: data.products.data[i].attributes.specification[0].impedance,
        dc_resistance_re: data.products.data[i].attributes.specification[0].dc_resistance_re,
        coil_inductance_le: data.products.data[i].attributes.specification[0].coil_inductance_le,
        effective_piston_area_sd: data.products.data[i].attributes.specification[0].effective_piston_area_sd,
        voice_coil_diameter: data.products.data[i].attributes.specification[0].voice_coil_diameter,
        voice_coil_height: data.products.data[i].attributes.specification[0].voice_coil_height,
        air_gap_height: data.products.data[i].attributes.specification[0].air_gap_height,
        linear_coil_travel_pp: data.products.data[i].attributes.specification[0].linear_coil_travel_pp,
        moving_mass_mms: data.products.data[i].attributes.specification[0].moving_mass_mms,
        free_air_resonance_fs: data.products.data[i].attributes.specification[0].free_air_resonance_fs,
        sensitivity: data.products.data[i].attributes.specification[0].sensitivity,
        mechanical_q_factor_qms: data.products.data[i].attributes.specification[0].mechanical_q_factor_qms,
        electrical_q_factor_qes: data.products.data[i].attributes.specification[0].electrical_q_factor_qes,
        total_q_factor_qts: data.products.data[i].attributes.specification[0].total_q_factor_qts,
        force_factor_bi: data.products.data[i].attributes.specification[0].force_factor_bi,
        rated_power_handling: data.products.data[i].attributes.specification[0].rated_power_handling,
        magnetic_flux_density: data.products.data[i].attributes.specification[0].magnetic_flux_density,
        magnet_weight: data.products.data[i].attributes.specification[0].magnet_weight,
        net_weight: data.products.data[i].attributes.specification[0].net_weight,
        equivalent_volume_vas: data.products.data[i].attributes.specification[0].equivalent_volume_vas,
        compliance_cms: data.products.data[i].attributes.specification[0].compliance_cms,
        mechanical_loss_rms: data.products.data[i].attributes.specification[0].mechanical_loss_rms,
        recommended_frequency_range: data.products.data[i].attributes.specification[0].recommended_frequency_range,
        max_mechanical_cone_excursion_xmech: data.products.data[i].attributes.specification[0].max_mechanical_cone_excursion_xmech,
        id: "",
        name: "",
        slug: ""
      }
      let product: Products = {
        id: data.products.data[i].id,
        coverUrl: process.env.NEXT_PUBLIC_API_URL!.toString()?.concat(data.products.data[i].attributes.cover.data.attributes.url.toString()),
        CoverAlt: data.products.data[i].attributes.cover.data.attributes.alternativeText,
        name: data.products.data[i].attributes.name,
        slug: data.products.data[i].attributes.slug,
        size: size,
        categories: prod_cat,
        sub_categories: prod_sub_cat,
        sub_sub_categories: prod_sub_sub_cat,
        specification: specific
      }
      allProducts.push(product)
    }
  }

  return(
    <div className="bg-white pt-28">
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <div className="hidden lg:block">
            <RangeSlider
              valueKey="sizeId"
              name="Size Range (Inch)"
              allValue={allSizes}
            />
            <RangeSlider
              valueKey="sensitivityValue"
              name="Sensitivity Range (dB)"
              allValue={allSensitivity}
            />
            <RangeSlider
              valueKey="impedanceValue"
              name="Impedance Range (Ω)"
              allValue={allImpedance}
            />
            <RangeSlider
              valueKey="voiceCoilValue"
              name="Voice Coil Diameter (mm)"
              allValue={allVoiceCoilDiameter}
            />
            <RangeSlider
              valueKey="airResonanceValue"
              name="Air Resonance FS Range (Hz)"
              allValue={allAirResonanceFS}
            />
            <RangeSlider
              valueKey="qFactorQTSValue"
              name="Q Factor QTS Range"
              allValue={allQFactorQTS}
            />
            <RangeSlider
              valueKey="netWeightValue"
              name="Net Weight Range (kg)"
              allValue={allNetWeight}
            />
            <Combobox
              valueKey="categorySlug"
              name="Category"
              data={allCategories}
            />
            <Combobox
              valueKey="subcategorySlug"
              name="Sub Category"
              data={all_Sub_Categories}
            />
            <Combobox
              valueKey="subsubcategorySlug"
              name="Sub Sub Category"
              data={all_Sub_Sub_Categories}
            />
          </div>
          <AllProducts data={allProducts}/>
        </div>
      </div>
    </div>
  );
}
