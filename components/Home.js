import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './Actions/cartActions'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { Grid, Button } from '@material-ui/core/';

const filterBrand = [{ "name": "All", "value": "All" },
{ "name": "Xiaomi", "value": "Xiaomi" },
{ "name": "OnePlus ", "value": "OnePlus" },
{ "name": "Apple ", "value": "Apple" },
{ "name": "Samsung ", "value": "Samsung" },]

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allItems: this.props.items,
            limitItems: 4,
            filterItems: []
        }
    }
    handleFilter = (e) => {

        let filterItems = []
        if (e.target.value === "All" || e.target.value === "") {
            filterItems = this.props.items;
        } else {
            filterItems = this.props.items.filter(
                items => items.brand === e.target.value || items.title === e.target.value

            );
        }

        this.setState({

            filterItems,
            [e.target.name]: e.target.value,

        });
    }

    handleClick = (id) => {

        this.props.addToCart(id);
    }
    componentDidMount() {
        this.setState({
            filterItems: this.props.items
        });
    }

    render() {
        // console.log("hhj", this.props.items[0].img)
        let itemList = this.state.filterItems.map(item => {
            return (

                <Grid item xs={6} sm={3}>
                    <div className="card">
                        <img src={item.img} alt="" style={{ width: "100%" }} />
                        <h3>{item.title}</h3>
                        <p className="price">Rs. {item.price}</p>
                        <p>{item.desc}</p>
                        <p>
                            <Button
                                startIcon={<AddShoppingCartIcon />}
                                onClick={() => { this.handleClick(item.id) }}
                            >
                                Add to cart
                  </Button>

                        </p>

                    </div>
                </Grid>


            )
        })

        return (
            <div className="container">

                <div align="right">
                    <select
                        className="filters"
                        name="filterBrand"
                        placeholder="Select Brand"
                        onChange={this.handleFilter}
                    >
                        {filterBrand.map(index => {
                            return <option value={index.value} key={index.value}>{index.name}</option>
                        })}
                    </select>

                    <input className="filters" onChange={this.handleFilter} placeholder="Search by name" type="text" name="title" />
                </div>
                <Grid container>

                    {itemList}

                </Grid>

                {/* <DataGrid pagination {...this.props.items} /> */}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => { dispatch(addToCart(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)