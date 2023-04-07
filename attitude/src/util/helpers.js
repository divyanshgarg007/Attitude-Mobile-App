import store, { persistor } from "../redux/store";
//import { Tracker } from "./analytics";
import axios from 'axios'

export const testMode = !(window && window.matchMedia);

export const isMobile = (window && window.matchMedia) ? window.matchMedia('(max-width: 425px)').matches : true;


export function printAccountInfo() {

    const {
        auth: { role, is_callcenter_enabled, is_hierarchy_enabled, is_mpls }
    } = store.getState();

    console.log("[USER][ACCT] role:" + role + " is_callcenter_enabled:" + is_callcenter_enabled +
        "is_hierarchy_enabled:" + is_hierarchy_enabled + " is_mpls:" + is_mpls)

    return [{ key: 'Role', value: role }, { key: 'Is CC', value: is_callcenter_enabled === true ? 'true' : 'false' }
        , { key: 'Hiearchy', value: is_hierarchy_enabled === true ? 'true' : 'false' }
        , { key: 'Is MPLS Acct', value: is_mpls === true ? 'true' : 'false' }
    ]

}


export function getAuthToken() {
    const {
        auth: { authToken }
    } = store.getState();

    return authToken
}
export function isLoggedIn() {
    const {
        auth: { master }
    } = store.getState();

    return (master !== null && master !== undefined) ? true : false
}

export function getUser() {
    const {
        auth: { user }
    } = store.getState();

    return user
}
// Check user role is Admin
export function isAdmin() {
    const {
        auth: { role }
    } = store.getState();

    return role === "admin" ? true : false
}

// Check user role is Supervisor
export function isSuperVisor() {
    const {
        auth: { role }
    } = store.getState();

    return role === "supervisor" ? true : false
}

// Check user role is Agent
export function isAgent() {
    const {
        auth: { role }
    } = store.getState();

    return role === "agent" ? true : false
}

// Check is CallCenter enabled
export function isCallCenterEnabled() {
    const {
        auth: { is_callcenter_enabled }
    } = store.getState();

    return is_callcenter_enabled
}

export function getUserStatusTickerColor() {
    if (!isCallCenterEnabled()) return false;

    const {
        auth: { status_color }
    } = store.getState();

    return (status_color) ? status_color : false
}

export function is_disposition_enabled() {
    const {
        auth: { is_disposition_enabled }
    } = store.getState();

    return is_disposition_enabled
}

export function isSSO() {
    const {
        auth: { is_sso }
    } = store.getState();

    return is_sso
}


// Check is Hierarchy enabled
export function isHierarchyEnabled() {
    const {
        auth: { is_hierarchy_enabled }
    } = store.getState();

    return is_hierarchy_enabled
}

export function getPageFilters() {
    const {
        auth: { filters }
    } = store.getState();

    return filters
}

export function getSelectedSolutionOptions() {
    const {
        auth: { selectedSolutionOptions }
    } = store.getState();

    return selectedSolutionOptions
}

export function getSelectedPlanOptions() {
    const {
        auth: { selectedPlanOptions }
    } = store.getState();

    return selectedPlanOptions
}

export function getSelectedNumberOptions() {
    const {
        auth: { selectedNumberOptions }
    } = store.getState();

    return selectedNumberOptions
}

export function getSelectedPlans() {
    const {
        auth: { selectedPlans }
    } = store.getState();

    return selectedPlans
}

export function getSelectedNumbers() {
    const {
        auth: { selectedNumbers }
    } = store.getState();

    return selectedNumbers
}

export function getLogLevels() {
    const {
        dashboard: { log_levels }
    } = store.getState();

    return log_levels
}

export function getSearchFilters() {
    const {
        agentsActivityListingsSlice: { filters }
    } = store.getState();

    return filters
}

export function getQueryParams() {
    const {
        agentsActivityListingsSlice: { queryParams }
    } = store.getState();

    return queryParams
}

export function getBagCount() {
    const {
        article: { count }
    } = store.getState();

    return (count === 0 ? null : count)
    //return (user !== null && user !== undefined)
}

export function serverLogout() {
    let authToken = getAuthToken()
    let user = getUser()
    try {

        console.log("[LOGOUT][ALL]")


        let loggedIn = user != null && user != undefined
        if (loggedIn) {
            console.log("[LOGOUT][ALL] authToken:", authToken)
            console.log("[LOGOUT][ALL] loggedIn:", loggedIn ? 'Yes' : 'No')
            const headers = {
                Authorization: `Bearer ${authToken}`
            }
            axios.get(`${process.env.REACT_APP_API_ENDPOINT_BASE_URL}/vr/logout`, { headers: headers })
        }



        //console.log_v2("AUTH", "logout", "Logout success","site-logout-success" ,{'user':user})

    } catch (error) {
        //console.log("AUTH", "logout", "Logout Error","site-logout-error" ,{'user':user})  
        console.log("error", error)
    }
}