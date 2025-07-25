import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Menu, X, User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  const getDashboardPath = () => {
    if (!user) return "/";
    switch (user.role) {
      case 'admin': return '/admin/dashboard';
      case 'moderator': return '/moderator/dashboard';
      default: return '/user/dashboard';
    }
  };

  const navItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          }`
        }
        onClick={() => setIsOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/scholarships"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          }`
        }
        onClick={() => setIsOpen(false)}
      >
        All Scholarships
      </NavLink>
      {user && (
        <NavLink
          to={getDashboardPath()}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-sm py-2 border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <span className="font-bold text-xl">SG</span>
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:block">Scholar Gateway</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">{navItems}</div>

          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photo} alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/user/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="outline" asChild><Link to="/auth">Login</Link></Button>
                <Button asChild className="bg-blue-600 hover:bg-blue-700"><Link to="/auth">Sign Up</Link></Button>
              </div>
            )}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">{navItems}</div>
          {!user && (
            <div className="px-2 pb-3 space-y-2">
              <Button variant="outline" asChild className="w-full justify-center"><Link to="/auth" onClick={() => setIsOpen(false)}>Login</Link></Button>
              <Button asChild className="w-full justify-center bg-blue-600 hover:bg-blue-700"><Link to="/auth" onClick={() => setIsOpen(false)}>Sign Up</Link></Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;