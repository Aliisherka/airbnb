import React from 'react'
import { withProviders } from './providers'
import { Provider } from 'react-redux'
import { store } from './store'
import { Router } from './router'
import { AuthProvider } from '../shared/hooks/useAuth';
import './locales/index'

const App = () => {
    return (
        <Provider store={store}>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </Provider>
    )
}

const AppWithProviders = withProviders(App)

export default AppWithProviders
