/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import { css } from 'glamor';
import {
  b_course,
  b_course__title,
  b_course__copy,
  b_course__link,
} from './styles';

const Course = ({ course }) => (
  <div {...b_course} key={course.key + course.title}>
    <div><h2 {...b_course__title}>{course.title}</h2></div>
    <div>Subtitle: {course.subtitle}</div>
    <div><a href={course.homepage}>Homepage</a></div>
    <div>Summary: {course.summary}</div>
    <div>Short Summary: {course.short_summary}</div>
    <div>Key: {course.key}</div>
  </div>
); export const coursePropType = React.PropTypes.shape({
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
