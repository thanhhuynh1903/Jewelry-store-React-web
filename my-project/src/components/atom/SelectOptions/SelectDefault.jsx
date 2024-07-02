import React, { useState, useEffect } from "react";

export function SelectDefault({
  label,
  ListCate,
  ListMaterial,
  ListGemstone,
  ListType,
  onSelectCategory,
  onSelectType,
  onSelectGemstone,
  onSelectMaterial,
  defaultValue,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedGemstone, setSelectedGemstone] = useState("");
  useEffect(() => {
    if (defaultValue) {
      if (label === "Category") {
        setSelectedCategory(defaultValue._id);
      } else if (label === "Type") {
        setSelectedType(defaultValue._id);
      } else if (label === "Material") {
        setSelectedMaterial(defaultValue._id);
      } else if (label === "Gemstone") {
        setSelectedGemstone(defaultValue._id);
      }
    }
  }, [defaultValue, label]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  };

  const handleTypeChange = (e) => {
    const typeId = e.target.value;
    setSelectedType(typeId);
    onSelectType(typeId);
  };

  const handleMaterialChange = (e) => {
    const material = e.target.value;
    setSelectedMaterial(material);
    onSelectMaterial(material);
  };

  const handleGemstoneChange = (e) => {
    const gemstone = e.target.value;
    setSelectedGemstone(gemstone);
    onSelectGemstone(gemstone);
  };

  const maxVisibleOptions = 5;

  return (
    <form
      className={
        label === "Weight"
          ? "w-full"
          : label === "Size"
          ? "w-20"
          : label === "Material"
          ? "w-full pl-2"
          : label === "Gemstone"
          ? "w-full pl-2"
          : ""
      }
    >
      {label === "CategoryInType" && (
        <select
          id="categories"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          size={Math.min(maxVisibleOptions, ListCate?.length)}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">
            {defaultValue ? defaultValue.name : "Select a category"}
          </option>
          {ListCate &&
            ListCate?.filter(
              (category) => category?._id !== defaultValue?._id
            ).map((category) => (
              <option key={category?._id} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
      )}

      {label === "Type" && (
        <select
          id="types"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          size={Math.min(maxVisibleOptions, ListType?.length)}
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">
            {defaultValue ? defaultValue.name : "Select a type"}
          </option>
          {ListType &&
            ListType.filter((type) => type._id !== defaultValue?._id).map(
              (type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              )
            )}
        </select>
      )}

      {label === "Material" && (
        <select
          id="types"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          size={Math.min(maxVisibleOptions, ListMaterial?.length)}
          value={selectedMaterial}
          onChange={handleMaterialChange}
        >
          <option value="">
            {defaultValue ? defaultValue.name : "Select a type"}
          </option>
          {ListMaterial &&
            ListMaterial.filter((type) => type._id !== defaultValue?._id).map(
              (type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              )
            )}
        </select>
      )}
      {label === "Gemstone" && (
        <select
          id="types"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          size={Math.min(maxVisibleOptions, ListGemstone?.length)}
          value={selectedGemstone}
          onChange={handleGemstoneChange}
        >
          <option value="">
            {defaultValue ? defaultValue.name : "Select a type"}
          </option>
          {ListGemstone &&
            ListGemstone.filter((type) => type._id !== defaultValue?._id).map(
              (type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              )
            )}
        </select>
      )}
    </form>
  );
}
