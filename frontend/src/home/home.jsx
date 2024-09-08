import React, { useEffect, useState } from "react";
import Card from "../components/card.jsx";
import Carousel from "../components/crousel.jsx";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = () => {
    fetch("https://hungerhub-backend-f5g8.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.foodData, data.foodCategory);
        setFoodItem(data.foodData);
        setFoodCat(data.foodCategory);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredFoodItems = foodItem.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Carousel
        images={[
          "https://c4.wallpaperflare.com/wallpaper/557/8/980/food-pasta-basil-olives-wallpaper-preview.jpg",
          "https://c4.wallpaperflare.com/wallpaper/630/659/594/food-pasta-meal-still-life-tomato-hd-wallpaper-preview.jpg",
          "https://media.istockphoto.com/id/1252605699/photo/veg-momos-on-black-slate-table-top-momos-is-the-popular-dish-of-indian-tibetan-chinese.jpg?s=612x612&w=0&k=20&c=-K4xCgsFxgv0OnSf9Omp8w06eoTE4_6b30pO12b6d9o=",
          "https://t4.ftcdn.net/jpg/02/80/76/25/360_F_280762521_j1sQEgHTmtfoUcAEgoPt1gdBu6yinZQN.jpg",
          "https://c4.wallpaperflare.com/wallpaper/197/854/431/fire-burger-5k-steak-wallpaper-preview.jpg",
        ]}
        setSearchTerm={setSearchTerm}
      />

      <div className="flex flex-col items-center my-10 gap-y-10">
        {foodCat.length !== 0 ? (
          foodCat.map((category) => {
            const categoryItems = filteredFoodItems.filter(
              (item) => item.CategoryName === category.CategoryName
            );

            return categoryItems.length > 0 ? (
              <div key={category._id} className="w-full text-center">
                <h2 className="text-4xl font-bold text-teal-500 mb-6">
                  {category.CategoryName}
                </h2>
                <div className="flex justify-around border-teal-500 border-b-4 gap-x-10 mx-7 gap-y-5 flex-wrap">
                  {categoryItems.map((item) => (
                    <div key={item._id} className="mb-4">
                      <Card foodItem={item} options={item.options[0]} />
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
