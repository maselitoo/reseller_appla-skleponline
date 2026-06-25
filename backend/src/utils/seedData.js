import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { join } from 'path';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import connectDB from '../config/database.js';

dotenv.config({ path: join(process.cwd(), '.env') });

const users = [
  {
    name: 'Admin User',
    email: 'admin@resellerapple.pl',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    password: 'password123',
    role: 'user'
  }
];

const products = [
  {
    name: 'iPhone 15 Pro Max',
    description: 'Najnowszy iPhone z chipem A17 Pro, aparatem 48MP i ekranem ProMotion 120Hz',
    price: 6499,
    category: 'iPhone',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop&sat=-50'
    ],
    countInStock: 15,
    inStock: true,
    featured: true,
    specifications: {
      'Procesor': 'Apple A17 Pro',
      'RAM': '8GB',
      'Pamięć': '256GB',
      'Ekran': '6.7" Super Retina XDR',
      'Aparat': '48MP + 12MP + 12MP',
      'Bateria': '4422 mAh'
    }
  },
  {
    name: 'iPhone 15 Pro',
    description: 'iPhone 15 Pro z chipem A17 Pro i tytanową obudową',
    price: 5499,
    category: 'iPhone',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop&sat=-100',
    countInStock: 20,
    inStock: true,
    featured: true,
    specifications: {
      'Procesor': 'Apple A17 Pro',
      'RAM': '8GB',
      'Pamięć': '128GB',
      'Ekran': '6.1" Super Retina XDR'
    }
  },
  {
    name: 'iPhone 15',
    description: 'iPhone 15 z Dynamic Island i aparatem 48MP',
    price: 4299,
    category: 'iPhone',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop&hue=180',
    countInStock: 25,
    inStock: true,
    specifications: {
      'Procesor': 'Apple A16 Bionic',
      'RAM': '6GB',
      'Pamięć': '128GB'
    }
  },
  {
    name: 'MacBook Pro 14" M3',
    description: 'MacBook Pro z chipem M3, 14" Liquid Retina XDR display',
    price: 8999,
    category: 'MacBook',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop',
    countInStock: 10,
    inStock: true,
    featured: true,
    specifications: {
      'Procesor': 'Apple M3',
      'RAM': '16GB',
      'Dysk': '512GB SSD',
      'Ekran': '14.2" Liquid Retina XDR'
    }
  },
  {
    name: 'MacBook Air 13" M2',
    description: 'Lekki i wydajny MacBook Air z chipem M2',
    price: 5499,
    category: 'MacBook',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=800&fit=crop',
    countInStock: 18,
    inStock: true,
    featured: true,
    specifications: {
      'Procesor': 'Apple M2',
      'RAM': '8GB',
      'Dysk': '256GB SSD',
      'Ekran': '13.6" Liquid Retina'
    }
  },
  {
    name: 'iPad Pro 12.9" M2',
    description: 'Profesjonalny tablet z chipem M2 i ekranem Liquid Retina XDR',
    price: 5799,
    category: 'iPad',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop',
    countInStock: 12,
    inStock: true,
    specifications: {
      'Procesor': 'Apple M2',
      'RAM': '8GB',
      'Pamięć': '128GB',
      'Ekran': '12.9" Liquid Retina XDR'
    }
  },
  {
    name: 'iPad Air 10.9"',
    description: 'iPad Air z chipem M1 i obsługą Apple Pencil',
    price: 3299,
    category: 'iPad',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop&sat=-50',
    countInStock: 15,
    inStock: true,
    specifications: {
      'Procesor': 'Apple M1',
      'Pamięć': '64GB',
      'Ekran': '10.9" Liquid Retina'
    }
  },
  {
    name: 'Apple Watch Series 9',
    description: 'Najnowszy Apple Watch z chipem S9 i jasnym ekranem',
    price: 1899,
    category: 'Watch',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop',
    countInStock: 30,
    inStock: true,
    featured: true,
    specifications: {
      'Procesor': 'Apple S9',
      'Ekran': 'Always-On Retina',
      'Wodoodporność': '50m',
      'GPS': 'Tak'
    }
  },
  {
    name: 'Apple Watch SE',
    description: 'Przystępny cenowo Apple Watch z podstawowymi funkcjami',
    price: 1299,
    category: 'Watch',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop&sat=-50',
    countInStock: 25,
    inStock: true,
    specifications: {
      'Procesor': 'Apple S8',
      'Ekran': 'Retina',
      'Wodoodporność': '50m'
    }
  },
  {
    name: 'AirPods Pro 2',
    description: 'Słuchawki z aktywną redukcją szumów i trybem przezroczystości',
    price: 1199,
    category: 'AirPods',
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&h=800&fit=crop',
    countInStock: 40,
    inStock: true,
    featured: true,
    specifications: {
      'ANC': 'Tak',
      'Czas pracy': 'Do 6h',
      'Etui': 'MagSafe + USB-C',
      'Wodoodporność': 'IPX4'
    }
  },
  {
    name: 'AirPods 3',
    description: 'Bezprzewodowe słuchawki z dźwiękiem przestrzennym',
    price: 799,
    category: 'AirPods',
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&h=800&fit=crop&sat=-50',
    countInStock: 35,
    inStock: true,
    specifications: {
      'Dźwięk przestrzenny': 'Tak',
      'Czas pracy': 'Do 6h',
      'Etui': 'MagSafe'
    }
  },
  {
    name: 'AirPods Max',
    description: 'Nauszne słuchawki premium z ANC i dźwiękiem Hi-Fi',
    price: 2599,
    category: 'AirPods',
    image: 'https://images.unsplash.com/photo-1625738183566-e3f5b8f8e3e5?w=800&h=800&fit=crop',
    countInStock: 8,
    inStock: true,
    specifications: {
      'ANC': 'Tak',
      'Czas pracy': 'Do 20h',
      'Dźwięk przestrzenny': 'Tak',
      'Materiał': 'Aluminium + tkanina'
    }
  }
];

const importData = async () => {
  try {
    await connectDB();

    // Usuń istniejące dane
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Dodaj użytkowników
    const createdUsers = await User.insertMany(users);
    console.log('✅ Użytkownicy dodani');

    // Dodaj produkty
    await Product.insertMany(products);
    console.log('✅ Produkty dodane');

    console.log('✅ Dane zaimportowane pomyślnie!');
    process.exit();
  } catch (error) {
    console.error(`❌ Błąd: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('✅ Dane usunięte!');
    process.exit();
  } catch (error) {
    console.error(`❌ Błąd: ${error.message}`);
    process.exit(1);
  }
};

// Sprawdź argument z linii komend
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

// Made with Bob
