"use client";
import * as React from "react";
import Bar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import AdbIcon from "@mui/icons-material/Adb";
import Cart from "./Cart";
import Badge from "@mui/material/Badge";
import { useGlobalContext } from "../Context/store";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const AppBar: React.FC = (): JSX.Element => {
  const { cart } = useGlobalContext();
  const router: AppRouterInstance = useRouter();
  const totalItems: number = useMemo(() => {
    let sum: number = 0;
    cart.map((item) => {
      sum = sum + item.quantity;
    });

    return sum;
  }, [cart]);

  return (
    <Bar component="nav" sx={{ paddingY: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              onClick={() => {
                router.push("/");
              }}
              sx={{ p: 0 }}
            >
              <Avatar alt="Ahmed Ammar" src="/images/placeholder.jpg" />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Badge badgeContent={totalItems} color="secondary">
              <Cart />
            </Badge>
          </Box>
        </Toolbar>
      </Container>
    </Bar>
  );
};
export default AppBar;
