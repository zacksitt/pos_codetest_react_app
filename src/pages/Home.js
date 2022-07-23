import { Outlet, Link } from "react-router-dom";
import Invoices from '../components/Invoices'

import Navigation from '../components/Navigation'
const Home = () => {
  return (
    <>
      <div>
        <Navigation/>
        <Invoices/>
      </div>

      <Outlet />
    </>
  )
};

export default Home;