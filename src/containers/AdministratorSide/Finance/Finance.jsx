import React from 'react';
import { connect } from 'react-redux';
import ContractorLayout from './ContractorLayout';
import PartnerLayout from './PartnerLayout';

const Finance = props => {
  const { user } = props;

  return (
    <div className="page">
      <h3 className="page-title">Финансы и баланс</h3>
      {user.role === 'PARTNER' ? (
        <PartnerLayout {...props} />
      ) : (
          <ContractorLayout {...props} />
        )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Finance);
