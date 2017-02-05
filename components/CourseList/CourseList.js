/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import R from 'ramda';

const CourseList = ({ addCourse, deleteCourse, courses }) => (
  <div className="courseList">
    <span>{ R.isEmpty(courses) ? 'No Courses' : 'Courses'}</span>
    <button onClick={addCourse}>Add Course</button>
    <button>Refresh</button>
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Institute</th>
            <th>Completed</th>
            <th>Score</th>
            <th>Graduation Date</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.Id}>
              <td>{course.Name}</td>
              <td>{course.Institute}</td>
              <td>{course.Completed ? 'yes' : 'no'}</td>
              <td>{course.Score}</td>
              <td>{course.GraduationDate.toString()}</td>
              <td>
                <input
                  type="button"
                  onClick={() => deleteCourse(course.Id)}
                  value="delete course"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

CourseList.defaultProps = {
  addCourse: () => {},
  deleteCourse: () => {},
  courses: [],
};

CourseList.propTypes = {
  addCourse: React.PropTypes.func,
  deleteCourse: React.PropTypes.func,
  courses:  React.PropTypes.arrayOf(
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

export default CourseList;
