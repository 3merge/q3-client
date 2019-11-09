import * as yup from 'yup';
import Input, { Check, DesktopSelect } from 'q3-ui/inputs';

export const initialData = [
  {
    streetLine1: '',
    streetLine2: '',
    city: '',
    region: '',
    country: '',
    postal: '',
    branch: false,
  },
  {
    company: '',
    firstName: '',
    lastName: '',
    phone1: '',
  },
];

export const states = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AS': 'American Samoa',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'DC': 'District Of Columbia',
  'FM': 'Federated States Of Micronesia',
  'FL': 'Florida',
  'GA': 'Georgia',
  'GU': 'Guam',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MH': 'Marshall Islands',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'MP': 'Northern Mariana Islands',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PW': 'Palau',
  'PA': 'Pennsylvania',
  'PR': 'Puerto Rico',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VI': 'Virgin Islands',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming',
};

export const provinces = {
  AB: 'Alberta',
  BC: 'British Columbia',
  MB: 'Manitoba',
  NB: 'New Brunswick',
  NL: 'Newfoundland and Labrador',
  NS: 'Nova Scotia',
  ON: 'Ontario',
  PE: 'Prince Edward Island',
  QC: 'Quebec',
  SK: 'Saskatchewan',
  NT: 'Northwest Territories',
  NU: 'Nunavut',
  YT: 'Yukon',
};

const selectify = (o) =>
  Object.entries(o).map(([k, v]) => ({
    value: k,
    label: v,
  }));

yup.addMethod(yup.string, 'postal', function postal() {
  return this.test((v) =>
    /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/.test(v),
  );
});

export default [
  {
    streetLine1: {
      type: Input,
      required: true,
      validate: yup.string().required(),
    },
    streetLine2: {
      type: Input,
      validate: yup.string().required(),
    },
    city: {
      type: Input,
      required: true,
      validate: yup.string().required(),
    },
    region: {
      type: DesktopSelect,
      required: true,
      validate: yup.string().required(),
      options: (e) => {
        if (e.country === 'United States')
          return selectify(states);

        if (e.country === 'Canada')
          return selectify(provinces);

        return [];
      },
    },
    country: {
      type: DesktopSelect,
      required: true,
      validate: yup.string().required(),
      options: [
        {
          label: 'Canada',
          value: 'Canada',
        },
        {
          label: 'United States',
          value: 'United States',
        },
      ],
    },
    postal: {
      type: Input,
      required: true,
      validate: yup
        .string()
        .postal()
        .required(),
    },
    branch: {
      type: Check,
      expected: 'checkbox',
      validate: yup.boolean(),
    },
  },
  {
    company: {
      type: Input,
      required: true,
      validate: yup.string().required(),
    },
    firstName: {
      type: Input,
      required: true,
      validate: yup.string().required(),
    },
    lastName: {
      type: Input,
      required: true,
      validate: yup.string().required(),
    },
    phone1: {
      type: Input,
      expected: 'tel',
      required: true,
      validate: yup.string().required(),
    },
  },
];
