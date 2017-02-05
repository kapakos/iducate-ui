/**
 * @description
 *
 * @author pkapako
 */
import React from 'react';
import securePage from '../hocs/securePage';

const courses = () => (<div className="courses"><div>{console.log('courses')}</div>Courses</div>);

export default securePage(courses);
