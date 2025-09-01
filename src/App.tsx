import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

import Dashboard from "./pages/dashboards";
import Products from "./pages/Product/AddProduct";
import Orders from "./pages/order";
import Customers from "./pages/customer";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Dashboard />} />
            <Route index path="/products" element={<Products />} />
            <Route index path="/orders" element={<Orders />} />
            <Route index path="/customers" element={<Customers />} />
            <Route index path="/inventory" element={<Products />} />
            <Route index path="/suppliers" element={<Customers />} />
            <Route index path="/reports" element={<Dashboard />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </Router>
    </>
  );
}
