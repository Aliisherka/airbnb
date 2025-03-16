import React from "react"
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/home';
import HousePage from "../../pages/houses";
import { Header } from "../../shared/ui/header";

export const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/house/:id" element={<HousePage />} />
      </Routes>
    </>
  )
}