import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from './Login'
import Admin from './admin'
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ContactsIcon from '@material-ui/icons/Contacts';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MoneyIcon from '@material-ui/icons/Money';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import Resturant from '../Resturant/addResturant'
import Hotel from '../Hotel/addHotel'
import View from './viewResturant'
import ViewHotel from './viewHotel'
import User from './viewUser'
import AllOrder from './Navigation/allOrderAccept'
import ShowAll from './Navigation/showAllOrder'
import Map from './Navigation/AMap'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Tabss() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="scrollable force tabs example"
                    style={{background: "white"}}
                    className="container"
                >
                    <Tab label="Accept Orders" icon={<FastfoodIcon/>} {...a11yProps(0)} />
                    <Tab label="DashBoard" icon={<SupervisorAccountIcon/>} {...a11yProps(1)} />
                    <Tab label="Users" icon={<ContactsIcon/>} {...a11yProps(2)} />
                    <Tab label="Add Store" icon={<AddBoxIcon/>} {...a11yProps(3)} />
                    <Tab label="Show Store" icon={<RestaurantIcon/>} {...a11yProps(4)} />
                    <Tab label="Check Sales" icon={<MoneyIcon/>} {...a11yProps(5)} />
                    <Tab label="Our Location" icon={<EditLocationIcon/>} {...a11yProps(6)} />
                    <Tab label="Add Hotel" icon={<AddBoxIcon/>} {...a11yProps(7)} />
                    <Tab label="View Hotel" icon={<AddBoxIcon/>} {...a11yProps(8)} />


                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <AllOrder></AllOrder>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Admin></Admin>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <User></User>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Resturant></Resturant>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <View></View>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <ShowAll></ShowAll>
            </TabPanel>
            <TabPanel value={value} index={6}>
                <Map></Map>
            </TabPanel>
            <TabPanel value={value} index={7}>
                <Hotel></Hotel>
            </TabPanel>
            <TabPanel value={value} index={8}>
                <ViewHotel></ViewHotel>
            </TabPanel>
        </div>
    );
}
