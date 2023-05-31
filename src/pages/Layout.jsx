import PropTypes from "prop-types";
import Navbar from "../components/Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="px-8 py-6 bg-gray-100">{children}</main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
