/**
 * @description
 *
 * @author pkapako
 */
import R from 'ramda';
import 'isomorphic-fetch';
import config from '../../config';

const getUdacityCourses = () => {
  const udacityEndpoint = `${config.API.iducateServices}/udacity-courses`;
  return fetch(udacityEndpoint)
    .then(res => res.json())
    .then((res) => {
      if (res.status) {
        if (res.status === 404) {
          return Promise.reject(
            `Could not load courses from Udacity Api. Error message: ${res.error}. Server Status: ${res.status}`,
          );
        }
      }
      return res;
    })
    .catch(console.error)
    .then(data =>
      R.uniq(
        data.map(({
          title,
          homepage,
          subtitle,
          key,
          short_summary,
          summary,
          image,
          project_name,
          level,
          expected_learning,
        }) => ({
          title,
          homepage,
          subtitle,
          key,
          short_summary,
          summary,
          image,
          project_name,
          level,
          expected_learning,
        })),
      ));
};

export default getUdacityCourses;
