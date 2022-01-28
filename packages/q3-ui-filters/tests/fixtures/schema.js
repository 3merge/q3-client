export default {
  'employment.company': {
    type: 'String',
    enum: [
      'Gibson',
      'Guild',
      'Seagull',
      'Yamaha',
      'Ovation',
      'Gretsch',
      'Washburn',
      'Fender',
      'Epiphone',
      'Yamaha',
      'ESP',
      'Ibanez',
      'Martin',
      'Taylor',
      'Rickenbacker',
      'Paul Reed Smith',
    ],
  },
  'employment.startDate': {
    type: 'Date',
  },
  'employment.position': {
    type: 'String',
    ref: 'jobs',
  },
  createdAt: {
    type: 'Date',
  },
  updatedAt: {
    type: 'Date',
  },
  verified: {
    type: 'Boolean',
  },
  age: {
    type: 'Number',
  },
  associates: {
    field: 'name',
    type: 'ObjectId',
    ref: 'users',
  },
};
