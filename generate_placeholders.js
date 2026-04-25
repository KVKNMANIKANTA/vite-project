const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const products = [
    // Dairy
    { name: 'milk.svg', color: '#fefce8', text: 'Fresh Milk', textColor: '#854d0e', icon: '🥛' },
    { name: 'butter.svg', color: '#fef3c7', text: 'Farm Butter', textColor: '#92400e', icon: '🧈' },
    { name: 'yogurt.svg', color: '#fae8ff', text: 'Greek Yogurt', textColor: '#86198f', icon: '🥣' },
    { name: 'cheese.svg', color: '#ffedd5', text: 'Cheddar', textColor: '#9a3412', icon: '🧀' },
    
    // Veg
    { name: 'spinach.svg', color: '#dcfce7', text: 'Fresh Spinach', textColor: '#166534', icon: '🌿' },
    { name: 'carrots.svg', color: '#ffedd5', text: 'Carrots', textColor: '#9a3412', icon: '🥕' },
    { name: 'broccoli.svg', color: '#dcfce7', text: 'Broccoli', textColor: '#166534', icon: '🥦' },
    { name: 'peppers.svg', color: '#fee2e2', text: 'Bell Peppers', textColor: '#991b1b', icon: '🫑' },

    // Fruit
    { name: 'apples.svg', color: '#fee2e2', text: 'Red Apples', textColor: '#991b1b', icon: '🍎' },
    { name: 'bananas.svg', color: '#fef9c3', text: 'Bananas', textColor: '#854d0e', icon: '🍌' },
    { name: 'strawberries.svg', color: '#ffe4e6', text: 'Strawberries', textColor: '#9f1239', icon: '🍓' },
    { name: 'avocado.svg', color: '#ecfccb', text: 'Avocados', textColor: '#365314', icon: '🥑' },

    // Accessories
    { name: 'bag.svg', color: '#e7e5e4', text: 'Jute Bag', textColor: '#44403c', icon: '🛍️' },
    { name: 'straws.svg', color: '#fefce8', text: 'Bamboo Straws', textColor: '#854d0e', icon: '🥤' },
];

const generateSVG = (product) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="${product.color}" />
  <rect width="380" height="280" x="10" y="10" fill="none" stroke="${product.textColor}" stroke-width="4" stroke-opacity="0.2" rx="20" />
  
  <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="80" fill="${product.textColor}">${product.icon}</text>
  <text x="50%" y="75%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="32" font-weight="bold" fill="${product.textColor}">${product.text}</text>
</svg>`;
};

products.forEach(product => {
    const filePath = path.join(outputDir, product.name);
    fs.writeFileSync(filePath, generateSVG(product));
    console.log(`Generated ${product.name}`);
});
