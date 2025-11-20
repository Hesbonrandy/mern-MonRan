// server/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import MenuItem from './models/MenuItem.js';
import ItemType from './models/ItemType.js';

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Create item types
    const typeNames = ['Hot Drinks', 'Cold Brews', 'Pastries', 'Light Bites'];
    const savedTypes = {};
    
    for (const name of typeNames) {
      let type = await ItemType.findOne({ name });
      if (!type) {
        type = new ItemType({ name });
        await type.save();
      }
      savedTypes[name] = type._id;
    }

    // Full MonRan menu items
    const menuItems = [
      // ========== BARISTA'S PICK ==========
      {
        name: 'Oat Milk Honey Latte',
        description: 'Smooth espresso meets our house-made honey syrup — infused with fresh Kinoo lemons and aromatic Kenyan ginger — all blended with our creamy, barista-grade house oat milk. Monica’s go-to since we opened our doors.',
        price: 750,
        itemType: savedTypes['Hot Drinks'],
        isFeatured: true,
        image: '/images/oat-milk-honey.jpg'
      },

      // ========== HOT DRINKS ==========
      {
        name: 'Flat White',
        description: 'Double ristretto shots poured over velvety microfoam milk — a Kinoo favorite for purists who appreciate balance and boldness in every sip.',
        price: 650,
        itemType: savedTypes['Hot Drinks'],
        isFeatured: false,
        image: '/images/flat-white.jpg'
      },
      {
        name: 'Single-Origin Hot Chocolate',
        description: '70% dark chocolate crafted from Kakuzi cocoa beans, melted with house oat milk and a whisper of sea salt. Served with a cloud of coconut whipped cream — dairy-free decadence at its finest.',
        price: 600,
        itemType: savedTypes['Hot Drinks'],
        isFeatured: false,
        image: '/images/hot-chocolate.jpg'
      },
      {
        name: 'Spiced Date Latte',
        description: 'Espresso sweetened with our slow-simmered date syrup (infused with cardamom and orange zest) and steamed oat milk. Naturally sweet, warmly spiced, and perfect for Nairobi evenings.',
        price: 700,
        itemType: savedTypes['Hot Drinks'],
        isFeatured: false,
        image: '/images/spiced-date-latte.jpg'
      },

      // ========== COLD BREWS ==========
      {
        name: 'Vanilla Cold Brew',
        description: 'Our 18-hour house cold brew concentrate blended with real Madagascar vanilla beans and a hint of Kenyan cinnamon. Smooth, never bitter, with a finish that lingers like a good conversation.',
        price: 600,
        itemType: savedTypes['Cold Brews'],
        isFeatured: false,
        image: '/images/vanilla-coldbrew.jpg'
      },
      {
        name: 'Honey Cold Brew',
        description: 'House cold brew sweetened with our signature lemon-ginger honey syrup and served over ice. Refreshing, bright, and just the right amount of sweet.',
        price: 650,
        itemType: savedTypes['Cold Brews'],
        isFeatured: false,
        image: '/images/honey-coldbrew.jpg'
      },
      {
        name: 'Nitro Cold Brew',
        description: 'Our house cold brew infused with nitrogen for a cascading pour and creamy texture — no milk needed. Pure coffee, elevated.',
        price: 700,
        itemType: savedTypes['Cold Brews'],
        isFeatured: false,
        image: '/images/nitro-cold.jpg'
      },

      // ========== PASTRIES ==========
      {
        name: 'Almond Croissant',
        description: 'Flaky, buttery layers filled with house almond cream and toasted local macadamia nuts. Baked fresh at 5AM daily — best enjoyed with a flat white while the Kinoo sun rises.',
        price: 450,
        itemType: savedTypes['Pastries'],
        isFeatured: false,
        image: '/images/almond-croissant.jpg'
      },
      {
        name: 'Banana Bread with Macadamia',
        description: 'Overripe bananas from our neighbors’ trees blended with crushed macadamia nuts from Central Kenya. Moist, nutty, and served warm with house honey butter.',
        price: 400,
        itemType: savedTypes['Pastries'],
        isFeatured: false,
        image: '/images/banana-bread.jpg'
      },
      {
        name: 'Kenyan Cinnamon Swirl',
        description: 'Our take on the classic cinnamon roll — made with fragrant Kenyan cinnamon, brown sugar, and a sticky caramel glaze. Best paired with a spiced date latte.',
        price: 420,
        itemType: savedTypes['Pastries'],
        isFeatured: false,
        image: '/images/cinnamon-swirl.jpg'
      },

      // ========== LIGHT BITES ==========
      {
        name: 'Avocado Toast',
        description: 'Sourdough bread topped with our house avocado spread (mashed Hass avocados, lemon, garlic, and fresh coriander from our window herb garden). Finished with chili flakes and a poached egg from Mama Njeri’s farm.',
        price: 550,
        itemType: savedTypes['Light Bites'],
        isFeatured: false,
        image: '/images/avocado-toast.jpg'
      },
      {
        name: 'Grilled Cheese',
        description: 'Artisanal cheddar and Gouda melted between slices of sourdough, grilled to golden perfection. Served with a small house tomato-basil soup (seasonal).',
        price: 500,
        itemType: savedTypes['Light Bites'],
        isFeatured: false,
        image: '/images/grilled-cheese.jpg'
      },
      {
        name: 'Breakfast Wrap',
        description: 'Scrambled eggs, sautéed spinach, roasted tomatoes, and feta wrapped in a whole-wheat tortilla. Perfect for freelancers heading to their second-office shift.',
        price: 600,
        itemType: savedTypes['Light Bites'],
        isFeatured: false,
        image: '/images/breakfast-wrap.jpg'
      }
    ];

    // Save menu items (skip duplicates)
    // ... (keep everything above this line the same)

// Save/update menu items
let updatedCount = 0;
for (const item of menuItems) {
  const existing = await MenuItem.findOne({ name: item.name });
  
  if (existing) {
    // Update existing item
    existing.description = item.description;
    existing.price = item.price;
    existing.isFeatured = item.isFeatured;
    existing.image = item.image;
    existing.itemType = item.itemType;
    await existing.save();
    updatedCount++;
  } else {
    // Create new item
    const newItem = new MenuItem(item);
    await newItem.save();
    updatedCount++;
  }
}

console.log(`✅ Successfully updated ${updatedCount} menu items!`);
console.log('✅ MonRan Coffee House menu is ready for customers!');
process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedData();