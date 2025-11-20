import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';
import ItemType from '../models/ItemType.js';
import fs from 'fs';
import path from 'path';

// Helper: Get current menu data (for soft reset)
const getCurrentMenuData = () => {
  return [
    // ========== BARISTA'S PICK ==========
    {
      name: 'Oat Milk Honey Latte',
      description: 'Smooth espresso meets our house-made honey syrup — infused with fresh Kinoo lemons and aromatic Kenyan ginger — all blended with our creamy, barista-grade house oat milk. Monica’s go-to since we opened our doors.',
      price: 750,
      isFeatured: true,
      image: '/images/drinks/oat-milk-honey-latte.jpg',
      itemType: 'Hot Drinks'
    },

    // ========== HOT DRINKS ==========
    {
      name: 'Flat White',
      description: 'Double ristretto shots poured over velvety microfoam milk — a Kinoo favorite for purists who appreciate balance and boldness in every sip.',
      price: 650,
      isFeatured: false,
      image: '/images/drinks/flat-white.jpg',
      itemType: 'Hot Drinks'
    },
    {
      name: 'Single-Origin Hot Chocolate',
      description: '70% dark chocolate crafted from Kakuzi cocoa beans, melted with house oat milk and a whisper of sea salt. Served with a cloud of coconut whipped cream — dairy-free decadence at its finest.',
      price: 600,
      isFeatured: false,
      image: '/images/drinks/hot-chocolate.jpg',
      itemType: 'Hot Drinks'
    },
    {
      name: 'Spiced Date Latte',
      description: 'Espresso sweetened with our slow-simmered date syrup (infused with cardamom and orange zest) and steamed oat milk. Naturally sweet, warmly spiced, and perfect for Nairobi evenings.',
      price: 700,
      isFeatured: false,
      image: '/images/drinks/spiced-date-latte.jpg',
      itemType: 'Hot Drinks'
    },

    // ========== COLD BREWS ==========
    {
      name: 'Vanilla Cold Brew',
      description: 'Our 18-hour house cold brew concentrate blended with real Madagascar vanilla beans and a hint of Kenyan cinnamon. Smooth, never bitter, with a finish that lingers like a good conversation.',
      price: 600,
      isFeatured: false,
      image: '/images/drinks/vanilla-cold-brew.jpg',
      itemType: 'Cold Brews'
    },
    {
      name: 'Honey Cold Brew',
      description: 'House cold brew sweetened with our signature lemon-ginger honey syrup and served over ice. Refreshing, bright, and just the right amount of sweet.',
      price: 650,
      isFeatured: false,
      image: '/images/drinks/honey-cold-brew.jpg',
      itemType: 'Cold Brews'
    },
    {
      name: 'Nitro Cold Brew',
      description: 'Our house cold brew infused with nitrogen for a cascading pour and creamy texture — no milk needed. Pure coffee, elevated.',
      price: 700,
      isFeatured: false,
      image: '/images/drinks/nitro-cold-brew.jpg',
      itemType: 'Cold Brews'
    },

    // ========== PASTRIES ==========
    {
      name: 'Almond Croissant',
      description: 'Flaky, buttery layers filled with house almond cream and toasted local macadamia nuts. Baked fresh at 5AM daily — best enjoyed with a flat white while the Kinoo sun rises.',
      price: 450,
      isFeatured: false,
      image: '/images/food/almond-croissant.jpg',
      itemType: 'Pastries'
    },
    {
      name: 'Banana Bread with Macadamia',
      description: 'Overripe bananas from our neighbors’ trees blended with crushed macadamia nuts from Central Kenya. Moist, nutty, and served warm with house honey butter.',
      price: 400,
      isFeatured: false,
      image: '/images/food/banana-bread.jpg',
      itemType: 'Pastries'
    },
    {
      name: 'Kenyan Cinnamon Swirl',
      description: 'Our take on the classic cinnamon roll — made with fragrant Kenyan cinnamon, brown sugar, and a sticky caramel glaze. Best paired with a spiced date latte.',
      price: 420,
      isFeatured: false,
      image: '/images/food/cinnamon-swirl.jpg',
      itemType: 'Pastries'
    },

    // ========== LIGHT BITES ==========
    {
      name: 'Avocado Toast',
      description: 'Sourdough bread topped with our house avocado spread (mashed Hass avocados, lemon, garlic, and fresh coriander from our window herb garden). Finished with chili flakes and a poached egg from Mama Njeri’s farm.',
      price: 550,
      isFeatured: false,
      image: '/images/food/avocado-toast.jpg',
      itemType: 'Light Bites'
    },
    {
      name: 'Grilled Cheese',
      description: 'Artisanal cheddar and Gouda melted between slices of sourdough, grilled to golden perfection. Served with a small house tomato-basil soup (seasonal).',
      price: 500,
      isFeatured: false,
      image: '/images/food/grilled-cheese.jpg',
      itemType: 'Light Bites'
    },
    {
      name: 'Breakfast Wrap',
      description: 'Scrambled eggs, sautéed spinach, roasted tomatoes, and feta wrapped in a whole-wheat tortilla. Perfect for freelancers heading to their second-office shift.',
      price: 600,
      isFeatured: false,
      image: '/images/food/breakfast-wrap.jpg',
      itemType: 'Light Bites'
    }
  ];
};

// Helper: Get current types
const getCurrentTypes = () => {
  return ['Hot Drinks', 'Cold Brews', 'Pastries', 'Light Bites'];
};

// Hard Reset: Delete all and re-seed
export const hardReset = async (req, res) => {
  try {
    // Backup first
    await backupDatabase();
    
    // Delete all collections
    await MenuItem.deleteMany({});
    await ItemType.deleteMany({});
    
    // Re-seed with current data
    const types = getCurrentTypes();
    const savedTypes = {};
    for (const name of types) {
      const type = new ItemType({ name });
      const saved = await type.save();
      savedTypes[name] = saved._id;
    }

    const menuItems = getCurrentMenuData();
    for (const item of menuItems) {
      item.itemType = savedTypes[item.itemType || 'Hot Drinks']; // Map type
      await new MenuItem(item).save();
    }

    res.json({ message: '✅ Hard reset completed! Database restored to default MonRan menu.' });
  } catch (error) {
    res.status(500).json({ message: 'Reset failed', error: error.message });
  }
};

// Soft Reset: Only update changed items
export const softReset = async (req, res) => {
  try {
    const currentTypes = getCurrentTypes();
    const currentMenu = getCurrentMenuData();

    // Sync types
    for (const typeName of currentTypes) {
      const existing = await ItemType.findOne({ name: typeName });
      if (!existing) {
        await new ItemType({ name: typeName }).save();
      }
    }

    // Sync menu items
    for (const item of currentMenu) {
      const existing = await MenuItem.findOne({ name: item.name });
      if (existing) {
        // Update if changed
        let hasChanges = false;
        if (existing.description !== item.description) {
          existing.description = item.description;
          hasChanges = true;
        }
        if (existing.price !== item.price) {
          existing.price = item.price;
          hasChanges = true;
        }
        if (existing.isFeatured !== item.isFeatured) {
          existing.isFeatured = item.isFeatured;
          hasChanges = true;
        }
        if (hasChanges) {
          await existing.save();
        }
      } else {
        // Create new item
        const itemType = await ItemType.findOne({ name: item.itemType || 'Hot Drinks' });
        item.itemType = itemType._id;
        await new MenuItem(item).save();
      }
    }

    res.json({ message: '✅ Soft reset completed! Only changed items were updated.' });
  } catch (error) {
    res.status(500).json({ message: 'Soft reset failed', error: error.message });
  }
};

// Backup Database
const backupDatabase = async () => {
  try {
    const menuItems = await MenuItem.find();
    const itemTypes = await ItemType.find();
    
    const backup = {
      timestamp: new Date().toISOString(),
      menuItems: menuItems.map(item => item.toObject()),
      itemTypes: itemTypes.map(type => type.toObject())
    };

    const backupDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const filename = `backup-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    fs.writeFileSync(path.join(backupDir, filename), JSON.stringify(backup, null, 2));
    
    console.log(`✅ Database backed up to: ${filename}`);
  } catch (error) {
    console.error('Backup failed:', error);
  }
};

// Get backup list
export const getBackups = (req, res) => {
  try {
    const backupDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupDir)) {
      return res.json([]);
    }
    
    const files = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('backup-') && file.endsWith('.json'))
      .map(file => ({
        name: file,
        size: fs.statSync(path.join(backupDir, file)).size,
        date: fs.statSync(path.join(backupDir, file)).mtime
      }))
      .sort((a, b) => b.date - a.date);
    
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Failed to list backups' });
  }
};

// Restore from backup
export const restoreBackup = async (req, res) => {
  try {
    const { filename } = req.params;
    const backupPath = path.join(process.cwd(), 'backups', filename);
    
    if (!fs.existsSync(backupPath)) {
      return res.status(404).json({ message: 'Backup not found' });
    }
    
    const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
    
    // Restore
    await MenuItem.deleteMany({});
    await ItemType.deleteMany({});
    
    for (const type of backup.itemTypes) {
      await ItemType.create(type);
    }
    
    for (const item of backup.menuItems) {
      await MenuItem.create(item);
    }
    
    res.json({ message: `✅ Restored from ${filename}` });
  } catch (error) {
    res.status(500).json({ message: 'Restore failed', error: error.message });
  }
};