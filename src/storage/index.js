export const demoData = [
  {
    id: 1,
    title: "Toyota Prius",
    category: "Nəqliyyat",
    brand: "Toyota",
    model: "Prius",
    price: 12000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "BMW X5",
    category: "Nəqliyyat",
    brand: "BMW",
    model: "X5",
    price: 25000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "3 otaqlı mənzil",
    category: "Əmlak",
    brand: "Yasamal",
    model: "Yeni tikili",
    price: 95000,
    image: "https://via.placeholder.com/150",
  }
];

export const saveToLocalStorage = () => {
  localStorage.setItem("products", JSON.stringify(demoData));
};