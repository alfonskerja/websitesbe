import { AllCategory, AllProductsForHome, Products, Size, Specifications } from "@/types";
import { ApolloClient, InMemoryCache, createHttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const URL=`${process.env.GRAPHQL_ENDPOINT}`;
const GQL=`${process.env.FETCH_ALL_PRODUCTS}`;
const TOKEN=`${process.env.FETCH_ALL_PRODUCTS_TOKEN}`;

const getAllProducts = async (): Promise<AllProductsForHome> => {
  let allProducts: Array<Products> = []
  let allSensitivity: Array<number> = []
  let allImpedance: Array<number> = []
  let allVoiceCoilDiameter: Array<number> = []
  let allAirResonanceFS: Array<number> = []
  let allQFactorQTS: Array<number> = []
  let allNetWeight: Array<number> = []
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
      allSensitivity.push(Number(data.products.data[i].attributes.specification[0].sensitivity))
    }
    //Impedance
    if(data.products.data[i].attributes.specification[0].impedance!=null){
      allImpedance.push(Number(data.products.data[i].attributes.specification[0].impedance))
    }
    //Voice Coil Diameter
    if(data.products.data[i].attributes.specification[0].voice_coil_diameter!=null){
      allVoiceCoilDiameter.push(Number(data.products.data[i].attributes.specification[0].voice_coil_diameter))
    }
    //Air Resonance FS
    if(data.products.data[i].attributes.specification[0].free_air_resonance_fs!=null){
      allAirResonanceFS.push(Number(data.products.data[i].attributes.specification[0].free_air_resonance_fs))
    }
    //Q Factor QTS
    if(data.products.data[i].attributes.specification[0].total_q_factor_qts!=null){
      allQFactorQTS.push(Number(data.products.data[i].attributes.specification[0].total_q_factor_qts))
    }
    //Net Weight
    if(data.products.data[i].attributes.specification[0].net_weight!=null){
      allNetWeight.push(Number(data.products.data[i].attributes.specification[0].net_weight))
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

  let allProducts_Final : AllProductsForHome = {
    allProducts : allProducts,
    allNetWeight: allNetWeight,
    allQFactorQTS : allQFactorQTS,
    allAirResonanceFS: allAirResonanceFS,
    allVoiceCoilDiameter: allVoiceCoilDiameter,
    allImpedance: allImpedance,
    allSensitivity: allSensitivity,
  }

  return allProducts_Final;
};

export default getAllProducts;

