require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const items = [
  { name:"AirPods Pro Max",     sku:"APP-001", category:"Electronics",    price:549.99,  stock:85,  status:"Active"       },
  { name:"Nike Air Max 270",    sku:"NAM-270", category:"Clothing",       price:149.99,  stock:210, status:"Active"       },
  { name:"KitchenAid Mixer",    sku:"KSM-150", category:"Home & Kitchen", price:379.00,  stock:0,   status:"Out of Stock" },
  { name:"Sony WH-1000XM5",     sku:"SWH-XM5", category:"Electronics",   price:399.99,  stock:56,  status:"Active"       },
  { name:"Yoga Mat Premium",    sku:"YMP-006", category:"Sports",         price:89.99,   stock:144, status:"Active"       },
  { name:"Atomic Habits",       sku:"BK-AH01", category:"Books",          price:19.99,   stock:320, status:"Active"       },
  { name:"LEGO Technic Set",    sku:"LGO-421", category:"Toys",           price:229.99,  stock:35,  status:"Active"       },
  { name:"Retinol Serum 30ml",  sku:"BS-R30",  category:"Beauty",         price:64.99,   stock:0,   status:"Out of Stock" },
  { name:"DJI Mini 3 Pro",      sku:"DJI-M3P", category:"Electronics",   price:759.00,  stock:12,  status:"In Review"    },
  { name:"Patagonia Fleece",    sku:"PTG-FLJ", category:"Clothing",       price:189.99,  stock:67,  status:"Active"       },
  { name:"Instant Pot Duo",     sku:"IPD-701", category:"Home & Kitchen", price:99.95,   stock:130, status:"Active"       },
  { name:"Garmin Forerunner",   sku:"GFR-955", category:"Sports",         price:499.99,  stock:28,  status:"Active"       },
  { name:"Canon EOS R6 II",     sku:"CNR-R6",  category:"Electronics",   price:2499.00, stock:8,   status:"In Review"    },
  { name:"YETI Rambler 30oz",   sku:"YTI-R30", category:"Sports",         price:44.99,   stock:0,   status:"Out of Stock" },
  { name:"The Lean Startup",    sku:"BK-LS01", category:"Books",          price:17.99,   stock:280, status:"Draft"        },
  { name:"Apple Watch Ultra 2", sku:"AWU-002", category:"Electronics",   price:799.00,  stock:41,  status:"Active"       },
  { name:"Barbie Dreamhouse",   sku:"BBR-DH2", category:"Toys",           price:199.99,  stock:22,  status:"Draft"        },
  { name:"Dyson V15 Detect",    sku:"DSV-15D", category:"Home & Kitchen", price:749.99,  stock:19,  status:"Active"       },
  { name:"Charlotte Tilbury",   sku:"CTB-P01", category:"Beauty",         price:75.00,   stock:95,  status:"Active"       },
  { name:"Bosch Car Battery",   sku:"BSH-B80", category:"Automotive",     price:134.99,  stock:60,  status:"Active"       },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected ✅');

    await Product.deleteMany(); // clears existing products
    console.log('Old products cleared 🗑️');

    await Product.insertMany(items);
    console.log('All 20 products added to MongoDB ✅');

    mongoose.connection.close();
  } catch (err) {
    console.log('Error:', err);
  }
};

seedDB();