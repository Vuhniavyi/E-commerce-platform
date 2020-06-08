import React, { Component, Fragment } from 'react';
import styles from './learn.module.css';
import AbsModuleLesson from './ModuleLesson';
import Docimg from '../components/Icons/docDownload.png';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import api from '../../../actions/request';
import MyButton from '../components/Buttons/Button';
// import VideoPlayer from './VideoPlayer'
import YouTube from 'react-youtube';
// import ReactAwesomePlayer from 'react-awesome-player'

export default class AbsModule extends Component {
  state = {
    number: this.props.number,
    description: '',
    currentLesson: this.props.data.lessons[0],
    value: 'Ответ:',
    fileBinary: null
  };
  changeLesson = id => {
    const currentLesson = this.props.data.lessons.find(el => el.id === id);
    this.setState({
      currentLesson,
      value:
        currentLesson.homeAssignment.length > 0
          ? currentLesson.homeAssignment[0].text
          : 'Ответ:'
    });
  };
  componentDidUpdate(prev) {
    if (prev.data.id !== this.props.data.id) {
      if (this.props.data.id !== 0) {
        this.setState({ currentLesson: null });
      } else {
        this.setState({
          currentLesson: prev.modules.find(el => el.id === 0).lessons[0]
        });
      }
    }

    return true;
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  // handleSubmit = (event) => {
  //   alert('ДЗ отправлено: ' + this.state.value);
  //   event.preventDefault();
  // }

  handleSubmit = event => {
    event.preventDefault();
    // const data = new FormData(event.target);
    api('post', 'academy/home-assignment/', {
      text: this.state.value,
      file: this.state.file,
      Lesson_id: this.state.currentLesson.id
    }).then(el => {
      this.setState(prev => ({
        ...prev,
        currentLesson: {
          ...prev.currentLesson,
          homeAssignment: [...prev.currentLesson.homeAssignment, el]
        }
      }));
    });
    alert('ДЗ отправлено: ' + this.state.value);
    this.setState({ value: '', fileBinary: '' });
  };
  toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  onDrop = file => {
    this.toBase64(file[0]).then(el => {
      this.setState({ file: el });
      this.setState({ fileBinary: file[0] });
    });
  };

  parseYouTube = link => {
    let rx = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = link.match(rx);
    if (match && match[2].length == 11) {
      return match[2];
    }
  };

  // openFullscreen = (div, elem) => {
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen();
  //   } else if (elem.mozRequestFullScreen) {
  //     /* Firefox */
  //     elem.mozRequestFullScreen();
  //   } else if (elem.webkitRequestFullscreen) {
  //     /* Chrome, Safari and Opera */
  //     elem.webkitRequestFullscreen();
  //   } else if (elem.msRequestFullscreen) {
  //     /* IE/Edge */
  //     elem.msRequestFullscreen();
  //   }

  //   div.ondblclick = e => {
  //     this.closeFullscreen(div, elem);
  //   };
  // };

  // closeFullscreen = (div, elem) => {
  //   if (window.innerHeight == window.screen.height) {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //     } else if (document.mozCancelFullScreen) {
  //       /* Firefox */
  //       document.mozCancelFullScreen();
  //     } else if (document.webkitExitFullscreen) {
  //       /* Chrome, Safari and Opera */
  //       document.webkitExitFullscreen();
  //     } else if (document.msExitFullscreen) {
  //       /* IE/Edge */
  //       document.msExitFullscreen();
  //     }

  //     div.ondblclick = e => {
  //       this.openFullscreen(div, elem);
  //     };
  //   } else this.openFullscreen(div, elem);
  // };

  // onPlayerReady = event => {
  //   let div = event.target['a'].parentNode;
  //   let player = event.target;
  //   let iframe = div.getElementsByTagName('iframe')[0];
  //   let progressBar = iframe.querySelector('.ytp-progress-bar-container');

  //   div.onclick = e => {
  //     let state = player.getPlayerState();
  //     if (state === 1) {
  //       player.pauseVideo();
  //     } else {
  //       player.playVideo();
  //     }
  //   };

  //   div.ondblclick = e => {
  //     this.openFullscreen(div, iframe);
  //   };
  // };

  func = () => {
    const { currentLesson, fileBinary } = this.state;
    return (
      <Fragment>
        {currentLesson.videos
          ? currentLesson.videos.map(video => (
              <div className={styles.videoWrap}>
                <YouTube
                  className={styles.video}
                  videoId={this.parseYouTube(video.videoLink)}
                  opts={this.opts}
                  // onReady={this.onPlayerReady}
                />
               </div>
            ))
          : ''}
        {currentLesson && currentLesson.files[0]
          ? currentLesson.files.map(fileIn => (
              <p className={styles.title}>
                <a
                  className={styles.downloadDoc}
                  href={fileIn.lessonFile.file}
                  download
                >
                  <img
                    className={styles.docImg}
                    alt="ImageName"
                    src={Docimg}
                  ></img>
                  <p className={styles.downloadDocText}>
                    Скачать материалы: {this.props.data.title}{' '}
                    {this.props.data.number}, урок{' '}
                    {currentLesson && currentLesson.title}
                  </p>
                </a>
              </p>
            ))
          : ''}

        {currentLesson &&
          currentLesson.homeAssignment.length !== 0 &&
          currentLesson.homeAssignment[0].status &&
          currentLesson.homeAssignment[0].status === 3 && (
            <div>
              <h6 className={styles.HWtext}>
                Домашнее задание отправленно на проверку
              </h6>
            </div>
          )}
        {currentLesson &&
          currentLesson.homeAssignment.length !== 0 &&
          currentLesson.homeAssignment[0].status &&
          currentLesson.homeAssignment[0].status === 1 && (
            <div>
              <h6 className={styles.HWtextDONE}>Домашнее задание принято</h6>
            </div>
          )}
        {((currentLesson && currentLesson.homeAssignment.length === 0) ||
          (currentLesson &&
            currentLesson.homeAssignment.length !== 0 &&
            currentLesson.homeAssignment[0].status &&
            currentLesson.homeAssignment[0].status === 2)) && (
          <form onSubmit={this.handleSubmit}>
            <label className={styles.textFieldHW}>
              Домашнее задание:
              {/* <div className={styles.downloadDocText}>{currentLesson.homeTask.length !== 0 ? currentLesson.homeTask[0].text : 'ДЗ немає - Доббі свободен'}</div> */}
              {
                <div
                  className={styles.HW}
                  dangerouslySetInnerHTML={{
                    __html: currentLesson.homeTask[0].text
                  }}
                ></div>
              }
              {/* {<div className={styles.HW}> {currentLesson.homeTask[0] ? currentLesson.homeTask[0].text : ''} </div>} */}
              <textarea value={this.state.value} onChange={this.handleChange} />
            </label>
            {currentLesson && (
              <div>
                <h6 className={styles.specificationText}>
                  <span className={styles.specificationStar}>*</span> в поле
                  необходимо вписать ответы на все задания по очереди. При
                  редактировании не удаляйте предыдущий текст.
                </h6>
              </div>
            )}
            <div className={styles.attachDocAndSave}>
              <label className={styles.attachDoc}>
                <Dropzone onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <button type="button" className={styles.attachDocButton}>
                        Прикрепить документ/файл{' '}
                        {(fileBinary && fileBinary.name) ||
                          (currentLesson.homeAssignment.file &&
                            'http://192.168.0.144:8001' +
                              currentLesson.homeAssignment.file.file)}
                      </button>
                    </div>
                  )}
                </Dropzone>
              </label>

              <MyButton
                className={styles.buttonSubmit}
                title={`Отправить`}
                type="submit"
                myvariant="green"
              />
            </div>
          </form>
        )}
      </Fragment>
    );
  };

  render() {
    const { data } = this.props;
    const { modules, currentModule, currentLesson, fileBinary } = this.state;

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
        controls: 1,
        showinfo: 0,
        rel: 0,
        disablekb: 0
      }
    };

    return (
      <div className={styles.aboutContent}>
        {/* <video
          // id="vid1"
          // className="video-js vjs-default-skin"
          // controls
          // autoPlay
          width="640" height="264"
        // data-setup='{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=xjS6SftYQaQ"}] }'
        >
          <source src="https://www.youtube.com/embed/vR7_RAEOBZk?enablejsapi=1&origin=http%3A%2F%2Flocalhost%3A3000&widgetid=1" type="video/mp4"></source>
        </video> */}

        {/* <video width="400" height="300" controlsList="nodownload" controls="controls">
          <source src="https://r1---sn-4g5ednly.googlevideo.com/videoplayback?expire=1581018879&ei=nho8XrmyL8-OxgTF6bLACQ&ip=200.73.128.164&id=o-AMHhXcFGEX3mltJvVGItaPOULNzP-Jmy2GR41Q-RJs1A&itag=43&source=youtube&requiressl=yes&vprv=1&mime=video%2Fwebm&gir=yes&clen=4700692&ratebypass=yes&dur=0.000&lmt=1576774326975101&fvip=1&fexp=23842630,23872990&c=WEB&txp=6201222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRAIgP1UZizwfIpuLGmYzNGEzUpzUbTbeirOFf3FGZch98hcCIHoKU0zxF-IAgbpEJxJtFYWn32l3WBeNvSN7QTaUcgy7&video_id=vR7_RAEOBZk&title=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82%D1%81%D1%82%D0%B2%D0%B8%D0%B5+%D0%BD%D0%B0+%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D0%B5&redirect_counter=1&cm2rm=sn-njaee7e&req_id=ea8e622fad34a3ee&cms_redirect=yes&mip=176.37.172.236&mm=34&mn=sn-4g5ednly&ms=ltu&mt=1580998285&mv=m&mvi=0&pl=16&lsparams=mip,mm,mn,ms,mv,mvi,pl&lsig=AHylml4wRAIgRamDw7IJrip3XJrpNHCRUpdBpZI_ogef-C6ZR9-m_EsCIBPYUTi1m5WNAMJrGmEpkWBcJpduG6IBbOw7BlWaA6Sa" type="video/webm"></source>
        </video>


        <video width="400" height="300" controlsList="nodownload" controls="controls">
          <source src="https://fs32.fex.net:443/play/2670280230/nce4eao" type="video/mp4"></source>
        </video> */}

        <div className={styles.lessongBtns}>
          {data.lessons.map(
            lesson =>
              lesson.id !== 0 && (
                <AbsModuleLesson
                  data={lesson}
                  changeLesson={this.changeLesson}
                />
              )
          )}
        </div>

        {currentLesson && (
          <div className={styles.title}>
            <h2>
              {currentLesson.id === 0
                ? currentLesson.title
                : `Урок ${currentLesson.title}`}
            </h2>
          </div>
        )}

        {currentLesson && (
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: currentLesson.text }}
          ></div>
        )}

        {currentLesson && currentLesson.id !== 0 ? this.func() : ''}
      </div>
    );
  }
}
