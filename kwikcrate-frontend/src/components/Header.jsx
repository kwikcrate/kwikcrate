import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSearch, FaHistory, FaBars } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [acctOpen, setAcctOpen] = useState(false);
  const [recentOpen, setRecentOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("userToken"));

  useEffect(() => {
    try {
      const rv = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      setRecentlyViewed(rv);
    } catch {
      setRecentlyViewed([]);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/user-login");
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4 px-4 mx-auto">
        <Link to="/" className="text-2xl font-bold text-green-400">Kwikcrate</Link>

        <nav className="hidden md:flex space-x-6">
          <Link to="/">Home</Link>
          <Link to="/games">Games</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-3 pr-8 py-1 rounded bg-gray-800 text-white"
            />
            <button type="submit" className="absolute right-2 top-1.5 text-gray-400">
              <FaSearch />
            </button>
          </form>

          <div className="relative hidden md:block">
            <button onClick={() => setRecentOpen(!recentOpen)} className="p-1 hover:text-green-400">
              <FaHistory />
            </button>
            {recentOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg text-sm">
                {recentlyViewed.length ? (
                  recentlyViewed.map((item, i) => (
                    <li key={i} className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate(item.link)}>
                      {item.name}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No recent items</li>
                )}
              </ul>
            )}
          </div>

          <Link to="/cart" className="text-xl hover:text-green-400 hidden md:block">
            <FaShoppingCart />
          </Link>

          {isLoggedIn ? (
            <div className="relative hidden md:block">
              <button onClick={() => setAcctOpen(!acctOpen)} className="flex items-center gap-2 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">
                <FaUserCircle /> Account
              </button>
              {acctOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg text-sm">
                  <li><Link to="/purchases" className="block p-2 hover:bg-gray-700">Purchases</Link></li>
                  <li><Link to="/transactions" className="block p-2 hover:bg-gray-700">Transaction History</Link></li>
                  <li><Link to="/crate-coins" className="block p-2 hover:bg-gray-700">My CrateCoins</Link></li>
                  <li>
                    <button onClick={handleLogout} className="w-full text-left p-2 hover:bg-gray-700 text-red-400">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link to="/user-login" className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 hidden md:inline-block">Login</Link>
              <Link to="/register" className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700 hidden md:inline-block">Register</Link>
            </>
          )}

          <button className="md:hidden ml-2" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="bg-gray-800 md:hidden px-4 pb-4">
          <nav className="flex flex-col space-y-2">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/games" onClick={() => setMenuOpen(false)}>Games</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          </nav>

          <form onSubmit={handleSearch} className="relative mt-4">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-3 pr-8 py-1 w-full rounded bg-gray-900 text-white"
            />
            <button type="submit" className="absolute right-2 top-1.5 text-gray-400">
              <FaSearch />
            </button>
          </form>

          <div className="mt-4">
            <button onClick={() => setRecentOpen(!recentOpen)} className="flex items-center gap-2 hover:text-green-400">
              <FaHistory /> Recently Viewed
            </button>
            {recentOpen && (
              <ul className="mt-2 bg-gray-700 rounded shadow-lg text-sm">
                {recentlyViewed.length ? (
                  recentlyViewed.map((item, i) => (
                    <li key={i} className="p-2 hover:bg-gray-600 cursor-pointer" onClick={() => navigate(item.link)}>
                      {item.name}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-400">No recent items</li>
                )}
              </ul>
            )}
          </div>

          <Link to="/cart" className="mt-4 flex items-center gap-2 hover:text-green-400">
            <FaShoppingCart /> Cart
          </Link>

          {isLoggedIn ? (
            <div className="mt-4">
              <button onClick={() => setAcctOpen(!acctOpen)} className="flex items-center gap-2 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">
                <FaUserCircle /> Account
              </button>
              {acctOpen && (
                <ul className="mt-2 bg-gray-700 rounded shadow-lg text-sm">
                  <li><Link to="/purchases" className="block p-2 hover:bg-gray-600">Purchases</Link></li>
                  <li><Link to="/transactions" className="block p-2 hover:bg-gray-600">Transaction History</Link></li>
                  <li><Link to="/crate-coins" className="block p-2 hover:bg-gray-600">My CrateCoins</Link></li>
                  <li>
                    <button onClick={handleLogout} className="w-full text-left p-2 hover:bg-gray-600 text-red-400">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="mt-4 flex flex-col space-y-2">
              <Link to="/user-login" className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">Login</Link>
              <Link to="/register" className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700">Register</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
