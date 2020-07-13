import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Viskositaet from './components/viskositaet/Viskositaet';
import Drehmoment from './components/drehmoment/Drehmoment';
import Schnittgeschwindigkeit from './components/schnittgeschwindigkeit/Schnittgeschwindigkeit';
import Drehzahl from './components/drehzahl/Drehzahl';
import Settings from './components/settings/Settings';


// Set Up The Initial Context
export const AppContext = React.createContext()
// Create an exportable consumer that can be injected into components
export const AppContextConsumer = AppContext.Consumer

// Create the provider using a traditional React.Component class
class AppContextProvider extends React.Component {

    state = {
        appTabs: [
            {
                key: 0,
                tabLabel: <FontAwesomeIcon icon={faCog} />,
                enabled: true,
                toggle: false,
                comp: <Settings />
            },
            {
                key: 1,
                tabLabel: "V",
                fullLabel: "Viskosität",
                enabled: true,
                toggle: true,
                comp: <Viskositaet />
            },
            {
                key: 2,
                tabLabel: "DM",
                fullLabel: "Drehmoment",
                enabled: true,
                toggle: true,
                comp: <Drehmoment />
            },
            {
                key: 3,
                tabLabel: "S",
                fullLabel: "Schnittgeschwindkeit",
                enabled: true,
                toggle: true,
                comp: <Schnittgeschwindigkeit />
            },
            {
                key: 4,
                tabLabel: "DZ",
                fullLabel: "Drehzahl",
                enabled: true,
                toggle: true,
                comp: <Drehzahl />
            }

        ],
        tabIndex: this.loadLastIndex(),
        setTabIndex: (i) => {
            this.setTabIndex(i);
        },
        setAppTabs: appTabs => {
            this.setAppTabs(appTabs);
        },

        appTheme: this.loadTheme(),
        handleTabToggle: (tabLabel, enabled) => {
            this.handleTabToggle(tabLabel, enabled);
        },
        setAppTheme: theme => {
            this.setAppTheme(theme);
        }
    }

    componentDidMount() {

        if (localStorage.getItem("enabledTabs")) {
            const enabledTabs = JSON.parse(localStorage.getItem("enabledTabs"));
            const copyTabApps = this.state.appTabs;
            copyTabApps.map(t => {
                if (t.toggle) {
                    t.enabled = false;
                }
                enabledTabs.map(et => {
                    if (t.tabLabel === et) {
                        t.enabled = true;
                    }
                    return et;
                })
                return t;
            })
            this.setAppTabs(copyTabApps);
        }
    }

    setTabIndex(tabIndex) {
        this.setState({ tabIndex })
        localStorage.setItem("lastIndex", parseInt(tabIndex));
    }

    loadTheme() {
        return localStorage.getItem("appTheme") || "light";
    }

    loadLastIndex() {
        if (localStorage.getItem("lastIndex")) {
            return parseInt(localStorage.getItem("lastIndex"));
        }

        return 0;
    }

    setAppTabs(appTabs) {
        this.setState({
            appTabs
        })
    }

    setAppTheme(appTheme) {
        localStorage.setItem("appTheme", appTheme);
        this.setState({ appTheme });
    }

    handleTabToggle(tabLabel, enabled) {
        const togglableAppTabs = this.state.appTabs;
        let enabledTabs = [];
        togglableAppTabs.map(t => {
            if (t.tabLabel === tabLabel) {
                t.enabled = enabled;
            }
            if (t.enabled && t.toggle) {
                enabledTabs.push(t.tabLabel);
            }
        })
        console.log(enabledTabs);
        localStorage.setItem("enabledTabs", JSON.stringify(enabledTabs));
        this.setAppTabs(togglableAppTabs);
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
export default AppContextProvider