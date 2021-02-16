import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { addShipping } from './actions/cartActions'
class Recipe extends Component {



    handleChecked = (e) => {
        if (e.target.checked) {
            this.props.addShipping();
        }
        else {
            this.props.substractShipping();
        }
    }

    render() {
        console.log("ststtta", this.props.tax)
        return (
            <div className="container">
                <div className="collection">
                    <h4 className="collection-item"><b>Tax: {this.props.tax}% </b></h4>
                    <h4 className="collection-item"><b>Discount: {this.props.discount}% </b></h4>
                    <h3 className="collection-item"><b>Total: {this.props.total} </b></h3>
                </div>
                <div className="checkout">
                    <button className="check-btn">Checkout</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        total: state.total,
        tax: state.tax,
        discount: state.discount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addShipping: () => { dispatch({ type: 'ADD_SHIPPING' }) },
        substractShipping: () => { dispatch({ type: 'SUB_SHIPPING' }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)