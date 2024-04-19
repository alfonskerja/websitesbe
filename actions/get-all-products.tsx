import { AllCategory, AllProductsForHome, Products, Size, Specifications } from "@/types";

const API=`${process.env.FETCH_ALL_PRODUCTS}`;

const getAllProducts = async (): Promise<AllProductsForHome> => {
  let allProducts: Array<Products> = []
  let allSensitivity: Array<number> = []
  let allImpedance: Array<number> = []
  let allVoiceCoilDiameter: Array<number> = []
  let allAirResonanceFS: Array<number> = []
  let allQFactorQTS: Array<number> = []
  let allNetWeight: Array<number> = []

  const response = await fetch(API);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  

  for (let i = 0; i < data.length; i++) {
    let prod_cat: Array<AllCategory> = []
    let prod_sub_cat: Array<AllCategory> = []
    let prod_sub_sub_cat: Array<AllCategory> = []
    for (let j = 0; j < data[i].allCat.length; j++) {
      let temp: AllCategory = {
        id: data[i].allCat[j].id,
        name: data[i].allCat[j].name,
        slug: data[i].allCat[j].slug
      }
      if(data[i].allCat[j].type === "Category"){
        prod_cat.push(temp)
      }
      else if(data[i].allCat[j].type === "Sub Category"){
        prod_sub_cat.push(temp)
      }
      else{
        prod_sub_sub_cat.push(temp)
      }
    }

    let size = {} as Size;
    if(data[i].size!=null){
      let size2: Size = {
        label: data[i].size.value,
        value: Number(data[i].size.name)
      }
      size = size2
    }

    //Sensitivity
    if(data[i].specification.sensitivity!=null){
      allSensitivity.push(Number(data[i].specification.sensitivity))
    }
    //Impedance
    if(data[i].specification.impedance!=null){
      allImpedance.push(Number(data[i].specification.impedance))
    }
    //Voice Coil Diameter
    if(data[i].specification.voice_coil_diameter!=null){
      allVoiceCoilDiameter.push(Number(data[i].specification.voice_coil_diameter))
    }
    //Air Resonance FS
    if(data[i].specification.free_air_resonance_fs!=null){
      allAirResonanceFS.push(Number(data[i].specification.free_air_resonance_fs))
    }
    //Q Factor QTS
    if(data[i].specification.total_q_factor_qts!=null){
      allQFactorQTS.push(Number(data[i].specification.total_q_factor_qts))
    }
    //Net Weight
    if(data[i].specification.net_weight!=null){
      allNetWeight.push(Number(data[i].specification.net_weight))
    }

    let specific: Specifications = {
      impedance: data[i].specification.impedance,
      dc_resistance_re: data[i].specification.dc_resistance_re,
      coil_inductance_le: data[i].specification.coil_inductance_le,
      effective_piston_area_sd: data[i].specification.effective_piston_area_sd,
      voice_coil_diameter: data[i].specification.voice_coil_diameter,
      voice_coil_height: data[i].specification.voice_coil_height,
      air_gap_height: data[i].specification.air_gap_height,
      linear_coil_travel_pp: data[i].specification.linear_coil_travel_pp,
      moving_mass_mms: data[i].specification.moving_mass_mms,
      free_air_resonance_fs: data[i].specification.free_air_resonance_fs,
      sensitivity: data[i].specification.sensitivity,
      mechanical_q_factor_qms: data[i].specification.mechanical_q_factor_qms,
      electrical_q_factor_qes: data[i].specification.electrical_q_factor_qes,
      total_q_factor_qts: data[i].specification.total_q_factor_qts,
      force_factor_bi: data[i].specification.force_factor_bi,
      rated_power_handling: data[i].specification.rated_power_handling,
      magnetic_flux_density: data[i].specification.magnetic_flux_density,
      magnet_weight: data[i].specification.magnet_weight,
      net_weight: data[i].specification.net_weight,
      equivalent_volume_vas: data[i].specification.equivalent_volume_vas,
      compliance_cms: data[i].specification.compliance_cms,
      mechanical_loss_rms: data[i].specification.mechanical_loss_rms,
      recommended_frequency_range: data[i].specification.recommended_frequency_range,
      max_mechanical_cone_excursion_xmech: data[i].specification.max_mechanical_cone_excursion_xmech,
    }
    let product: Products = {
      id: data[i].id,
      coverUrl: data[i].cover_img[0].url,
      CoverAlt: data[i].slug,
      name: data[i].name,
      slug: data[i].slug,
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

