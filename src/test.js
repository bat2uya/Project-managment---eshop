// Our product database.

 

const sampleProducts1 = [
  {
    productId: 1,
    productName: "Black Mesh Baseball Hat",
    categoryName: "Hat",
    price: 35,
    description:
      "This sleek baseball hat features a curved bill, adjustable fit and mesh detail for lasting comfort and style.",
    popular: false,
    imageList: [
      "https://images.express.com/is/image/expressfashion/0034_00188259_0058_f001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
    ],
    manufacturer: "UPDATED HENOK ",
    currentQuantity: 0,
    productDetails: [ ],
    vendorId: "VE1597012145741",
    categoryId: "5f2f54ca1f9c6a0628335c10/XLGWLB76T5ZJPG42GLQ8",
    status: "ACTIVE"
  },
  {
    productId: 2,
    productName: "Marled Perforated Nylon Baseball Hat",
    category: "Hat",
    price: 29.99,
    description:
      "Ready for anything, this hat features a curved bill, adjustable fit and perforated nylon detail for lasting comfort and style.",

    popular: false,
    imageList: [
      "https://images.express.com/is/image/expressfashion/0034_00182026_0904_f002?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
    ],
    manufacturer: "UPDATED HENOK ",
    currentQuantity: 0,
    productDetails: [ ],
    vendorId: "VE1597012145741",
    categoryId: "5f2f54ca1f9c6a0628335c10/XLGWLB76T5ZJPG42GLQ8",
    status: "ACTIVE"
  }
  
];

// List of item categories.
const categories1 = [
  {
    name: "All categories" 
  },
  {
    name: "Hat" 
  },
  {
    name: "Phone" 
  },
  {
    name: "Books" 
  },
  {
    name: "Computers"
  }
];

// Data for rendering menu.
 



export { sampleProducts1, categories1 };
