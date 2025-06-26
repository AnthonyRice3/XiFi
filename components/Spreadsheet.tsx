"use client";

import React from "react";



const Spreadsheet: React.FC = () => {
  return (
    

<div className="relative overflow-x-auto md:mx-44 pb-8 bg-stone-950 shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr className="text-amber-500">
                <th scope="col" className="px-6 py-3 bg-stone-900">
                    Feature
                </th>
                <th scope="col" className="px-6 py-3">
                    Shared
                </th>
                <th scope="col" className="px-6 py-3 bg-stone-900">
                    Designated
                </th>
                <th scope="col" className="px-6 py-3">
                    Premium
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="border-b border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap bg-stone-900 text-white">
                    Apple MacBook Pro
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4 bg-stone-900">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr className="border-b border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap bg-stone-900 text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4 bg-stone-900">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr className="border-b border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap bg-stone-900 text-white">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                    Black
                </td>
                <td className="px-6 py-4 bg-stone-900">
                    Accessories
                </td>
                <td className="px-6 py-4">
                    $99
                </td>
            </tr>
            <tr className="border-b border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap bg-stone-900 text-white">
                    Google Pixel Phone
                </th>
                <td className="px-6 py-4">
                    Gray
                </td>
                <td className="px-6 py-4 bg-stone-900">
                    Phone
                </td>
                <td className="px-6 py-4">
                    $799
                </td>
            </tr>
            <tr>
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap bg-stone-900 text-white">
                    Apple Watch 5
                </th>
                <td className="px-6 py-4">
                    Red
                </td>
                <td className="px-6 py-4 bg-stone-900">
                    Wearables
                </td>
                <td className="px-6 py-4">
                    $999
                </td>
            </tr>
        </tbody>
    </table>
</div>

  );
};

export default Spreadsheet;
