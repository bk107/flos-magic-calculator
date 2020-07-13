import React, { useState, useEffect, useContext } from 'react'
import './Settings.css'
import Toggle from 'react-toggle'
import '../toggle.css'
import { AppContext } from '../../AppContextProvider'

const Settings = (props) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [render, setRender] = useState(false);


    const context = useContext(AppContext);

    const handleThemeChange = (e) => {
        const appTheme = e.target.checked ? 'dark' : 'light';
        context.setAppTheme(appTheme);
    }

    useEffect(() => {
        setIsDarkTheme(context.appTheme === "dark");
    }, []);

    useEffect(() => {
        setRender(true);
    }, [isDarkTheme]);

    const handleTabToggle = (e) => {
        context.handleTabToggle(e.target.name, e.target.checked);
    }

    return (

        <div className="settings" >
            <h2> Einstellungen git </h2>
            {
                render ?
                    <>
                        <div className="settings-group">


                            <h3> Allgemein </h3>
                            <div className="toggle-group" >
                                <Toggle
                                    id='dark-theme-enabled'
                                    defaultChecked={isDarkTheme}
                                    onChange={handleThemeChange} />
                                <label htmlFor='dark-theme-enabled'> Dark Theme </label>
                            </div>
                        </div>
                        <div className="settings-group">
                            <h3> Tabs </h3>
                            {
                                context.appTabs.filter(t => (t.toggle)).map(t => {
                                    const id = 'tab-' + t.key;

                                    return (
                                        <div className="toggle-group" key={t.key}>
                                            <Toggle
                                                id={id}
                                                name={t.tabLabel}
                                                defaultChecked={t.enabled}
                                                onChange={handleTabToggle} />
                                            <label htmlFor={id}> {t.fullLabel} </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                    : ""

            }


        </div >
    );
}

export default Settings