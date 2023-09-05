import Header from "./Header";
import {Outlet} from "react-router-dom";

// provides layout structure for every page
export default function Layout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}