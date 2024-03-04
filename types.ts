export interface Menu {
    id: string;
    name: string;
    href: string;
    active: boolean;
}

export interface Products {
    id: string;
    name: string;
    slug: string;
    coverUrl: string;
    CoverAlt: string;
    size: Size;
    categories: AllCategory[];
    sub_categories: AllCategory[];
    sub_sub_categories: AllCategory[];
    specification: Specifications;
}

export interface Size {
    value: number;
    label: string;
}

export interface AllCategory {
    id: string;
    name: string;
    slug: string;
}

export interface SingleProduct {
    product: Products;
    spec: Specifications[];
    description: string;
    imageUrl_catalogue: string[];
}

export interface Specifications {
    id: string;
    name: string;
    slug: string;
}

export interface Filters {
    id: string;
    name: string;
    origin: string;
    params: string;
}

export interface Specifications {
    impedance: string;
    dc_resistance_re: string;
    coil_inductance_le: string;
    effective_piston_area_sd: string;
    voice_coil_diameter: string;
    voice_coil_height: string;
    air_gap_height: string;
    linear_coil_travel_pp: string;
    moving_mass_mms: string;
    free_air_resonance_fs: string;
    sensitivity: string;
    mechanical_q_factor_qms: string;
    electrical_q_factor_qes: string;
    total_q_factor_qts: string;
    force_factor_bi: string;
    rated_power_handling: string;
    magnetic_flux_density: string;
    magnet_weight: string;
    net_weight: string;
    equivalent_volume_vas: string;
    compliance_cms: string;
    mechanical_loss_rms: string;
    recommended_frequency_range: string;
    max_mechanical_cone_excursion_xmech: string;
}

// export interface SliderFilter {
//     value: number;
//     label: string;
// }
export interface RangeSliderFilter {
    value: number;
}
export interface RangeFilters {
    id: string;
    namebottom: string;
    nametop: string;
    origin: string;
    params: string;
    unit: string;
}