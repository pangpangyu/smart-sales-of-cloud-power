import React from 'react';

class Search extends React.Component{
    constructor(props){
        super(props)   
    }

    render(){
        return(
           <div className="search-wrap">
               <i className="iconfont iconsousuo"></i>
               <input placeholder={this.props.title}/>
           </div> 
        )
    }
}

export default Search;