import React from "react";
import "./Home.css";
import Banner from "./assets/71U-Q+N7PXL._SX3000_.jpg";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img src={Banner} alt="banner" className="home__image" />
      </div>

      <div className="home__row">
        <Product
          id="22151"
          title='Apple 2020 MacBook Air Laptop M1 Chip, 13" Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID.'
          price={899}
          image="https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UL640_QL65_.jpg"
          rating={5}
        />
        <Product
          id="22152"
          title="Beats Solo3 Wireless On-Ear Headphones - Apple W1 Headphone Chip, Class 1 Bluetooth, 40 Hours of Listening Time, Built-in Microphone"
          price={133.49}
          rating={4}
          image="https://m.media-amazon.com/images/I/51QxA-98Q+L._AC_UL640_QL65_.jpg"
        />
      </div>

      <div className="home__row">
        <Product
          id="22153"
          title="Dove Men+Care Hair + Skin Care Regimen Personal Care for Men Clean Comfort + Fresh & Clean Body Wash, 2-in-1"
          price={23.74}
          rating={5}
          image="https://m.media-amazon.com/images/I/71hTh2nFqMS._AC_UL800_FMwebp_QL65_.jpg"
        />
        <Product
          id="22154"
          title="Xbox Series S"
          price={286}
          rating={4}
          image="https://m.media-amazon.com/images/I/61tgzb04gQL._AC_UY436_FMwebp_QL65_.jpg"
        />
        <Product
          id="22155"
          title="Razer DeathAdder Essential Gaming Mouse: 6400 DPI Optical Sensor - 5 Programmable Buttons - Mechanical Switches - Rubber Side Grips - Classic Black"
          price={24.9}
          rating={5}
          image="https://m.media-amazon.com/images/I/8189uwDnMkL._AC_UY436_FMwebp_QL65_.jpg"
        />
      </div>

      <div className="home__row">
        <Product
          id="22156"
          title="ASUS G614JV-AS73 ROG Strix G16 (2023) Gaming Laptop, 16â€ 16:10 FHD 165Hz, GeForce RTX 4060, Intel Core i7-13650HX, 16GB DDR5, 512GB PCIe SSD"
          price={1352.97}
          rating={5}
          image="https://m.media-amazon.com/images/I/71jTFnk7XiL._AC_UL800_FMwebp_QL65_.jpg"
        />
      </div>
    </div>
  );
}

export default Home;
