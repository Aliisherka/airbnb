import React, { Suspense, FC } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const withRouter = (Component: FC) => () => (
    <BrowserRouter basename="/airbnb">
        <Suspense fallback={<></>}>
            <Component />
        </Suspense>
    </BrowserRouter>
)
