import React from 'react'
import { withProviders } from './providers'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './store'
import { Router } from './router'
// import './locales/index'

const App = () => {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}

const AppWithProviders = withProviders(App)

export default AppWithProviders
