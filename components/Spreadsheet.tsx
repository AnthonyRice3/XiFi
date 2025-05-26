"use client";

import React from "react";
import { spreadsheet } from "../data/index";



const Spreadsheet: React.FC = () => {
  return (
    <div className="container mx-auto overflow-x-auto p-4 pb-24 ">
      <h1 className="text-amber-500 text-center p-4 text-4xl">Mobile Proxies</h1>
      <table className="w-full overflow-hidden relative h-full rounded-2xl p-10 min-w-full border border-gray-300 table-fixed max-w-5xl">
        <thead>
          <tr className="bg-amber-500">
            <th className="p-2 border border-gray-300 text-left font-semibold text-md text-black">Feature</th>
            <th className="p-2 border border-gray-300 text-center font-semibold text-md text-black">Free Plan</th>
            <th className="p-2 border border-gray-300 text-center font-semibold text-md text-black">Personal Plan</th>
            <th className="p-2 border border-gray-300 text-center font-semibold text-md text-black">Business Plan</th>
            <th className="p-2 border border-gray-300 text-center font-semibold text-md text-black">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {spreadsheet.map((row, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50 text-black">
              <td className="p-2 border border-gray-300 text-md">{row.feature}</td>
              <td className="p-2 border border-gray-300 text-md text-center">{row.free}</td>
              <td className="p-2 border border-gray-300 text-md text-center">{row.personal}</td>
              <td className="p-2 border border-gray-300 text-md text-center">{row.business}</td>
              <td className="p-2 border border-gray-300 text-md text-center">{row.enterprise}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
