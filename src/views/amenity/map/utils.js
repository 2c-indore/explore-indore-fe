import * as d3 from 'd3-collection';

export const a = 'a';
// Helpers
const nester = (data) => {
  const nested = d3.nest()
    .key((d) => { return d.section; })
    .entries(data);
  // console.log(nested);

  const obj = {};
  nested.forEach((item) => {
    const array = [];
    item.values.forEach((value) => {
      array.push(value);
    });
    obj[item.key] = array;
  });

  return obj;
};


const amenityParameters = [
  {
    section: 'hospital',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  },
  {
    section: 'hospital',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  },
  {
    section: 'hospital',
    keyName: 'operator:type',
    keyLabel: 'Operator Type',
    isEditable: 'TRUE',
  },
  {
    section: 'hospital',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  },
  {
    section: 'hospital',
    keyName: 'contact:phone',
    keyLabel: 'Phone Number',
    isEditable: 'TRUE',
  },
  {
    section: 'hospital',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  },
  {
    section: 'hospital',
    keyName: 'emergency',
    keyLabel: 'Emergency Service',
    isEditable: 'TRUE',
  },
  {
    section: 'hospital',
    keyName: 'facility:icu',
    keyLabel: 'ICU',
    isEditable: 'TRUE',
  },
  {
    section: 'hospital',
    keyName: 'facility:nicu',
    keyLabel: 'NICU',
    isEditable: 'TRUE',
  },
  {
    section: 'hospital',
    keyName: 'facility:operating_theatre',
    keyLabel: 'Operating Theatre',
    isEditable: 'TRUE',
  },
  {
    section: 'hospital',
    keyName: 'facility:x-ray',
    keyLabel: 'X-Ray',
    isEditable: 'TRUE',
  },
  {
    section: 'hospital',
    keyName: 'facility:ambulance',
    keyLabel: 'Ambulance Service',
    isEditable: 'TRUE',
  },
  {
    section: 'hospital',
    keyName: 'personnel:count',
    keyLabel: 'Number of Staff',
    isEditable: 'TRUE',
  },
  {
    section: 'hospital',
    keyName: 'capacity:beds',
    keyLabel: 'Number of Beds',
    isEditable: 'TRUE',
  },
  {
    section: 'clinic',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  },
  {
    section: 'clinic',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  },
  {
    section: 'clinic',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  },
  {
    section: 'clinic',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  },
  {
    section: 'clinic',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  },
  {
    section: 'clinic',
    keyName: 'healthcare:speciality',
    keyLabel: 'Specialisation',
    isEditable: 'TRUE',
  },
  {
    section: 'health_post',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  },
  {
    section: 'health_post',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  },
  {
    section: 'health_post',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  },
  {
    section: 'health_post',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  },
  {
    section: 'health_post',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  },
  {
    section: 'pharmacy',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  },
  {
    section: 'pharmacy',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  },
  {
    section: 'pharmacy',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  },
  {
    section: 'pharmacy',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  },
  {
    section: 'pharmacy',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  },
  {
    section: 'dentist',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  },
  {
    section: 'dentist',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  },
  {
    section: 'dentist',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  },
  {
    section: 'dentist',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  },
  {
    section: 'dentist',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  },
  {
    section: 'government',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  },
  {
    section: 'government',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  },
  {
    section: 'government',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  },
  {
    section: 'government',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  },
  {
    section: 'government',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  },
  {
    section: 'ngo',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  },
  {
    section: 'ngo',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  },
  {
    section: 'ngo',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  },
  {
    section: 'ngo',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  },
  {
    section: 'ngo',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  },
  {
    section: 'bank',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  },
  {
    section: 'bank',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  },
  {
    section: 'bank',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  },
  {
    section: 'bank',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  },
  {
    section: 'bank',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  },
  {
    section: 'bank',
    keyName: 'nrb_class',
    keyLabel: 'Bank Classfication',
    isEditable: 'TRUE',
  },
  {
    section: 'bank',
    keyName: 'atm',
    keyLabel: 'ATM Available',
    isEditable: 'TRUE',
  },
  {
    section: 'fuel',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  },
  {
    section: 'fuel',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  },
  {
    section: 'fuel',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  },
  {
    section: 'fuel',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  },
  {
    section: 'fuel',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  },
  {
    section: 'radio',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  },
  {
    section: 'radio',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  },
  {
    section: 'radio',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  },
  {
    section: 'radio',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  },
  {
    section: 'radio',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  },
  {
    section: 'radio',
    keyName: 'frequency',
    keyLabel: 'Frequency',
    isEditable: 'TRUE',
  },
  {
    section: 'television',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  },
  {
    section: 'television',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  },
  {
    section: 'television',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  },
  {
    section: 'television',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  },
  {
    section: 'television',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  },
];

const tagMapper = {
  hospital: [{
    section: 'hospital',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  }, {
    section: 'hospital',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  }, {
    section: 'hospital',
    keyName: 'operator:type',
    keyLabel: 'Operator Type',
    isEditable: 'TRUE',
  }, {
    section: 'hospital',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  }, {
    section: 'hospital',
    keyName: 'contact:phone',
    keyLabel: 'Phone Number',
    isEditable: 'TRUE',
  }, {
    section: 'hospital',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  }, {
    section: 'hospital',
    keyName: 'emergency',
    keyLabel: 'Emergency Service',
    isEditable: 'TRUE',
  }, {
    section: 'hospital',
    keyName: 'facility:icu',
    keyLabel: 'ICU',
    isEditable: 'TRUE',
  }, {
    section: 'hospital',
    keyName: 'facility:nicu',
    keyLabel: 'NICU',
    isEditable: 'TRUE',
  }, {
    section: 'hospital',
    keyName: 'facility:operating_theatre',
    keyLabel: 'Operating Theatre',
    isEditable: 'TRUE',
  }, {
    section: 'hospital',
    keyName: 'facility:x-ray',
    keyLabel: 'X-Ray',
    isEditable: 'TRUE',
  }, {
    section: 'hospital',
    keyName: 'facility:ambulance',
    keyLabel: 'Ambulance Service',
    isEditable: 'TRUE',
  }, {
    section: 'hospital',
    keyName: 'personnel:count',
    keyLabel: 'Number of Staff',
    isEditable: 'TRUE',
  }, {
    section: 'hospital',
    keyName: 'capacity:beds',
    keyLabel: 'Number of Beds',
    isEditable: 'TRUE',
  }],
  clinic: [{
    section: 'clinic',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  }, {
    section: 'clinic',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  }, {
    section: 'clinic',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  }, {
    section: 'clinic',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  }, {
    section: 'clinic',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  }, {
    section: 'clinic',
    keyName: 'healthcare:speciality',
    keyLabel: 'Specialisation',
    isEditable: 'TRUE',
  }],
  health_post: [{
    section: 'health_post',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  }, {
    section: 'health_post',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  }, {
    section: 'health_post',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  }, {
    section: 'health_post',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  }, {
    section: 'health_post',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  }],
  pharmacy: [{
    section: 'pharmacy',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  }, {
    section: 'pharmacy',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  }, {
    section: 'pharmacy',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  }, {
    section: 'pharmacy',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  }, {
    section: 'pharmacy',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  }],
  dentist: [{
    section: 'dentist',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  }, {
    section: 'dentist',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  }, {
    section: 'dentist',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  }, {
    section: 'dentist',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  }, {
    section: 'dentist',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  }],
  government: [{
    section: 'government',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  }, {
    section: 'government',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  }, {
    section: 'government',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  }, {
    section: 'government',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  }, {
    section: 'government',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  }],
  ngo: [{
    section: 'ngo',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  }, {
    section: 'ngo',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  }, {
    section: 'ngo',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  }, {
    section: 'ngo',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  }, {
    section: 'ngo',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  }],
  bank: [{
    section: 'bank',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  }, {
    section: 'bank',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  }, {
    section: 'bank',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  }, {
    section: 'bank',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  }, {
    section: 'bank',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  }, {
    section: 'bank',
    keyName: 'nrb_class',
    keyLabel: 'Bank Classfication',
    isEditable: 'TRUE',
  }, {
    section: 'bank',
    keyName: 'atm',
    keyLabel: 'ATM Available',
    isEditable: 'TRUE',
  }],
  fuel: [{
    section: 'fuel',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  }, {
    section: 'fuel',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  }, {
    section: 'fuel',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  }, {
    section: 'fuel',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  }, {
    section: 'fuel',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  }],
  radio: [{
    section: 'radio',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  }, {
    section: 'radio',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  }, {
    section: 'radio',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  }, {
    section: 'radio',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  }, {
    section: 'radio',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  }, {
    section: 'radio',
    keyName: 'frequency',
    keyLabel: 'Frequency',
    isEditable: 'TRUE',
  }],
  television: [{
    section: 'television',
    keyName: 'name',
    keyLabel: 'Name',
    isEditable: 'TRUE',
  }, {
    section: 'television',
    keyName: 'name:ne',
    keyLabel: 'नाम',
    isEditable: 'TRUE',
  }, {
    section: 'television',
    keyName: 'contact:phone',
    keyLabel: 'Phone',
    isEditable: 'TRUE',
  }, {
    section: 'television',
    keyName: 'contact:email',
    keyLabel: 'Email Address',
    isEditable: 'TRUE',
  }, {
    section: 'television',
    keyName: 'opening_hours',
    keyLabel: 'Opening Hours',
    isEditable: 'TRUE',
  }],
};

export const tagToPopup = (type, tags) => {
  const currentAmenityKeys = tagMapper[type];

  if (currentAmenityKeys !== undefined) {
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    let str = '';
    let newString = '';
    currentAmenityKeys.forEach((item) => {
      if (item.keyName === 'name') {
        console.log('namedetect');
        newString = `<div class="custom-popup-header pb-3"><h5><b>${tags[item.keyName]}</b></h5></div><div class="custom-popup-content">`;
      } else {
        newString = `<span class>${item.keyLabel}</span><br/><span><b>${tags[item.keyName] === undefined ? 'Not Available' : toTitleCase(tags[item.keyName])}</b></span><br/><br/>`;
      }
      str += newString;
    });

    str += '</div><div><button class="popup-btn"><i class="fas fa-pencil-alt"></i> <b>EDIT THIS DATA</b></button></div>';
    return str;
  } else {
    return '<span>Details coming soon</span>';
  }
};
