import React, { Component } from 'react'

var items = [];
class Items extends Component {
    constructor(props){
        super(props);
        console.log(props)
        items = props.items.split(',')
        // for(var i = 0; i < props.items.length; i++)
        // {
        //     items[i] = props.items[i]
        // }
    }
    render() {
        // console.log(items)
        return (
            <div>
                <ul>
                    {items.map(i => {
                        console.log(i)
                        return(
                            <p>{i}</p>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
export default Items;