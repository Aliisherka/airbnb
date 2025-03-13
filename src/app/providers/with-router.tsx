import React, { Suspense, FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../shared/hooks/useAuth';

export const withRouter = (Component: FC) => () => (
    <BrowserRouter basename="/airbnb">
        <AuthProvider>
            <Suspense fallback={<></>}>
                <Component />
            </Suspense>
        </AuthProvider>
    </BrowserRouter>
)
