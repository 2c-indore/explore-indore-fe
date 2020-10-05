export const varToTitle = {
  // 'primary-hcs': 'Primary Health Centers',
  public_hospitals: 'Public Hospitals',
  private_hospitals: 'Private Hospitals',
  public_clinics: 'AYUSH Centres',
  private_clinics: 'Private Clinics',
  dentists: 'Dental Clinics',
  veterinaries: 'Veterinary Hospitals',
  patho_radio_labs: 'Laboratories',
  anganwadi: 'Anganwadis',
  // blood_banks: 'Blood Banks',
  // mental_health_centers: 'Mental Health Centers',
  // bus_stops: 'Bus Stops',
  pharmacies: 'Pharmacies',
  public_schools: 'Public Schools',
  private_schools: 'Private Schools',
  public_washrooms: 'Public Washrooms',
  public_waste_bins: 'Public Wastebins',
  atms: 'ATMs',
  fuel_stations: 'Fuel Stations',
  parks_playgrounds: 'Parks / playgrounds',


  // school: 'Schools',
  // hindu: 'Places of Worship (Hinduism)',
  // police: 'Police Stations',
  // hospital: 'Hospitals',
  // clinic: 'Clinics',
  // health_post: 'Health Posts',
  // pharmacy: 'Pharmacies',
  // dentist: 'Dental Clinics',
  // government: 'Government Offices',
  // ngo: 'NGOs',
  // bank: 'Banks',
  // cooperative: 'Co-operatives',
  // fuel: 'Fuel Stations',
  // radio: 'FM Stations',
  // television: 'TV Stations',
  // newspaper: 'Newspapers',
  // college: 'Colleges',
  // university: 'Universities',
  // kindergarten: 'Kindergartens',
  // buddhist: 'Places of Worship (Buddhism)',
  // christian: 'Places of Worship (Christianity)',
  // muslim: 'Places of Worship (Islam)',
  // kirat: 'Places of Worship (Kirat)',
  // sikh: 'Places of Worship (Sikhism)',
  // judaism: 'Places of Worship (Judaism)',
  // 'other-religion': 'Places of Worship (Other Religions)',
  // atm: 'ATMs',
  // restaurant: 'Restaurants',
  // museum: 'Museums',
  // storage_tank: 'Public Water Tanks',
  // water_tap: 'Public Water Taps',
  // water_well: 'Wells',
  // hotel: 'Hotels',
  // veterinary: 'Veterinaries',
};

export const sidebarMenuItems = [
  {
    category: 'Health Facilities',
    children: [
      {
        type: 'public_hospitals',
        route: '/public_hospitals',
        label: 'Public Hospitals',
      },
      {
        type: 'private_hospitals',
        route: '/private_hospitals',
        label: 'Private Hospitals',
      },
      {
        type: 'private_clinics',
        route: '/private_clinics',
        label: 'Private Clinics',
      },
      {
        type: 'dentists',
        route: '/dentists',
        label: 'Dental Clinics',
      },
      {
        type: 'veterinaries',
        route: '/veterinaries',
        label: 'Veterinary Hospitals',
      },
      {
        type: 'pharmacies',
        route: '/pharmacies',
        label: 'Pharmacies',
      },
      {
        type: 'patho_radio_labs',
        route: '/patho_radio_labs',
        label: 'Laboratories',
      },
      {
        type: 'anganwadi',
        route: '/anganwadi',
        label: 'Anganwadis',
      },
      {
        type: 'public_clinics',
        route: '/public_clinics', // Combines secondary HCS, tertiary HCS, and AYUSH center
        label: 'AYUSH Centres',
      },
    ],
  },
  {
    category: 'Other Facilities',
    children: [
      {
        type: 'public_schools',
        route: '/public_schools', // Combines secondary HCS, tertiary HCS, and AYUSH center
        label: 'Public Schools',
      },
      {
        type: 'private_schools',
        route: '/private_schools', // Combines secondary HCS, tertiary HCS, and AYUSH center
        label: 'Private Schools',
      },

      {
        type: 'public_washrooms',
        route: '/public_washrooms', // Combines secondary HCS, tertiary HCS, and AYUSH center
        label: 'Public Washrooms',
      },

      {
        type: 'public_waste_bins',
        route: '/public_waste_bins', // Combines secondary HCS, tertiary HCS, and AYUSH center
        label: 'Public Wastebins',
      },


      {
        type: 'atms',
        route: '/atms', // Combines secondary HCS, tertiary HCS, and AYUSH center
        label: 'ATMs',
      },

      {
        type: 'fuel_stations',
        route: '/fuel_stations', // Combines secondary HCS, tertiary HCS, and AYUSH center
        label: 'Fuel Stations',
      },


      {
        type: 'parks_playgrounds',
        route: '/parks_playgrounds', // Combines secondary HCS, tertiary HCS, and AYUSH center
        label: 'Parks / playgrounds',
      },
    ],
  },
  // {
  //   category: 'Others',
  //   children: [


  //     {
  //       type: 'blood_banks',
  //       route: '/blood_banks',
  //       label: 'Blood Banks',
  //     },
  //     {
  //       type: 'mental_health_centers',
  //       route: '/mental_health_centers',
  //       label: 'Mental Health Centers',
  //     },
  //     {
  //       type: 'bus_stops',
  //       route: '/bus_stops',
  //       label: 'Bus Stops',
  //     },
  //   ],
  // },
  // {
  //   category: 'Education',
  //   children: [
  //     {
  //       type: 'kindergarten',
  //       route: '/kindergarten',
  //       label: 'Kindergarten',
  //     },
  //     {
  //       type: 'school',
  //       route: '/school',
  //       label: 'Schools',
  //     },
  //     {
  //       type: 'college',
  //       route: '/college',
  //       label: 'Colleges',
  //     },
  //     {
  //       type: 'university',
  //       route: '/university',
  //       label: 'Universities',
  //     },
  //   ],
  // },
  // {
  //   category: 'Health',
  //   children: [
  //     {
  //       type: 'hospital',
  //       route: '/hospital',
  //       label: 'Hospitals',
  //     },
  //     {
  //       type: 'clinic',
  //       route: '/clinic',
  //       label: 'Clinics',
  //     },
  //     {
  //       type: 'health_post',
  //       route: '/health_post',
  //       label: 'Health Posts',
  //     },
  //     {
  //       type: 'pharmacy',
  //       route: '/pharmacy',
  //       label: 'Pharmacies',
  //     },
  //     {
  //       type: 'dentist',
  //       route: '/dentist',
  //       label: 'Dentist',
  //     },
  //     {
  //       type: 'veterinary',
  //       route: '/veterinary',
  //       label: 'Veterinaries',
  //     },
  //   ],
  // },
  // {
  //   category: 'Financial Institutions',
  //   children: [
  //     {
  //       type: 'bank',
  //       route: '/bank',
  //       label: 'Banks',
  //     },
  //     {
  //       type: 'cooperative',
  //       route: '/cooperative',
  //       label: 'Co-operatives',
  //     },
  //     {
  //       type: 'atm',
  //       route: '/atm',
  //       label: 'ATMs',
  //     },
  //   ],
  // },
  // {
  //   category: 'Governance',
  //   children: [
  //     {
  //       type: 'government',
  //       route: '/government',
  //       label: 'Government Offices',
  //     },
  //     {
  //       type: 'ngo',
  //       route: '/ngo',
  //       label: 'NGOs',
  //     },
  //   ],
  // },
  // {
  //   category: 'Tourism',
  //   children: [
  //     {
  //       type: 'hotel',
  //       route: '/hotel',
  //       label: 'Hotels',
  //     },
  //     {
  //       type: 'restaurant',
  //       route: '/restaurant',
  //       label: 'Restaurants',
  //     },
  //     {
  //       type: 'museum',
  //       route: '/museum',
  //       label: 'Museums',
  //     },
  //     // {
  //     //   type: 'park',
  //     //   route: '/park',
  //     //   label: 'Parks',
  //     // },
  //   ],
  // },
  // {
  //   category: 'Water',
  //   children: [
  //     {
  //       type: 'storage_tank',
  //       route: '/storage_tank',
  //       label: 'Public Water Tanks',
  //     },
  //     {
  //       type: 'water_tap',
  //       route: '/water_tap',
  //       label: 'Public Taps',
  //     },
  //     {
  //       type: 'water_well',
  //       route: '/water_well',
  //       label: 'Wells',
  //     },
  //   ],
  // },
  // {
  //   category: 'Energy',
  //   children: [
  //     {
  //       type: 'fuel',
  //       route: '/fuel',
  //       label: 'Fuel Station',
  //     },
  //     // {
  //     //   type: 'gas',
  //     //   route: '/gas',
  //     //   label: 'LPG Shops',
  //     // },
  //   ],
  // },
  // {
  //   category: 'Communication',
  //   children: [
  //     {
  //       type: 'radio',
  //       route: '/radio',
  //       label: 'FM Stations',
  //     },
  //     {
  //       type: 'television',
  //       route: '/television',
  //       label: 'TV Stations',
  //     },
  //     {
  //       type: 'newspaper',
  //       route: '/newspaper',
  //       label: 'Newspapers',
  //     },
  //   ],
  // },
  // {
  //   category: 'Places of Worship',
  //   children: [
  //     {
  //       type: 'hindu',
  //       route: '/hindu',
  //       label: 'Hinduism',
  //     },
  //     {
  //       type: 'muslim',
  //       route: '/muslim',
  //       label: 'Islam',
  //     },
  //     {
  //       type: 'buddhist',
  //       route: '/buddhist',
  //       label: 'Buddhism',
  //     },
  //     {
  //       type: 'christian',
  //       route: '/christian',
  //       label: 'Christianity',
  //     },
  //     {
  //       type: 'kirat',
  //       route: '/kirat',
  //       label: 'Kirat',
  //     },
  //     {
  //       type: 'sikh',
  //       route: '/sikh',
  //       label: 'Sikhism',
  //     },
  //     {
  //       type: 'judaism',
  //       route: '/judaism',
  //       label: 'Judaism',
  //     },
  //     {
  //       type: 'other-religion',
  //       route: '/other-religion',
  //       label: 'Other Religions',
  //     },
  //   ],
  // },
  // {
  //   category: 'Security',
  //   children: [
  //     {
  //       type: 'police',
  //       route: '/police',
  //       label: 'Police Stations',
  //     },
  //   ],
  // },
];

// the map is dependent of the parameters being fetched.
export const amenityData = {
  map: {
    // geojson here
  },
  parameters: {
    // parameters, or things the user can play with. initialize state as soon as we recieve this.
    // in case of single select fields, its always the first option, in case of ranges its always
    // the min and max, and in case of multiselect, its always all selected.
    1: {
      id: 1,
      parameter_name: 'bed_capacity',
      type: 'range',
      range: { min: 0, max: 100 },
      label: 'Select bed capacity',
    },
    2: {
      id: 2,
      parameter_name: 'ward',
      type: 'single-select',
      options: [{ label: 'Ward 1', value: 1 }, { label: 'Ward 2', value: 2 }],
      label: 'Select ward',
    },
    3: {
      id: 3,
      parameter_name: 'hospital_facilities',
      type: 'multi-select',
      options: [{ label: 'Ward 1', value: 1 }, { label: 'Ward 2', value: 2 }],
      label: 'Select facilities',
    },
  },
  insights: {
    // some insights here. there may be n number of insights.
    1: {
      id: 1,
      insight_title: 'Hospitals',
      value: 38,
      max_value: 50,
    },
    2: {
      id: 2,
      insight_title: 'Bed capacity',
      value: 287,
      max_value: 3000,
    },
  },
};

export const redux = {
  type: 'hospitals',
  state: null, // this should directly add as filterparams
  insights: null,
  geometries: null,
};
