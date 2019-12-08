import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onSubmit=(e)=>{
        e.preventDefault();
        this.props.onSubmit(e);
    }



    render() {
        return (
            <div className="search-wrap">
                <i className="iconfont iconsousuo"></i>
                <form action="#" onSubmit={this.onSubmit} >
                    <input onInput={this.props.onInput}  type="search" placeholder={this.props.title} />
                </form>
            </div>
        )
    }
}

export default Search;