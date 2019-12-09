import React, { Fragment } from 'react';
import Header from '../components/header';
/*
考勤管理
*/
class AttendanceList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Fragment>
				<Header title={'考勤管理'} back={true}>
                    <div className="head-add"><i className="iconfont iconadd"></i></div>
                </Header>
                <div>

                </div>
            </Fragment>
        )
    }
}

export default AttendanceList;