import {
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import { List } from "@mui/material";
import { Dashboard, Logout } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Layers,
  NotebookText,
  User,
} from "lucide-react";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { logoutUser } from "../../stores/slices/auth.slice";
import { toast } from "sonner";

const Sidebar = () => {
  const { user } = useAppSeletor((state) => state.auth);
  const dispatch = useAppDispatch();

  const adminMenu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <Dashboard /> },
    { name: "Courses Manage", path: "/admin/admincourse", icon: <BookOpen /> },
    { name: "Category Manage", path: "/admin/admincategory", icon: <Layers /> },
    { name: "Blog Manage", path: "/admin/adminblog", icon: <NotebookText /> },
    {
      name: "Instructor Request",
      path: "/admin/instructorrequest",
      icon: <GraduationCap />,
    },
    { name: "User Manage", path: "/admin/user", icon: <User /> },
  ];

  const instructorMenu = [
    { name: "Dashboard", path: "/instructor/dashboard", icon: <Dashboard /> },
    {
      name: "My Courses",
      path: "/instructor/instructorcourse",
      icon: <BookOpen />,
    },
    { name: "My Blog", path: "/instructor/instructorblog", icon: <Layers /> },
  ];

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      window.location.href = "/"
    } catch {
      toast.error("Failed to Logout");
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 360, paddingTop: "80px" }}>
        <h1 className="absolute top-7 font-bold text-2xl ml-7 text-pink-200 font-serif">
          {" "}
          <span className="text-4xl text-pink-50 bg-fuchsia-900 p-1 rounded-sm">
            E
          </span>{" "}
          dustack
        </h1>
        <nav aria-label="main mailbox folders">
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              borderTop: "1px solid lightgray",
            }}
          >
            <ListItem
              disablePadding
              sx={{ display: "flex", flexDirection: "column" }}
            >
              {user?.role === "admin" &&
                adminMenu.length > 0 &&
                adminMenu?.map((menu) => (
                  <ListItemButton
                    key={menu.name}
                    sx={{
                      width: "290px",
                      padding: "20px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: 6,
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "white" }}>
                      {menu.icon}
                    </ListItemIcon>
                    <NavLink to={menu.path}>
                      <ListItemText
                        primary={menu.name}
                        sx={{ fontWeight: "bold" }}
                      />
                    </NavLink>
                  </ListItemButton>
                ))}

              {user?.role === "instructor" &&
                instructorMenu?.length > 0 &&
                instructorMenu?.map((menu) => (
                  <ListItemButton
                    key={menu.name}
                    sx={{
                      width: "290px",
                      padding: "20px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: 6,
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "white" }}>
                      {menu.icon}
                    </ListItemIcon>
                    <NavLink to={menu.path}>
                      <ListItemText
                        primary={menu.name}
                        sx={{ fontWeight: "bold" }}
                      />
                    </NavLink>
                  </ListItemButton>
                ))}
            </ListItem>
          </List>
        </nav>
        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            gap: 1,
            position: "absolute",
            bottom: "40px",
            width: "290px",
            borderRadius: "50px",
          }}
        >
          <Logout /> <span style={{ fontSize: "15px" }}>Logout</span>
        </Button>
      </Box>
    </>
  );
};

export default Sidebar;
