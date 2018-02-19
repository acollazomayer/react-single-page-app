import { connect } from 'react-redux';

import App from '../components/App';

function mapStateToProps({ search }) {
  return {
    hasFetched: search.hasFetched,
    isFetching: search.isFetching,
    weatherState: search.weatherState,
    city: search.city,
    error: search.error,
  };
}

export default connect(mapStateToProps, {})(App);
