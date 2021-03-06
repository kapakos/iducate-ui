/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import withRedux from 'next-redux-wrapper';
import R from 'ramda';
import initStore from '../store';
import { loadUdacityCourses } from '../reducer/modules/courses';
import Course from '../components/Course';
import Layout from '../components/Layout';
import securePageService from '../services/server/securePageService';
import { checkAuthentication } from '../reducer/modules/auth';

class Courses extends React.Component {
  static async getInitialProps(ctx) {
    await ctx.store.dispatch(checkAuthentication(ctx.req));
    const state = ctx.store.getState();
    const loggedUser = state.auth.user;
    await securePageService(ctx.res, loggedUser);
    await ctx.store.dispatch(loadUdacityCourses());

    return {
      user: loggedUser,
      isAuthenticated: !!loggedUser,
      courses: ctx.store.getState().courses,
    };
  }

  render() {
    const { isAuthenticated, courses } = this.props;
    console.log("Are courses loaded");
    console.log(courses.loaded);
    console.log("Is data there");
    console.log(courses.data);
    return (
      <Layout isAuthenticated>
        <div className="courses">
          <span>
            Found {(courses.loaded && courses.data.length) || 0} Courses
          </span>
          {courses.loaded && courses.data &&
            courses.data.map(course => (
              <Course course={course} key={course.key} />
            ))}
          {!courses.loaded &&
            courses.loading_error &&
            <div>{courses.loading_error}</div>}
        </div>
      </Layout>
    );
  }
}

Courses.defaultProps = {
  courses: {},
  auth: {},
};

export default withRedux(initStore)(Courses);
