
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-5 ">
      <div className="col-span-5 mb-16">
        <NavBar />
      </div>
      <div className="col-span-1 hidden md:block lg:block">
        <Sidebar/>
      </div>
      <div className="col-span-5 md:col-span-5 lg:col-span-4 bg-gray-200">{children}</div>

    </div>
    
  );
}