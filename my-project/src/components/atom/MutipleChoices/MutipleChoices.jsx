import React from "react";

export default function MultipleChoices() {
  const handleChange = (e) => {
    // Handle the change event here if needed
    console.log(e.target.value);
  };

  return (
    <div className="relative">
      <select
        multiple
        data-hs-select='{
          "placeholder": "Select option...",
          "toggleTag": "<button type=\\"button\\"><span class=\\"me-2\\" data-icon></span><span class=\\"text-gray-800 dark:text-neutral-200\\" data-title></span></button>",
          "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex items-center text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
          "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
          "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
          "optionTemplate": "<div><div class=\\"flex items-center\\"><div class=\\"me-2\\" data-icon></div><div class=\\"font-semibold text-gray-800 dark:text-neutral-200\\" data-title></div></div><div class=\\"mt-1.5 text-sm text-gray-500 dark:text-neutral-500\\" data-description></div></div>",
          "extraMarkup": "<div class=\\"absolute top-1/2 end-3 -translate-y-1/2\\"><svg class=\\"flex-shrink-0 size-3.5 text-gray-500 dark:text-neutral-500\\" xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"m7 15 5 5 5-5\\"/><path d=\\"m7 9 5-5 5 5\\"/></svg></div>"
        }'
        className="hidden appearance-none"
        onChange={handleChange}
      >
        <option value="">Choose</option>
        <option
          value="1"
          selected
          
        >
          Anyone
        </option>
        <option
          value="2"
          
        >
          Only you
        </option>
      </select>
    </div>
  );
}
