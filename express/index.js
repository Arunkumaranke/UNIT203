const express = require("express");
const path = require("path");
const app = express();

app.get("/api/getList", (req, res) => {
  var list = [
    {
      id: 1,
      title: "Grey Sofa",
      price: 499.99,
      quantity: 1,
      image: `https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_DARK_GREY_OFF_OFF_SLOPE_17f0f115-11f8-4a78-b412-e9a2fea4748d.png%3Fv%3D1629310667&w=1920&q=75`,
      swatchColor: "#959392",
      swatchTitle: "Grey",
    },
    {
      id: 2,

      title: "Blue Sofa",
      price: 994.99,
      quantity: 1,
      image: `https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F3_Seater_SofaSofa_Ottoman_Off_Arm_Configuration_Two_Arms_Arm_Design_Slope_Chaise_Off_Fabric_Navy_Blue2.png%3Fv%3D1629231450&w=1920&q=75`,
      swatchColor: "#191944",
      swatchTitle: "Blue",
    },
    {
      id: 3,
      title: "White Sofa",
      price: 599.99,
      quantity: 1,

      image: `https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_IVORY_OFF_OFF_SLOPE_5379af1f-9318-4e37-b514-962d33d1ce64.png%3Fv%3D1629231450&w=1920&q=75`,
      swatchColor: "#F8F1EC",
      swatchTitle: "White",
    },
  ];
  res.json(list);
  console.log("Sent list of items");
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
