import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  deleteTokenInLocalStorage,
  getUserData,
  isLoggedIn,
} from "@/helpers/TokenHelpers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Bitcoin, BookmarkIcon, ChevronUp, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const AppSidebar = () => {
  const navigate = useNavigate();
  const explore = [
    {
      title: "Cryptocurrencies",
      url: "/",
      icon: Bitcoin,
    },
    /*{
      title: "Exchanges",
      url: "/exchanges",
      icon: Repeat,
    },*/
    {
      title: "Bookmarks",
      url: "/user/bookmarks",
      icon: BookmarkIcon,
    },
  ];

  function handleLogOut() {
    deleteTokenInLocalStorage();
    navigate("/auth/login");
  }

  return (
    <Sidebar>
      <SidebarHeader>Cryptometer</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Explore</SidebarGroupLabel>
            <SidebarMenu>
              {explore.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <User2 />{" "}
              {isLoggedIn() === true ? getUserData().name : "Username"}
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            {isLoggedIn() === false ? (
              <>
                <DropdownMenuItem>
                  <Link to={"/auth/login"}>Log in</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={"/auth/register"}>Register</Link>
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={handleLogOut}>
                Log out
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
