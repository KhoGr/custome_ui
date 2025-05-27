import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Menu from "@/pages/Menu";
import Reservation from "@/pages/Reservation";
import Checkout from "@/pages/Checkout";
import Coupons from "@/pages/Coupons";
import FoodDetail from "@/pages/FoodDetail";
import Orders from "@/pages/Orders";
import VipProgram from "@/pages/VipProgram";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/reservation" element={<Reservation />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/coupons" element={<Coupons />} />
    <Route path="/food/:id" element={<FoodDetail />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/vip" element={<VipProgram />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
