import { AllCategory, SingleProducts, Size, Specifications } from "@/types";
import { ApolloClient, InMemoryCache, createHttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const URL=`${process.env.GRAPHQL_ENDPOINT}`;
const TOKEN=`${process.env.FETCH_ALL_PRODUCTS_TOKEN}`;

function createDynamicQuery(id: number) {
  const fetchOneProduct = process.env.FETCH_ONE_PRODUCT;
  if (!fetchOneProduct) {
    throw new Error('FETCH_ONE_PRODUCT environment variable is not defined.');
  }
  return fetchOneProduct.replace('PLACEHOLDER', id.toString());
}

const getProduct = async (productId: number): Promise<SingleProducts> => {
  const httpLink = createHttpLink({
    uri: URL,
  });

  const GQL = createDynamicQuery(productId)
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

  let prod_cat: Array<AllCategory> = []
  let prod_sub_cat: Array<AllCategory> = []
  let prod_sub_sub_cat: Array<AllCategory> = []
  let all_url : Array<string> = []
  let all_alt : Array<string> = []
  for (let j = 0; j < data.products.data[0].attributes.categories.data.length; j++) {
    let category: AllCategory = {
      id: data.products.data[0].attributes.categories.data[j].id,
      name: data.products.data[0].attributes.categories.data[j].attributes.name,
      slug: data.products.data[0].attributes.categories.data[j].attributes.slug
    }
    prod_cat.push(category)
  }
  for (let j = 0; j < data.products.data[0].attributes.sub_categories.data.length; j++) {
    let subcategory: AllCategory = {
      id: data.products.data[0].attributes.sub_categories.data[j].id,
      name: data.products.data[0].attributes.sub_categories.data[j].attributes.name,
      slug: data.products.data[0].attributes.sub_categories.data[j].attributes.slug
    }
    prod_sub_cat.push(subcategory)
  }
  for (let j = 0; j < data.products.data[0].attributes.sub_sub_categories.data.length; j++) {
    let subsubcategory: AllCategory = {
      id: data.products.data[0].attributes.sub_sub_categories.data[j].id,
      name: data.products.data[0].attributes.sub_sub_categories.data[j].attributes.name,
      slug: data.products.data[0].attributes.sub_sub_categories.data[j].attributes.slug
    }
    prod_sub_sub_cat.push(subsubcategory)
  }
  for(let i = 0; i< data.products.data[0].attributes.image_catalogue.data.length;i++){
    all_url.push(process.env.NEXT_PUBLIC_API_URL!.toString()!.concat(data.products.data[0].attributes.image_catalogue.data[i].attributes.url.toString()))
    all_alt.push(process.env.NEXT_PUBLIC_API_URL!.toString()!.concat(data.products.data[0].attributes.image_catalogue.data[i].attributes.alternativeText.toString()))
}

  let size = {} as Size;
  if(data.products.data[0].attributes.sizes.data[0]!=null){
    let size2: Size = {
      label: data.products.data[0].attributes.sizes.data[0].attributes.value,
      value: Number(data.products.data[0].attributes.sizes.data[0].attributes.name)
    }
    size = size2  }

  let specific: Specifications = {
    impedance: data.products.data[0].attributes.specification[0].impedance,
    dc_resistance_re: data.products.data[0].attributes.specification[0].dc_resistance_re,
    coil_inductance_le: data.products.data[0].attributes.specification[0].coil_inductance_le,
    effective_piston_area_sd: data.products.data[0].attributes.specification[0].effective_piston_area_sd,
    voice_coil_diameter: data.products.data[0].attributes.specification[0].voice_coil_diameter,
    voice_coil_height: data.products.data[0].attributes.specification[0].voice_coil_height,
    air_gap_height: data.products.data[0].attributes.specification[0].air_gap_height,
    linear_coil_travel_pp: data.products.data[0].attributes.specification[0].linear_coil_travel_pp,
    moving_mass_mms: data.products.data[0].attributes.specification[0].moving_mass_mms,
    free_air_resonance_fs: data.products.data[0].attributes.specification[0].free_air_resonance_fs,
    sensitivity: data.products.data[0].attributes.specification[0].sensitivity,
    mechanical_q_factor_qms: data.products.data[0].attributes.specification[0].mechanical_q_factor_qms,
    electrical_q_factor_qes: data.products.data[0].attributes.specification[0].electrical_q_factor_qes,
    total_q_factor_qts: data.products.data[0].attributes.specification[0].total_q_factor_qts,
    force_factor_bi: data.products.data[0].attributes.specification[0].force_factor_bi,
    rated_power_handling: data.products.data[0].attributes.specification[0].rated_power_handling,
    magnetic_flux_density: data.products.data[0].attributes.specification[0].magnetic_flux_density,
    magnet_weight: data.products.data[0].attributes.specification[0].magnet_weight,
    net_weight: data.products.data[0].attributes.specification[0].net_weight,
    equivalent_volume_vas: data.products.data[0].attributes.specification[0].equivalent_volume_vas,
    compliance_cms: data.products.data[0].attributes.specification[0].compliance_cms,
    mechanical_loss_rms: data.products.data[0].attributes.specification[0].mechanical_loss_rms,
    recommended_frequency_range: data.products.data[0].attributes.specification[0].recommended_frequency_range,
    max_mechanical_cone_excursion_xmech: data.products.data[0].attributes.specification[0].max_mechanical_cone_excursion_xmech,
  }
  let product: SingleProducts = {
    id: data.products.data[0].id,
    coverUrl: process.env.NEXT_PUBLIC_API_URL!.toString()?.concat(data.products.data[0].attributes.cover.data.attributes.url.toString()),
    coverAlt: data.products.data[0].attributes.cover.data.attributes.alternativeText,
    Url: all_url,
    Alt: all_alt,
    name: data.products.data[0].attributes.name,
    desc: data.products.data[0].attributes.description,
    datasheet: data.products.data[0].attributes.datasheet.data.attributes.url,
    slug: data.products.data[0].attributes.slug,
    size: size,
    categories: prod_cat,
    sub_categories: prod_sub_cat,
    sub_sub_categories: prod_sub_sub_cat,
    specification: specific
  }

  return product;
};

export default getProduct;

