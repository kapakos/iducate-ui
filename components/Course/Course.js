/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';

const Course = ({course}) => (
  <div key={course.key+course.title}>
    <div>{course.title}</div>
    <div>{course.subtitle}</div>
    <div><a href={course.homepage}>Homepage</a></div>
    <div>Key: {course.key}</div>
  </div>
);

export const coursePropType = React.PropTypes.shape({
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  homepage: React.PropTypes.string,
  summary: React.PropTypes.string,
  short_summary: React.PropTypes.string,
  key: React.PropTypes.string,
});

Course.defaultProps = {
  course: {},
};

Course.propTypes = {
  course: coursePropType,
};

export default Course;
