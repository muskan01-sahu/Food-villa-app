import { useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../Constants";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/useRestaurant";
import useCategoryFilter from "../utils/useCategoryFilter";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const RestaurantMenu = () => {
    const {resId} = useParams();
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [itemsToShow, setItemsToShow] = useState(12); // Initial items to display

    const restaurant = useRestaurant(resId);

    const regularCards = restaurant.cards?.find(
    (card) => card?.groupedCard)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards;

   // Extract menu items with their category information
   const allMenuItems = regularCards
    ?.map((card) => {
        const cardData = card.card?.card;
        const categoryTitle = cardData?.title || "";
        return {
            category: categoryTitle,
            items: cardData?.itemCards || []
        };
    })
    ?.filter((card) => card.items.length > 0)
    ?.flatMap((card) => 
        card.items.map((item) => ({
            ...item.card?.info,
            itemCategory: card.category // Preserve category from menu structure
        }))
    );

    // Use custom hook for category and search filtering
    const filteredItems = useCategoryFilter(allMenuItems, selectedCategory, searchText);

    // Limit items to show
    const displayedItems = filteredItems?.slice(0, itemsToShow);
    const hasMoreItems = filteredItems?.length > itemsToShow;

    const dispatch = useDispatch();

    const addFoodItem = (item) =>{
        dispatch(addItem(item));
    };

    // Star rating component
    const StarRating = ({ rating }) => {
        const fullStars = Math.floor(rating || 0);
        const hasHalfStar = (rating || 0) % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                ))}
                {hasHalfStar && <span className="text-yellow-400">☆</span>}
                {[...Array(emptyStars)].map((_, i) => (
                    <span key={i} className="text-gray-300">★</span>
                ))}
            </div>
        );
    };

    const categories = ["All", "Pizza", "Burger", "Pasta", "Curry", "Rice", "Beverages", "Desserts"];

    return (!restaurant.cards) ? <Shimmer/>: (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Search Bar */}
            <div className="bg-white shadow-md p-4 sticky top-28 z-30">
                <div className="max-w-6xl mx-auto">
                    <input
                        data-testid="menu-search-input"
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Search menu items..."
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            setItemsToShow(12); // Reset to initial when searching
                        }}
                    />
                </div>
            </div>

            {/* Category Filters */}
            <div className="bg-white border-b shadow-sm sticky top-[calc(7rem+1rem)] z-30">
                <div className="max-w-6xl mx-auto p-4">
                    <div className="flex gap-3 overflow-x-auto">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setItemsToShow(12); // Reset when changing category
                                }}
                                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                                    selectedCategory === category
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scrollable Menu Items Grid */}
            <div className="flex-1 overflow-y-auto p-6 max-w-6xl mx-auto">
                {displayedItems?.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No menu items found matching "{searchText}" in {selectedCategory}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedItems?.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                >
                                    {/* Image Container with Badges */}
                                    <div className="relative">
                                        <img 
                                            src={IMG_CDN_URL + (item?.imageId || item?.cloudinaryImageId || "")} 
                                            alt={item?.name}
                                            className="w-full h-48 object-cover"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                                            }}
                                        />
                                        {/* Badges */}
                                        <div className="absolute top-2 left-2 flex flex-col gap-2">
                                            {item?.isVeg && (
                                                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">
                                                    VEG
                                                </span>
                                            )}
                                            {item?.isBestseller && (
                                                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold">
                                                    BESTSELLER
                                                </span>
                                            )}
                                            {item?.isSpicy && (
                                                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">
                                                    SPICY
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Item Details */}
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">
                                            {item?.name}
                                        </h3>
                                        
                                        {/* Rating */}
                                        {item?.ratings?.aggregatedRating?.rating && (
                                            <div className="mb-2">
                                                <StarRating rating={item.ratings.aggregatedRating.rating} />
                                                <span className="ml-2 text-sm text-gray-600">
                                                    ({item.ratings.aggregatedRating.rating})
                                                </span>
                                            </div>
                                        )}

                                        {/* Price */}
                                        <div className="mb-3">
                                            <span className="text-xl font-bold text-gray-900">
                                                ₹{item?.price ? (item.price / 100) : item?.defaultPrice ? (item.defaultPrice / 100) : "N/A"}
                                            </span>
                                        </div>

                                        {/* Description (if available) */}
                                        {item?.description && (
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                {item.description}
                                            </p>
                                        )}

                                        {/* Add Button */}
                                        <button 
                                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                                            onClick={() => addFoodItem(item)}
                                        >
                                            <span>+</span> Add
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        {hasMoreItems && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={() => setItemsToShow(itemsToShow + 12)}
                                    className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default RestaurantMenu;
