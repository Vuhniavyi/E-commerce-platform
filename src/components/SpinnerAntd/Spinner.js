import React from 'react';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const Spinner = () => <Spin indicator={antIcon} />;

export default Spinner;
