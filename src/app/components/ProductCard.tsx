"use client";
import { Dispatch, SetStateAction, FC, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { ProductsType, CartType } from "../types";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface Props {
  productItem: ProductsType;
  addToCart: Dispatch<SetStateAction<CartType[]>>;
  cartItems: CartType[];
  setProducts: Dispatch<SetStateAction<ProductsType[]>>;
}

const ProductCard: FC<Props> = ({
  productItem,
  addToCart,
  cartItems,
  setProducts,
}): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [cartQuantity, setCartQuantity] = useState<number>(0);

  useEffect(() => {
    const productInCart = cartItems.find((item) => productItem.id === item.id);
    if (productInCart) {
      setCartQuantity(productInCart.quantity);
    } else {
      setCartQuantity(0);
    }
  }, [cartItems]);

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  const handleClick = (): void => {
    addToCart((prev) => {
      const productInCart = prev.find((item) => productItem.id === item.id);
      if (productInCart) {
        return prev.map((item) => {
          if (item.id === productItem.id) {
            item.quantity++;
            return item;
          }
          return item;
        });
      }
      return [
        ...prev,
        {
          id: productItem.id,
          title: productItem.title,
          price: productItem.price,
          image: productItem.image,
          quantity: 1,
          maximumMsg: "",
        },
      ];
    });

    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === productItem.id) {
          item.rating.count--;
          return item;
        }
        return item;
      })
    );
  };

  const handleAddClick = (): void => {
    const item = cartItems.find((item) => productItem.id === item.id);
    if (productItem.rating.count == 0) {
      addToCart((prev) =>
        prev.map((prevItem) => {
          if (prevItem.id === item?.id) {
            prevItem.maximumMsg = "maximum in stock";
            return prevItem;
          }
          return prevItem;
        })
      );

      return;
    }
    addToCart((prev) =>
      prev.map((prevItem) =>
        prevItem.id === item?.id
          ? { ...prevItem, quantity: prevItem.quantity + 1 }
          : prevItem
      )
    );

    setProducts((prev) =>
      prev.map((prevItem) => {
        if (prevItem.id === item?.id) {
          prevItem.rating.count--;
          return prevItem;
        }
        return prevItem;
      })
    );
  };
  const handleRemoveClick = (): void => {
    const item = cartItems.find((item) => productItem.id === item.id);
    if (item?.quantity == 1) {
      addToCart((prev) => prev.filter((prevItem) => prevItem.id !== item?.id));
      setCartQuantity(0);
    } else {
      addToCart((prev) =>
        prev.map((prevItem) =>
          item?.id === prevItem.id
            ? { ...prevItem, quantity: prevItem.quantity - 1, maximumMsg: "" }
            : prevItem
        )
      );
    }
    setProducts((prev) =>
      prev.map((prevItem) => {
        if (prevItem.id === item?.id) {
          prevItem.rating.count++;
          return prevItem;
        }
        return prevItem;
      })
    );
  };
  return (
    <Card sx={{ width: 400, minHeight: 500 }}>
      <CardHeader
        sx={{ height: 150, alignItems: "flex-start" }}
        title={<Typography variant="h6">{productItem.title}</Typography>}
        subheader={
          <Typography variant="subtitle1" color={"grey"}>
            {productItem.category}
          </Typography>
        }
        disableTypography
      />

      <CardMedia
        component="img"
        height={200}
        image={productItem.image}
        alt={productItem.title}
        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="body1" color="error">
          {productItem.rating.count} left in stock
        </Typography>
        <Typography variant="h6" mt={1.5}>
          ${productItem.price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {cartQuantity == 0 ? (
          <IconButton aria-label="add to favorites" onClick={handleClick}>
            <AddShoppingCartIcon color="primary" />
          </IconButton>
        ) : (
          <ButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
          >
            <Button onClick={handleAddClick}>+</Button>
            <Button sx={{ pointerEvents: "none" }}>{cartQuantity}</Button>
            <Button onClick={handleRemoveClick}>-</Button>
          </ButtonGroup>
        )}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{productItem.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProductCard;
