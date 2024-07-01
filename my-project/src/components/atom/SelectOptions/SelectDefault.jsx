import React, { useState } from "react";

export function SelectDefault({
  label,
  ListCate,
  onSelectCategory,
  defaultValue,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log(selectedCategory);
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId); // Notify parent component of selected category
  };

  const maxVisibleOptions = 5;
console.log(defaultValue);
  return (
    <form
      className={label === "Weight" ? "w-full" : label === "Size" ? "w-20" : ""}
    >
      <select
        id="categories"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        size={Math.min(maxVisibleOptions, ListCate?.length)}
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        {label === "Detail" ? (
          <option value="">
            {" "}
            {defaultValue ? defaultValue?.size : "Select a size"}
          </option>
        ) : (
          <option value="">
            {" "}
            {defaultValue ? defaultValue?.name : "Select a category"}
          </option>
        )}

        {ListCate?.filter(
          (category) => category?._id !== defaultValue?._id
        ).map((category) => (
          <option key={category?._id} value={category?._id}>
            {category?.name}
          </option>
        ))}
      </select>
    </form>
  );
}
