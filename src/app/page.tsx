import LoginPage from "@/auth/pages/LoginPage";
import { posix } from "path";
import CafeteriaPage from "./cafeteria/page";
import OrderPage from "./cafeteria/order/page";

const Home = () => {
  return <OrderPage />;
};

export default Home;
