import React, { useState, useEffect, useContext } from 'react'
import './Home.css'
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import logo from '../../logo.svg'

import { AppContext } from '../../AppContextProvider';



const Home = (props) => {
    /*
        BIG TODO:
        create Tab component
        create state variable containing all infos about tabs (show, labels, enabled)
        get all enabled tabs
        render enabled tabs
    */




    const context = useContext(AppContext);

    const [render, setRender] = useState(false);
    const [swipeViewsStyle, setSwipeViewsStyle] = useState({
        root: {
            padding: '0 30px',
            width: "100%",
        },
        tabs: {
            color: "rgba(255,255,255,0.7)",
            background: context.appTheme === "dark" ? "rgb(50, 50, 50)" : "rgba(222,222,222,0.8)"
        },
        slideContainer: {
            padding: '0 10px',
        },
        slide: {
            padding: 15,
            minHeight: 100,
            color: '#fff',
        }
    })

    useEffect(() => {

        let tabStyle = {
            color: "rgba(255,255,255,0.7)",
            background: "rgb(50, 50, 50)"
        }

        if (context.appTheme === "light") {
            tabStyle = {
                color: "grey",
                background: "rgba(222,222,222,0.8)"
            }
        }
        setSwipeViewsStyle({
            ...swipeViewsStyle,
            tabs: {
                ...tabStyle
            }
        })



    }, [context.appTheme]);

    const handleChange = (event, i) => {
        context.setTabIndex(i);
    };

    const handleChangeIndex = i => {
        context.setTabIndex(i);
    };

    useEffect(() => {

        setRender(true);
    }, [context.tabIndex]);

    useEffect(() => {

        if (render) {
            if (context.tabIndex > (countEnabledTabs())) {
                context.setTabIndex(0);
            }
        }
    }, [render]);



    const countEnabledTabs = () => {
        return context.appTabs.filter(t => t.enabled).length;
    }

    return (

        <div className="home">

            <img className="logo" alt="logo" src={logo} />

            <header>
                <h2> Flos Magic Calculator </h2>
            </header>

            {
                render ?
                    <>
                        <SwipeableViews index={context.tabIndex} onChangeIndex={handleChangeIndex}>
                            {
                                context.appTabs.filter(t => t.enabled).map(t => {
                                    return (
                                        <div key={t.key} style={Object.assign({}, swipeViewsStyle.slide)}>
                                            {t.comp}
                                        </div>
                                    )
                                })
                            }
                        </SwipeableViews>

                        <Tabs value={context.tabIndex} fullWidth onChange={handleChange} style={swipeViewsStyle.tabs}>
                            {
                                context.appTabs.filter(t => t.enabled).map(t => {
                                    return (
                                        <Tab key={t.key} label={t.tabLabel} />
                                    )
                                })
                            }
                        </Tabs>
                    </>
                    :
                    ""
            }


        </div>
    );
}

export default Home