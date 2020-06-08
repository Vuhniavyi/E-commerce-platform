import React from 'react';
import { connect } from 'react-redux';
import gen2 from '../../img/gen2.jpeg';
import gen1 from '../../img/gen1.jpeg';

const MainPage = ({role}) => (
  <div
    style={{
      fontSize: 40,
      textAlign: 'center',
      margintTop: 50
      // background: url(img/gen2.jpeg)
    }}
  >
    { role === 'PARTNER' ? <img src={gen2} alt="gen2" /> : <img src={gen1} alt="gen2" />}
  </div>
);


const mapStateToProps = state => ({role: state.user.role});

export default connect(
    mapStateToProps,
)(MainPage);