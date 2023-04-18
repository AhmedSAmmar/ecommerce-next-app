"use client";
import React, { FC, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../Context/store";
import { CartType } from "../types";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import ButtonGroup from "@mui/material/ButtonGroup";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const CartItems: FC = (): JSX.Element => {
  const { cart, setCart, setProducts, products } = useGlobalContext();

  const displayWidth = window.innerWidth;

  const priceTotal: number | string = useMemo(() => {
    let sum: number = 0;

    cart.map((item) => {
      sum = sum + item.price * item.quantity;
    });

    return Number(sum).toFixed(2);
  }, [cart]);

  const handleDeleteClick = (item: CartType) => {
    setCart((prev) => prev.filter((prevItem) => prevItem.id !== item.id));

    setProducts((prev) =>
      prev.map((prevItem) => {
        if (prevItem.id === item.id) {
          prevItem.rating.count = prevItem.rating.count + item.quantity;
          return prevItem;
        }
        return prevItem;
      })
    );
  };

  const handleAddClick = (item: CartType) => {
    const product = products.find((product) => product.id === item.id);
    if (product?.rating.count == 0) {
      setCart((prev) =>
        prev.map((prevItem) => {
          if (prevItem.id === item.id) {
            prevItem.maximumMsg = "maximum in stock";
            return prevItem;
          }
          return prevItem;
        })
      );

      return;
    }
    setCart((prev) =>
      prev.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, quantity: prevItem.quantity + 1 }
          : prevItem
      )
    );

    setProducts((prev) =>
      prev.map((prevItem) => {
        if (prevItem.id === item.id) {
          prevItem.rating.count--;
          return prevItem;
        }
        return prevItem;
      })
    );
  };

  const handleRemoveClick = (item: CartType) => {
    if (item.quantity == 1) {
      setCart((prev) => prev.filter((prevItem) => prevItem.id !== item.id));
    } else {
      setCart((prev) =>
        prev.map((prevItem) =>
          item.id === prevItem.id
            ? { ...prevItem, quantity: prevItem.quantity - 1, maximumMsg: "" }
            : prevItem
        )
      );
    }
    setProducts((prev) =>
      prev.map((prevItem) => {
        if (prevItem.id === item.id) {
          prevItem.rating.count++;
          return prevItem;
        }
        return prevItem;
      })
    );
  };

  if (cart.length !== 0) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              {`Total: $${priceTotal}`}
            </Typography>
            <Demo>
              <List>
                {cart.map((item: CartType) => (
                  <ListItem
                    sx={{ flexWrap: displayWidth < 550 ? "wrap" : "nowrap" }}
                    key={item.id}
                    secondaryAction={<Box></Box>}
                  >
                    <ListItemAvatar>
                      <Avatar alt={item.title} src={item.image} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ marginRight: 10 }}
                      primary={item.title}
                      secondary={
                        <Box>
                          <Typography variant="subtitle1">
                            ${item.price}
                          </Typography>
                          {item.maximumMsg && (
                            <Typography variant="subtitle1" color={"error"}>
                              {item.maximumMsg}
                            </Typography>
                          )}
                        </Box>
                      }
                    ></ListItemText>

                    <ButtonGroup
                      variant="outlined"
                      // orientation="vertical"
                      aria-label="outlined primary button group"
                    >
                      <Button onClick={() => handleAddClick(item)}>+</Button>
                      <Button sx={{ pointerEvents: "none" }}>
                        {item.quantity}
                      </Button>
                      <Button onClick={() => handleRemoveClick(item)}>-</Button>
                    </ButtonGroup>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteClick(item)}
                      sx={{ marginLeft: "auto" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Demo>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"}>
        <ShoppingCartTwoToneIcon sx={{ fontSize: 100 }} />
      </Box>
      <Typography variant="h4">Your cart is empty</Typography>
    </Box>
  );
};

export default CartItems;
