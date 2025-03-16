import React, { Suspense, FC } from 'react'
import { HashRouter } from 'react-router-dom'
import { AuthProvider } from '../../shared/hooks/useAuth';

export const withRouter = (Component: FC) => () => (
    <HashRouter>
        <AuthProvider>
            <Suspense fallback={<></>}>
                <Component />
            </Suspense>
        </AuthProvider>
    </HashRouter>
)
