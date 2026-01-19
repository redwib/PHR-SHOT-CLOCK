import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, Monitor, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Shell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-current" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight">CUE<span className="text-primary">MASTER</span></span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {user ? (
                <>
                  <Link href="/">
                    <span className={`text-sm font-medium cursor-pointer transition-colors ${location === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                      Dashboard
                    </span>
                  </Link>
                  <div className="h-4 w-px bg-border" />
                  <div className="flex items-center gap-3 pl-2">
                    <img 
                      src={user.profileImageUrl || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full border border-border"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</span>
                      <span className="text-xs text-muted-foreground">Pro Member</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => logout()} className="text-muted-foreground hover:text-destructive">
                    <LogOut className="w-5 h-5" />
                  </Button>
                </>
              ) : (
                <a href="/api/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  Log In
                </a>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card p-4 space-y-4">
            {user ? (
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <img 
                    src={user.profileImageUrl || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full border border-border"
                  />
                  <div>
                    <div className="font-medium">{user.firstName} {user.lastName}</div>
                    <div className="text-xs text-muted-foreground">Logged in</div>
                  </div>
                </div>
                <Link href="/">
                  <div className="block py-2 text-foreground font-medium" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</div>
                </Link>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start mt-4" 
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" /> Log Out
                </Button>
              </>
            ) : (
              <Button asChild className="w-full">
                <a href="/api/login">Log In</a>
              </Button>
            )}
          </div>
        )}
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
