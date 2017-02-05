/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import courses from '../data/courses';
import CourseList from '../components/CourseList';
import securePage from '../hocs/securePage';

class Dashboard extends React.Component {
  static getInitialProps() {
    return { courses };
  }

  renderCourses = () => <CourseList courses={courses} />;

  render = () => <div>{this.renderCourses(courses)}{console.log('Dashboard')}</div>;
}

Dashboard.propTypes = {
  courses: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      Id: React.PropTypes.string.isRequired,
      Name: React.PropTypes.string.isRequired,
      Institute: React.PropTypes.string.isRequired,
      Completed: React.PropTypes.bool.isRequired,
      Score: React.PropTypes.string.isRequired,
      GraduationDate: React.PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

Dashboard.defaultProps = {
  courses: [],
};

export default securePage(Dashboard);
