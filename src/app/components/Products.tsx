"use client";
import React, { FC, useEffect } from "react";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ProductsType } from "../types";
import { useGlobalContext } from "../Context/store";
import CircularProgress from "@mui/material/CircularProgress";
import Toolbar from "@mui/material/Toolbar";

interface Props {
  productItems: ProductsType[];
}

const Products: FC<Props> = ({ productItems }): JSX.Element => {
  const { products, setProducts, cart, setCart } = useGlobalContext();

  useEffect(() => {
    setProducts(productItems);
  }, []);

  if (products.length !== 0) {
    return (
      <Box paddingY={5}>
        <Toolbar sx={{ marginTop: 1 }} />
        <Grid container spacing={5}>
          {products.map((product: ProductsType) => (
            <Grid item xl={3} lg={4} md={6} sm={12} xs={12} key={product.id}>
              <Box display={"flex"} justifyContent={"center"}>
                <ProductCard
                  productItem={product}
                  addToCart={setCart}
                  cartItems={cart}
                  setProducts={setProducts}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
};

export default Products;
