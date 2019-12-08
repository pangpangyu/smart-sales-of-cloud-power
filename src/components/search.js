import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="search-wrap">
                <i className="iconfont iconsousuo"></i>
                <form action="#" onSubmit={this.props.onSubmit} >
                    <input onInput={this.props.onInput}  type="search" placeholder={this.props.title} />
                </form>
            </div>
        )
    }
}

export default Search;