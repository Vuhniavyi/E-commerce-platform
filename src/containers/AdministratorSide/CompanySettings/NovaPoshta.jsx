import React from 'react';
import { connect } from 'react-redux';

import NovaPoshtaApiKey from './NovaPoshtaApiKey';
import NovaPoshtaAddressList from './NovaPoshtaAddressList';
import NovaPoshtaSendersList from './NovaPoshtaSendersList';

const NovaPoshta = ({ apiKey, CounterpartyRef }) => {
  return (
    <>
      <h2>Ключ NovaPoshta API:</h2>
      <NovaPoshtaApiKey />
      {apiKey && (
        <>
          <NovaPoshtaAddressList
            apiKey={apiKey}
            CounterpartyRef={CounterpartyRef}
          />
          <NovaPoshtaSendersList
            apiKey={apiKey}
            CounterpartyRef={CounterpartyRef}
          />
        </>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    apiKey: state.user.novaPoshtaApiKey,
    CounterpartyRef: state.user.senderRef
  };
}

export default connect(mapStateToProps)(NovaPoshta);
