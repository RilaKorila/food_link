export default function FoodBankFilterButton({ selectedFilters, toggleFilter, filterKey, filterName }) {
    return (
        <button
            onClick={() => toggleFilter(filterKey)}
            className={`flex items-center px-3 py-1 rounded-full text-sm 
              ${selectedFilters[filterKey] ? "bg-orange-50 text-orange-500" : "bg-gray-100 text-gray-500"}`}>
            {filterName}
        </button>
    )
}
