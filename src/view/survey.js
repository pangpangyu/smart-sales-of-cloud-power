import React, { Fragment } from 'react';
import Header from '../components/header';


/**
 * 售电概况
 */

class Survey extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  render() {
    return (
      <Fragment>
        <Header title={'售电概况'} back={true} search={false} />
      </Fragment>
    )
  }

}

export default Survey;






