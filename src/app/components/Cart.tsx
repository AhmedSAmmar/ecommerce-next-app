"use client";
import { FC, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartItems from "./CartItems";
import { useGlobalContext } from "../Context/store";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const Cart: FC = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const { cart, setCart, setProducts } = useGlobalContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmptyCart = () => {
    cart.map((item) => {
      setProducts((prev) =>
        prev.map((prevItem) => {
          if (prevItem.id === item.id) {
            prevItem.rating.count = prevItem.rating.count + item.quantity;
            return prevItem;
          }
          return prevItem;
        })
      );
    });

    setCart([]);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <ShoppingCartIcon fontSize="large" sx={{ color: "white" }} />
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Shopping Cart
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <CartItems />
        </DialogContent>
        <DialogActions>
          <Box paddingY={1} display={"flex"} justifyContent="space-between">
            <Button
              onClick={handleEmptyCart}
              autoFocus
              disabled={cart.length == 0 && true}
            >
              Empty Cart
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              autoFocus
              disabled={cart.length == 0 && true}
            >
              Checkout Now
            </Button>
          </Box>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default Cart;
