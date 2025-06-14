export default function FoodBankFilterButton({ selectedFilters, toggleFilter, filterKey, filterName }) {
    return (
        <button
            onClick={() => toggleFilter(filterKey)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap 
              ${selectedFilters[filterKey] ? "bg-orange-50 text-orange-500" : "bg-gray-100 text-gray-500"}`}>
            {filterName}
        </button>
    )
}
