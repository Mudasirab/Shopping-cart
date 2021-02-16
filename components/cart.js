import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { removeItem, addQuantity, subtractQuantity } from './Actions/cartActions'
import Recipe from './recipe'
import { Grid } from '@material-ui/core';
class Cart extends Component {

    //to remove the item completely
    handleRemove = (id) => {
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    }
    render() {
        console.log('ids', this.props.items)
        let addedItems = this.props.items.length ?
            (
                this.props.items.map(item => {
                    return (

                        <Grid item md={8}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar style={{ width: 60, height: 60, marginRight: 10 }}>
                                    <Avatar alt="Remy Sharp" src={item.img} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.title}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body1"
                                                color="textPrimary"
                                            >
                                                Rs.  {item.price}
                                            </Typography>
                                            <br />     {item.desc}<br />
                                            <p>
                                                <b>Quantity: {item.quantity}</b>
                                            </p>
                                            <div className="add-remove">
                                                <Link to="/cart"><i className="material-icons" onClick={() => { this.handleAddQuantity(item.id) }}>arrow_drop_up</i></Link>
                                                <Link to="/cart"><i className="material-icons" onClick={() => { this.handleSubtractQuantity(item.id) }}>arrow_drop_down</i></Link>
                                            </div>
                                            <button className="waves-effect waves-light btn pink remove" onClick={() => { this.handleRemove(item.id) }}>Remove</button>

                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </Grid>




                    )
                })
            ) :

            (
                <Grid item md={8}>
                    <h2>Cart is empty</h2>
                </Grid>
            )
        return (
            <div className="container">

                <h5>Items in cart</h5>


                <Grid container style={{ padding: "25px" }}>
                    {addedItems}
                    <Grid item md={4}>
                        <Recipe />
                    </Grid>
                </Grid>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        items: state.addedItems,
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => { dispatch(removeItem(id)) },
        addQuantity: (id) => { dispatch(addQuantity(id)) },
        subtractQuantity: (id) => { dispatch(subtractQuantity(id)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)