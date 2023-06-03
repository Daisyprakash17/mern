const ObjectId = require("mongodb").ObjectId

const reviews = [
    {
    comment: "The products in this category are designed to meet a variety of needs, offering a wide range of features and options to choose from.",
    rating: 5,
    user: { _id: ObjectId(), name: "Daisy khoja" },
  },
  {
    comment: "Customers can expect high-quality performance, innovative technology, and user-friendly interfaces across the products in this category.",
    rating: 5,
    user: { _id: ObjectId(), name: "Daisy khoja" },
  },
  {
    comment: "From sleek designs to cutting-edge advancements, the products in this category reflect the latest trends and advancements in their respective fields.",
    rating: 5,
    user: { _id: ObjectId(), name: "Daisy khoja" },
  },
  {
    comment: "With a focus on customer satisfaction, the products in this category aim to provide seamless experiences, whether it's in terms of connectivity, functionality, or overall usability.",
    rating: 4,
    user: { _id: ObjectId(), name: "Daisy khoja" },
  },
  {
    comment: "With a diverse selection available, customers can find products that suit their preferences, budgets, and requirements, ensuring they have access to reliable and top-notch options.",
    rating: 3,
    user: { _id: ObjectId(), name: "Daisy khoja" },
  },
]

module.exports = reviews
