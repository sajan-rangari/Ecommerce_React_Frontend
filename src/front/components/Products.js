import React, { useEffect, useState } from "react";

const Products = ({ search, setCart, cart, setTotalItems }) => {
  // const items = productsStore.getAllProducts();
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  var flag = true;
  var cartData = [];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) throw Error("Did not receive expected data.");
        const listItems = await response.json();
        let data = listItems.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );
        setItems(data);
        setProducts(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, [search, cart]);

  const onFilter = (s) => {
    console.log("clicked");
    if (s == "All") {
      return setItems(products);
    }
    const itemsData = products.filter((product) => product.category == s);
    setItems(itemsData);
  };

  const addToCart = (item) => {
    console.log("cart is", cart);
    console.log(!cart.some((product) => product.id == item.id));
    if (!cart.some((product) => product.id == item.id)) {
      item.quantity = 1;
      item.total = item.price;
      flag = true;
    } else {
      cart.map((product) => {
        if (product.id == item.id) {
          product.quantity += 1;
          product.total += product.price;
          flag = false;
        }
      });
    }

    cartData = cart;
    if (flag) {
      cartData.push(item);
      setCart(cartData);
      setTotalItems(cartData.length);
    } else {
      setCart(cartData);
      setTotalItems(cartData.length);
    }
    console.log(cart);
  };

  return (
    <div className="row">
      <div className="card-top container-fluid">
        <div className="container d-flex">
          <div className="item">
            <img
              style={{ cursor: "pointer" }}
              onClick={() => onFilter("All")}
              src="https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100"
              alt=""
            />
            <h6>All products</h6>
          </div>
          <div className="item">
            <img
              style={{ cursor: "pointer" }}
              onClick={() => onFilter("electronics")}
              src="https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100"
              alt=""
            />
            <h6>Electronics</h6>
          </div>
          <div className="item">
            <img
              style={{ cursor: "pointer" }}
              onClick={() => onFilter("women's clothing")}
              src="https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100"
              alt=""
            />
            <h6>Women Clothing</h6>
          </div>
          <div className="item">
            <img
              style={{ cursor: "pointer" }}
              onClick={() => onFilter("men's clothing")}
              src="https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100"
              alt=""
            />
            <h6>Men Clothing</h6>
          </div>
          <div className="item">
            <img
              style={{ cursor: "pointer", marginTop: "10px" }}
              onClick={() => onFilter("jewelery")}
              width="120px"
              height="117px"
              src="https://rukminim1.flixcart.com/image/580/696/kkh6zrk0/jewellery-set/o/w/z/gt-ns-862-matushri-art-original-imafzt9teacakjyn.jpeg?q=50"
              alt=""
            />
            <h6>Jewllery</h6>
          </div>
        </div>
      </div>

      <div className="items">
        {items.map((item) => (
          <div className="item" key={item.id}>
            <div>
              <div className="card">
                <img src={item.image} alt="" />
                <h5
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100ch",
                  }}
                >
                  {item.title}
                </h5>
                <p
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100ch",
                  }}
                >
                  {item.description}
                </p>
                <p>
                  <strong>Price:</strong> {item.price}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(item)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
