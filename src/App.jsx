import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Product from "./pages/Product"
import Homepage from "./pages/Homepage"
import Pricing from "./pages/Pricing"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import "./index.css"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import CountriesList from "./components/CountriesList"
import City from "./components/City"
import Form from "./components/Form"

const BASE_URL = "http://localhost:8000"

function App() {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch {
        alert("Some error happens during fetching data..")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountriesList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
