import {IntlProvider} from 'react-intl';
import {connect} from 'react-redux';

// Key-prop must be set so that the translations change when locale is changed,
// https://github.com/yahoo/react-intl/issues/1106 would fix this.
const mapStateToProps = (rootState) => ({...rootState.intl, key: rootState.intl.locale});

export default connect(mapStateToProps)(IntlProvider);
