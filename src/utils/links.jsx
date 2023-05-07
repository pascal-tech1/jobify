import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = [
  { id: 0, text: 'stats', path: '/', icon: <IoBarChartSharp/> },

  { id: 1, text: 'all jobs', path: 'all-jobs',  icon: <MdQueryStats/> },
  { id: 2, text: 'add job', path: 'add-job',  icon: <FaWpforms/> },
  { id: 3, text: 'profile', path: 'profile',  icon: <ImProfile/> },
];



export default links;
