import React, { Component } from 'react';
import styles from './learn.module.css';

export default class AbsModuleLesson extends Component {
  state = {
    number: this.props.number,
    description: ''
  };

  render() {
    const { number } = this.state;
    const { data, changeLesson} = this.props;  
    const isDisabled = data.userLessonFinish[0] ? data.userLessonFinish && data.userLessonFinish[0].finished : false;

    return (
      <button
        className={styles.lessonButton}
        disabled={!isDisabled}
        onClick={() => changeLesson(data.id)}
      >
        <h6>Урок {data.title}</h6>
        {/* <div dangerouslySetInnerHTML={{__html:data.description} } ></div> */}
        {/* <div>{data.text}</div> */}
      </button>
    );
  }
}
