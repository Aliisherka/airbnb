import React, { Suspense, FC } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const withRouter = (Component: FC) => () => (
    <BrowserRouter>
        <Suspense fallback={<></>}>
            <Component />
        </Suspense>
    </BrowserRouter>
)
