import React from "react"
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Home from '../../pages/home';
import { Header } from "../../shared/ui/header";

export const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}