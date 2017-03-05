/**
 * @description
 *
 * @author pkapako
 */
import R from 'ramda';
import 'isomorphic-fetch';

export const getUdacityCourses = () => {
  const udacityEndpoint = 'https://www.udacity.com/public-api/v0/courses';
  return fetch(udacityEndpoint)
    .then(res => res.json())
    .then(res => {
      if (res.status) {
        if (res.status == 404) {
          return Promise.reject("Could not load courses from Udacity Api. Error message: " + res.error + ". Server Status: " + res.status);
        }
      }
      return res;
    })
    .then(data => {
      return R.uniq(data.courses.map(
        ({title, subtitle, image, key, homepage, short_summary}) => ({
          title,
          subtitle,
          image,
          key,
          homepage,
          short_summary,
        })));
    });
};

