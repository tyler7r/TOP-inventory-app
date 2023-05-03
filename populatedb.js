// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Product = require("./models/product");
const Section = require("./models/section");
const Category = require("./models/category");
const ProductInstance = require('./models/productinstance');

const sections = [];
const categories = [];
const products = [];
const productinstances = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createSections();
    await createCategories();
    await createProducts();
    await createProductInstances();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function sectionCreate(name) {
    const section = new Section({ name: name });
    await section.save();
    sections.push(section);
    console.log(`Added section: ${name}`);
}

async function categoryCreate(name) {
    categorydetail = { name: name };

    const category = new Category(categorydetail);

    await category.save();
    categories.push(category);
    console.log(`Added category: ${name}`);
}

async function productCreate(name, description, price, quantity, category, section) {
productdetail = {
    name: name,
    description: description,
    price: price,
    quantity: quantity,
};
if (category != false) productdetail.category = category;
if (section != false) productdetail.section = section;

const product = new Product(productdetail);
await product.save();
products.push(product);
console.log(`Added product: ${name}`);
}

async function productinstanceCreate(product, size) {
    let productinstancedetail = {
        product: product, 
        size: size,
    }

    const productinstance = new ProductInstance(productinstancedetail);
    await productinstance.save();
    productinstances.push(productinstance);
    console.log(`Added productinstance: ${product, size}`)
}

async function createSections() {
    console.log("Adding genres");
    await Promise.all([
        sectionCreate("Mens"),
        sectionCreate("Womens"),
        sectionCreate("Boys"),
        sectionCreate("Girls"),
    ]);
}

async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
        categoryCreate("Pants"),
        categoryCreate("Shirts"),
        categoryCreate("Shoes"),
        categoryCreate("Accessories"),
        categoryCreate("Dresses"),
        categoryCreate("Skirts"),
        categoryCreate("Suits"),
    ]);
}

async function createProducts() {
    // name, description, price, quantity, category, section
    console.log("Adding Products");
    await Promise.all([
        productCreate(
        "Nike Blazers",
        "Simple, white shoe with black Nike logo that look great with any outfit",
        120,
        2,
        categories[2],
        [sections[0], sections[2]]
        ),
        productCreate(
        "High Waisted Leopard-Print Leggings",
        "Extremely comfortable leggings, that add a little extra oomph to your outfit",
        45,
        2,
        categories[0],
        [sections[1]]
        ),
        productCreate(
        "Blue Light Glasses",
        "Stylish glasses that can be worn in or out, helps save your eyes from too much blue light exposure.",
        65,
        2,
        categories[3],
        [sections[0], sections[1], sections[2], sections[3]]
        ),
        productCreate(
        "Classic Black Dress",
        "This classic style of dress never goes out of style.",
        30,
        1,
        categories[4],
        [sections[1], sections[3]]
        ),
        productCreate(
        "Tan Polo",
        "This polo is great for events that you can't wear a T-shirt too",
        35,
        2,
        categories[1],
        [sections[0], sections[2]]
        ),
        productCreate(
        "Test Product 5",
        "Description of test product 5",
        130,
        2,
        categories[6],
        [sections[1], sections[3]]
        ),
        productCreate(
        "Test Product 2",
        "Description of test product 2",
        10,
        2,
        categories[4],
        [sections[0]]
        ),
    ]);
}

async function createProductInstances() {
    console.log("Adding product instances");
    await Promise.all([
        productinstanceCreate(products[0], "10.5"),
        productinstanceCreate(products[1], "M"),
        productinstanceCreate(products[2], "S"),
        productinstanceCreate(products[3], "M"),
        productinstanceCreate(products[4], "M"),
        productinstanceCreate(products[5], "XL"),
        productinstanceCreate(products[6], "S"),
        productinstanceCreate(products[0], "8.5"),
        productinstanceCreate(products[1], "L"),
        productinstanceCreate(products[2], "L"),
        productinstanceCreate(products[4], "XL"),
        productinstanceCreate(products[5], "S"),
        productinstanceCreate(products[6], "L")
    ])
}