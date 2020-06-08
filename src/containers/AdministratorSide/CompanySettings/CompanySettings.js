import React, { Component, Fragment } from 'react';
import styles from './CompanySettings.module.css';
import GeneralInformation from './GeneralInformation';
import Documents from './Documents';
import AboutCompany from './AboutCompany';
import NovaPoshta from './NovaPoshta';
import { TabPanel, a11yProps } from '../components/Tabs/Tabs';
import { Tab, Tabs, Paper } from '@material-ui/core';

class CompanySettings extends Component {
  state = {
    activeTabKey: 0
  };
  changeTab = (evt, key) => this.setState({ activeTabKey: key });

  render() {
    const { activeTabKey } = this.state;
    return (
      <Fragment>
        <Tabs
          value={activeTabKey}
          onChange={this.changeTab}
          indicatorColor="primary"
          textColor="primary"
          // variant="fullWidth"
          // aria-label="full width tabs example"
        >
          <Tab label="Основные данные" {...a11yProps(0)} />
          <Tab label="Документы" {...a11yProps(1)} />
          {/* <Tab label="Страница компании" {...a11yProps(2)} /> */}
          <Tab label="Новая Почта" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={activeTabKey} index={0}>
          <Paper className={styles.paper}>
            <GeneralInformation />
          </Paper>
        </TabPanel>
        <TabPanel value={activeTabKey} index={1}>
          <Paper className={styles.paper}>
            <Documents />
          </Paper>
        </TabPanel>
        {/* <TabPanel value={activeTabKey} index={2}>
          <Paper className={styles.paper}>
            <AboutCompany />
          </Paper>
        </TabPanel> */}
        <TabPanel value={activeTabKey} index={2}>
          <Paper className={styles.paper}>
            <NovaPoshta />
          </Paper>
        </TabPanel>
      </Fragment>
    );
  }
}

export default CompanySettings;
