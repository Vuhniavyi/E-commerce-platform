import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getModules } from '../../../actions/abccabinet';
import { notification } from 'antd';
import styles from './learn.module.css';
import { Link, Route, Switch } from 'react-router-dom';
import MyButton from '../components/Buttons/Button';
import Icons from '../components/Icons/Icons';
import About from './About';
import AboutAll from './AboutAll';
import AbsModule from './Module';
import mexImg from '../../../img/mex.JPG';

// import Button from '@material-ui/core/Button';
// import 'antd/dist/antd.css';
// import {Link} from 'react-router-dom';
// import LearningLayout from './LearningLayout';
// import {Modal} from "antd";

class LearningModule extends Component {
  state = {
    modules: [
      {
        id: 0,
        title: 'Механика обучения',
        number: 0,
        lessons: [
          {
            id: 0,
            title: 'Механика обучения',
            // text: `Привет! <br><br> <p>Если ты это то читаешь, то ты принял решение действовать и развиваться. Значит ты на правильном пути и я тебе помогу! В этом курсе я делюсь своим опытом ведения  бизнеса. Помимо меня в этом курсе будет еще 4 эксперта в своих нишах. Каждый из них практик и мастер своего дела, и с удовольствием поделится с тобой своими знаниями и опытом. В этом курсе есть все инструменты для начала и вывода твоего бизнеса на новый уровень!</p><p>Бизнес должен служить собственнику, а не наоборот. Построй такой бизнес и живи в кайф! Удачи на обучении и не забывай выполнять домашние задания!</p><p>За неделю до старта обучения Вам на почту приходит логин и пароль для доступа в личный кабинет на образовательную платформу.Вы просматриваете видеоуроки и на базе знаний, которые Вы получили, приступаете к выполнению домашнего задания.Домашнее задание выполняется в специальной форме, которая встроена в обучающую платформу либо, при наличии в уроке чек-листа, Вы скачиваете его, заполняете и прикрепляете его к ответу, после чего отправляете нам для проверки. После отправки домашнего задания, Вам будет автоматически предоставлен доступ к следующему уроку. Доступ к следующему модулю обучения открывается после проверки домашних заданий ко всем урокам прошлого модуля. <div class='mexImgBlock'><img style='width: 95%' src=${mexImg}></div>`,
            text: `<div style="font-family: Georgia, serif; font-size: 18px;">Привет! <br><br><p style="font-family: Georgia, serif; font-size: 18px;">Если Вы это читаете, то Вы приняли решение действовать и развиваться. Значит Вы на правильном пути и я Вам помогу! В этом курсе я делюсь своим опытом ведения  бизнеса. Помимо меня в этом курсе будет еще 4 эксперта в своих нишах. Каждый из них практик и мастер своего дела, и с удовольствием поделится с Вами своими знаниями и опытом. В этом курсе есть все инструменты для начала и вывода Вашего бизнеса на новый уровень! 
            Бизнес должен служить собственнику, а не наоборот. Постройте такой бизнес и живите в кайф! Удачи на обучении и не забывай выполнять домашние задания!
            </p>
            <ul>
            <li style="font-family: Georgia, serif; font-size: 18px;">За неделю до старта обучения Вам на почту приходит логин и пароль для доступа в личный кабинет на образовательную платформу.</li>
            <li style="font-family: Georgia, serif; font-size: 18px;">Вы просматриваете видеоуроки и на базе знаний, которые Вы получили, приступаете к выполнению домашнего задания.</li>
            <li style="font-family: Georgia, serif; font-size: 18px;">Домашнее задание выполняется в специальной форме, которая встроена в обучающую платформу либо, при наличии в уроке чек-листа, Вы скачиваете его, заполняете и прикрепляете его к ответу, после чего отправляете нам для проверки. </li>
            <li style="font-family: Georgia, serif; font-size: 18px;">После отправки домашнего задания, Вам будет автоматически предоставлен доступ к следующему уроку. </li>
            <li style="font-family: Georgia, serif; font-size: 18px;">Доступ к следующему модулю обучения открывается после проверки домашних заданий ко всем урокам прошлого модуля. </li>
            </ul><br><br>
            <div class='mexImgBlock'><img style='width: 95%' src=${mexImg}></div></div>`,
            files: [],
            videos: [],
            homeAssignment: [],
            homeTask: [{ text: '' }],
            userLessonFinish: [{ finished: true }]
          }
        ],
        userModelFinish: [{ finished: true }]
      }
    ],
    currentModule: {
      id: 0,
      title: 'Механика обучения',
      number: 0,
      lessons: [
        {
          id: 0,
          title: 'Механика обучения',
          // text: `Привет! <br><br> <p>Если ты это то читаешь, то ты принял решение действовать и развиваться. Значит ты на правильном пути и я тебе помогу! В этом курсе я делюсь своим опытом ведения  бизнеса. Помимо меня в этом курсе будет еще 4 эксперта в своих нишах. Каждый из них практик и мастер своего дела, и с удовольствием поделится с тобой своими знаниями и опытом. В этом курсе есть все инструменты для начала и вывода твоего бизнеса на новый уровень!</p><p>Бизнес должен служить собственнику, а не наоборот. Построй такой бизнес и живи в кайф! Удачи на обучении и не забывай выполнять домашние задания!</p><p>За неделю до старта обучения Вам на почту приходит логин и пароль для доступа в личный кабинет на образовательную платформу.Вы просматриваете видеоуроки и на базе знаний, которые Вы получили, приступаете к выполнению домашнего задания.Домашнее задание выполняется в специальной форме, которая встроена в обучающую платформу либо, при наличии в уроке чек-листа, Вы скачиваете его, заполняете и прикрепляете его к ответу, после чего отправляете нам для проверки. После отправки домашнего задания, Вам будет автоматически предоставлен доступ к следующему уроку. Доступ к следующему модулю обучения открывается после проверки домашних заданий ко всем урокам прошлого модуля.<div class='mexImgBlock'><img style='width: 95%' src=${mexImg}></div>`,
          text: `<div style="font-family: Georgia, serif; font-size: 18px;">Привет! <br><br><p style="font-family: Georgia, serif; font-size: 18px;">Если Вы это читаете, то Вы приняли решение действовать и развиваться. Значит Вы на правильном пути и я Вам помогу! В этом курсе я делюсь своим опытом ведения  бизнеса. Помимо меня в этом курсе будет еще 4 эксперта в своих нишах. Каждый из них практик и мастер своего дела, и с удовольствием поделится с Вами своими знаниями и опытом. В этом курсе есть все инструменты для начала и вывода Вашего бизнеса на новый уровень! 
            Бизнес должен служить собственнику, а не наоборот. Постройте такой бизнес и живите в кайф! Удачи на обучении и не забывай выполнять домашние задания!
            </p>
            <ul>
            <li style="font-family: Georgia, serif; font-size: 18px;">За неделю до старта обучения Вам на почту приходит логин и пароль для доступа в личный кабинет на образовательную платформу.</li>
            <li style="font-family: Georgia, serif; font-size: 18px;">Вы просматриваете видеоуроки и на базе знаний, которые Вы получили, приступаете к выполнению домашнего задания.</li>
            <li style="font-family: Georgia, serif; font-size: 18px;">Домашнее задание выполняется в специальной форме, которая встроена в обучающую платформу либо, при наличии в уроке чек-листа, Вы скачиваете его, заполняете и прикрепляете его к ответу, после чего отправляете нам для проверки. </li>
            <li style="font-family: Georgia, serif; font-size: 18px;">После отправки домашнего задания, Вам будет автоматически предоставлен доступ к следующему уроку. </li>
            <li style="font-family: Georgia, serif; font-size: 18px;">Доступ к следующему модулю обучения открывается после проверки домашних заданий ко всем урокам прошлого модуля. </li>
            </ul><br><br>
            <div class='mexImgBlock'><img style='width: 95%' src=${mexImg}></div></div>`,
          files: [],
          videos: [],
          homeAssignment: [],
          homeTask: [{ text: '' }],
          userLessonFinish: [{ finished: true }]
        }
      ],
      userModelFinish: [{ finished: true }]
    }
  };

  fetchModules = async () => {
    try {
      const { results } = await getModules();
      // this.setState({ modules: results });
      this.setState({ modules: [...this.state.modules, ...results] });
    } catch (e) {
      notification.error({
        title: 'Ошибка сервера!'
      });
    }
  };

  componentDidMount() {
    this.fetchModules();
  }
  render() {
    const { modules, currentModule } = this.state;
    // const {location} = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={styles.nav}>
          {/* <MyButton
            myvariant="defaultlink"
            to="/admin/learning/about"
            // className={classes.button}
            // onClick={() =>
            //   <AboutAll />
            // }
              
            title="Механика обучения"
          /> */}
          {modules.map(modul => (
            <MyButton
              disabled={
                modul.userModelFinish[0]
                  ? !modul.userModelFinish[0].finished
                  : true
              }
              title={modul.id === 0 ? modul.title : `Модуль ${modul.number}`}
              location={this.props.location}
              endIcon={<Icons variants="success" />}
              myvariant="defaultlink"
              // to="/admin/learning/aboutAll"
              onClick={() =>
                this.setState(prev => {
                  const currentModul = modules.find(st => st.id === modul.id);

                  return {
                    ...prev,
                    currentModule: currentModul
                  };
                })
              }
            />
          ))}
        </div>
        <div className={styles.content}>
          {currentModule && (
            <AbsModule data={currentModule} modules={modules} />
          )}

          {/* <Switch>
            <Route exact path={`/admin/learning/about`}>
              <About />
            </Route>
            <Route path={`/admin/learning/:moduleid`}>
              <AbsModule />
            </Route>
          </Switch> */}
          {/* <Switch>
            <Route exact path={`/admin/learning/about`}>
              <About />
            </Route>
            <Route path={`/admin/learning/aboutAll`}>
              <AboutAll />
            </Route>
          </Switch> */}
        </div>
      </div>
    );
  }
}

export default withRouter(LearningModule);
