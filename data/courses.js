/**
 * @description
 *
 * @author pkapako
 */
import moment from 'moment';
import v4 from 'uuid/v4';

export default [
  {
    Id: v4(),
    Name: 'Advanced JavaScript Programming',
    Institute: 'Pluralsight',
    Completed: true,
    Score: '0',
    GraduationDate: moment('2014-04-23').format(),
  },
  {
    Id: v4(),
    Name: 'Domain Driven Design',
    Institute: 'Pluralsight',
    Completed: true,
    Score: '0',
    GraduationDate: moment('2015-08-13').format(),
  },
  {
    Id: v4(),
    Name: 'Startup Engineering',
    Institute: 'Coursera',
    Completed: true,
    Score: '0',
    GraduationDate: moment('2013-03-07').format(),
  },
];

