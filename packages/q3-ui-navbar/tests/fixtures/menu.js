import TvIcon from '@material-ui/icons/Tv';
import MovieIcon from '@material-ui/icons/Movie';
import TheatersIcon from '@material-ui/icons/Theaters';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';

export default {
  'undefined': [
    {
      'icon': DashboardIcon,
      'label': 'dashboard',
      'to': '/',
    },
  ],
  'entertainment': [
    {
      'collectionName': 'movies',
      'enableSegments': true,
      'label': 'Movies',
      'to': '/movies',
      'icon': MovieIcon,
    },
    {
      'collectionName': 'shows',
      'enableSegments': true,
      'label': 'Shows',
      'to': '/shows',
      'icon': TvIcon,
      badge: 93,
    },
    {
      'collectionName': 'theatre',
      'enableSegments': false,
      'label': 'Theatre',
      'to': '/theatre',
      'icon': TheatersIcon,
    },
  ],
  'system': [
    {
      'collectionName': 'contacts',
      'enableSegments': true,
      'label': 'Contacts',
      'to': '/contacts',
      'icon': PeopleIcon,
    },
  ],
};
