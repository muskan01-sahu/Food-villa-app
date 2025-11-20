import { useMemo } from "react";

 // Category keywords mapping for better matching
const categoryKeywords = {
    pizza: ["pizza", "pizzas", "margherita", "pepperoni", "cheese", "veggie", "paneer", "chicken"],
    burger: ["burger", "burgers", "whopper", "chicken", "veg", "cheese", "crispy"],
    pasta: ["pasta", "penne", "spaghetti", "macaroni", "alfredo", "carbonara", "marinara"],
    beverages: ["beverage", "drink", "juice", "soda", "cola", "pepsi", "coke", "milkshake", "shake", 
                "smoothie", "coffee", "tea", "latte", "cappuccino", "mocha", "frappe", "lemonade", 
                "iced", "cold", "hot", "water", "mocktail", "cocktail", "beer", "wine"],
    desserts: ["dessert", "sweet", "cake", "ice cream", "icecream", "brownie", "pie", "pudding", 
               "custard", "gulab jamun", "rasgulla", "kulfi", "halwa", "jalebi", "ladoo", 
               "barfi", "pastry", "muffin", "cookie", "biscuit", "chocolate", "candy", "candies"],
    curry: ["curry", "curries", "sabzi", "sabji", "gravy", "masala", "tikka", "butter", "paneer",
           "chicken", "mutton", "lamb", "goat", "fish", "prawn", "shrimp", "kadai", "makhani", "handi",
            "rogan", "josh", "vindaloo", "korma", "rajma", "chole", "chana", "aloo", "potato"],
    rice: ["rice", "biryani", "pulao", "pulav", "fried rice", "jeera rice", "steamed rice",
           "basmati", "brown rice", "white rice", "khichdi", "khichri"]
};
const useCategoryFilter = (items, selectedCategory, searchText = "") => {
    const filteredItems = useMemo(() => {
        if (!items || items.length === 0) return [];

        return items.filter((item) => {
            // Search filter
            const matchesSearch = searchText
                ? item?.name?.toLowerCase().includes(searchText.toLowerCase())
                : true;

            // Category filter with improved keyword matching
            let matchesCategory = true;
            if (selectedCategory && selectedCategory !== "All") {
                const itemName = item?.name?.toLowerCase() || "";
                const itemDescription = item?.description?.toLowerCase() || "";
                const itemCategory = item?.category || "";
                const itemCategoryId = item?.categoryId || "";
                const itemCategoryFromMenu = item?.itemCategory?.toLowerCase() || ""; // Category from menu structure
                
                const categoryLower = selectedCategory.toLowerCase();
                const keywords = categoryKeywords[categoryLower] || [];
                
                // Priority 1: If item has a menu category, check it first (most reliable)
                if (itemCategoryFromMenu) {
                    // Check if menu category matches selected category
                    const menuCategoryMatches = itemCategoryFromMenu.includes(categoryLower);
                    
                    // Check if menu category contains any keywords for selected category
                    const menuHasKeyword = keywords.some(keyword => 
                        itemCategoryFromMenu.includes(keyword)
                    );
                    
                    // If menu category matches, use it
                    if (menuCategoryMatches || menuHasKeyword) {
                        matchesCategory = true;
                    } else {
                        // If menu category exists but doesn't match, exclude the item
                        // (e.g., if item is in "Desserts" menu section, don't show for "Beverages")
                        matchesCategory = false;
                    }
                } else {
                    // Priority 2: If no menu category, check item name and description
                    const hasCategoryName = itemName.includes(categoryLower) || 
                                           itemDescription.includes(categoryLower) ||
                                           itemCategory.includes(categoryLower);
                    
                    // Check if any keyword matches in name or description
                    const hasKeyword = keywords.some(keyword => 
                        itemName.includes(keyword) || itemDescription.includes(keyword)
                    );
                    
                    // Also check itemCategoryId if available
                    const matchesCategoryId = itemCategoryId && 
                        itemCategoryId.toLowerCase().includes(categoryLower);
                    
                    matchesCategory = hasCategoryName || hasKeyword || matchesCategoryId;
                }
            }

            return matchesSearch && matchesCategory;
        });
    }, [items, selectedCategory, searchText]);

    return filteredItems;
};

export default useCategoryFilter;

