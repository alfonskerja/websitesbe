import { AllCategory, SingleProducts, Size, Specifications } from "@/types";

function createDynamicQuery(id: string) {
  const fetchOneProduct = process.env.FETCH_ONE_PRODUCT;
  if (!fetchOneProduct) {
    throw new Error('FETCH_ONE_PRODUCT environment variable is not defined.');
  }
  return fetchOneProduct.replace('{productId}', id.toString());
}

const getProduct = async (productId: string): Promise<SingleProducts> => {

  const API = createDynamicQuery(productId)
  console.log(API)
  const response = await fetch(API);
  if (!response.ok) {
    throw new Error('Failed to fetch one product');
  }
  const data = await response.json();

  console.log(data)

  let prod_cat: Array<AllCategory> = []
  let prod_sub_cat: Array<AllCategory> = []
  let prod_sub_sub_cat: Array<AllCategory> = []
  let all_url : Array<string> = []
  let all_alt : Array<string> = []
  for (let i = 0; i < data.allCat.length; i++) {
    let temp: AllCategory = {
      id: data.allCat[i].id,
      name: data.allCat[i].name,
      slug: data.allCat[i].slug
    }
    if(data.allCat[i].type === "Category"){
      prod_cat.push(temp)
    }
    else if(data.allCat[i].type === "Sub Category"){
      prod_sub_cat.push(temp)
    }
    else{
      prod_sub_sub_cat.push(temp)
    }
  }
  for(let i = 0; i< data.images_catalogues.length;i++){
    all_url.push(data.images_catalogues[i].url.toString())
    all_alt.push(data.slug)
}

  let size = {} as Size;
  if(data.size!=null){
    let size2: Size = {
      label: data.size.value,
      value: Number(data.size.name)
    }
    size = size2  
  }

  let specific: Specifications = {
    impedance: data.specification.impedance,
    dc_resistance_re: data.specification.dc_resistance_re,
    coil_inductance_le: data.specification.coil_inductance_le,
    effective_piston_area_sd: data.specification.effective_piston_area_sd,
    voice_coil_diameter: data.specification.voice_coil_diameter,
    voice_coil_height: data.specification.voice_coil_height,
    air_gap_height: data.specification.air_gap_height,
    linear_coil_travel_pp: data.specification.linear_coil_travel_pp,
    moving_mass_mms: data.specification.moving_mass_mms,
    free_air_resonance_fs: data.specification.free_air_resonance_fs,
    sensitivity: data.specification.sensitivity,
    mechanical_q_factor_qms: data.specification.mechanical_q_factor_qms,
    electrical_q_factor_qes: data.specification.electrical_q_factor_qes,
    total_q_factor_qts: data.specification.total_q_factor_qts,
    force_factor_bi: data.specification.force_factor_bi,
    rated_power_handling: data.specification.rated_power_handling,
    magnetic_flux_density: data.specification.magnetic_flux_density,
    magnet_weight: data.specification.magnet_weight,
    net_weight: data.specification.net_weight,
    equivalent_volume_vas: data.specification.equivalent_volume_vas,
    compliance_cms: data.specification.compliance_cms,
    mechanical_loss_rms: data.specification.mechanical_loss_rms,
    recommended_frequency_range: data.specification.recommended_frequency_range,
    max_mechanical_cone_excursion_xmech: data.specification.max_mechanical_cone_excursion_xmech,
  }
  let product: SingleProducts = {
    id: data.id,
    coverUrl: data.cover_img[0].url,
    coverAlt: data.slug,
    Url: all_url,
    Alt: all_alt,
    name: data.name,
    desc: data.description,
    datasheet: data.datasheet[0].url,
    slug: data.slug,
    size: size,
    categories: prod_cat,
    sub_categories: prod_sub_cat,
    sub_sub_categories: prod_sub_sub_cat,
    specification: specific
  }

  return product;
};

export default getProduct;

