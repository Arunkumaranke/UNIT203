import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import "./Home.css";
import { Button, TextField } from "@mui/material";
const Home = () => {
  //Styling variables
  //   const BLUE = "#172162"; //"rgb(23, 33, 98)";
  //   const LIGHT_GREY = "#6e7484";
  //   const BLACK = "#000000";

  //First part given
  //   const lineItems =;
  const [lineItems, setLineItems] = React.useState([]);
  const [subtotal, setSubTotal] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [tax, setTax] = React.useState(0);
  const [postcode, setPostcode] = React.useState(" ");

  useEffect(() => {
    fetch("/api/getList")
      .then((res) => res.json())
      .then((resp) => setLineItems(resp));
  }, []);
  //   const SUBTOTAL = 2094.97;
  //   const HST = 272.3461;
  //   const TOTAL = 2382.3161;
  //   const ESTIMATED_DELIVERY = "Nov 24, 2021";
  const addLineItem = () => {
    setLineItems([
      {
        id: 2,

        title: "Blue Sofa",
        price: 994.99,
        quantity: 1,
        image: `https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F3_Seater_SofaSofa_Ottoman_Off_Arm_Configuration_Two_Arms_Arm_Design_Slope_Chaise_Off_Fabric_Navy_Blue2.png%3Fv%3D1629231450&w=1920&q=75`,
        swatchColor: "#191944",
        swatchTitle: "Blue",
      },
      ...lineItems,
    ]);
  };
  const calculateFees = () => {
    if (lineItems.length > 0) {
      let temp = [];

      lineItems?.map((value) => {
        return temp.push(value.price);
      });
      let subTot = temp?.reduce(function (a, b) {
        return a + b;
      });
      setSubTotal(subTot);
      setTax(Math.round(subTot) * 0.13);
      setTotal(Math.round(subTot + Math.round(subTot) * 0.13 + 15));
    }
  };
  useEffect(() => {
    calculateFees();
  }, [lineItems]);
  const handlePostCode = (e) => {
    setPostcode(e.target.value);
  };
  const handleDelete = (id) => {
    const updatedItems = lineItems.filter((remove) => {
      return remove.id !== id;
    });
    setLineItems(updatedItems);
  };
  const handlePostcodeSubmit = () => {
    let dates = [];
    fetch(`/api/postDate?date=${postcode.charAt(0)}`)
      .then((res) => res.json())
      .then((resp) => {
        const estimatedDates = lineItems.map((id) => {
          return resp.map((item) => {
            if (item.ids.includes(id.id)) {
              return {
                ...(id["estimatedDate"] = item.estimatedDeliveryDate),
                ...id,
              };
            }
          });
        });
        const flatArray = estimatedDates.flat();
        const result = flatArray.filter((ele) => {
          return ele !== undefined;
        });
        setLineItems(result);
      });
  };
  return (
    <div className="App">
      <div className="containerBox">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <h1 className="Heading">Your Cart</h1>
          <Button variant="contained" onClick={addLineItem}>
            Add item
          </Button>
        </Grid>
        {lineItems?.map((item, key) => {
          return (
            <>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                key={key}
              >
                <div>
                  <img src={item.image} alt="" height={100} />
                </div>
                <div>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <div className="Heading">{item.title}</div>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <div
                        style={{
                          backgroundColor: `${item.swatchColor}`,
                          height: "15px",
                          width: "15px",
                          borderRadius: "15px",
                        }}
                      ></div>
                      <div style={{ paddingLeft: "15px" }}>
                        {item.swatchTitle}
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <div className="smallFont underline">{item.price}</div>
                    <div className="smallFont">
                      {item.estimatedDate ? item.estimatedDate : "NA"}
                    </div>

                    <Button
                      variant="text"
                      onClick={() => handleDelete(item.id)}
                      className="removeBtn smallFont underline"
                    >
                      Remove
                    </Button>
                  </Grid>
                </div>
              </Grid>
            </>
          );
        })}
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="Checkout"
        >
          <div>
            <div>Subtotal</div>
            <div>Taxes (estimated)</div>
            <div>Shipping</div>
            <div>Total</div>
          </div>
          <div>
            <div>${Math.round(subtotal)}</div>
            <div>${tax}</div>
            <div>$15</div>
            <div>${total}</div>
          </div>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          className="Checkout"
        >
          <TextField
            size="small"
            type="text"
            id="outlined-basic"
            label="Postal code"
            variant="outlined"
            inputProps={{
              autoComplete: "chrome-off",
            }}
            onChange={handlePostCode}
            value={postcode}
          />
          <Button variant="outlined" onClick={handlePostcodeSubmit}>
            Submit
          </Button>
        </Grid>
      </div>
    </div>
  );
};
export default Home;
