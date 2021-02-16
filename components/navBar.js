import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux'
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom'
const style = {
    root: {
        flexGrow: 1,
    },

    title: {
        flexGrow: 1,
    },
    navLinks: {
        textDecoration: "none",
        color: "#fff"
    },
    badge: {
        fill: "#fff"
    }
}

class Navbar extends React.Component {

    render() {
        let cartBadge = this.props.items.length;
        return (
            <div >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" style={style.menuButton} color="inherit" aria-label="menu">
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <Typography variant="h6" style={style.title}>
                            <Link to="/" style={style.navLinks}>E-Com</Link>
                        </Typography>
                        <Link to="/" style={style.navLinks}><Button color="inherit">Shop</Button></Link>
                        <Link to="/cart" style={style.navLinks}>
                            <IconButton aria-label="cart">
                                <Badge badgeContent={cartBadge} color="secondary">
                                    <ShoppingCartIcon style={style.badge} />
                                </Badge>
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        items: state.addedItems,
        //addedItems: state.addedItems
    }
}
export default connect(mapStateToProps)(Navbar)
