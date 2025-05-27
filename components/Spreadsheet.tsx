"use client";

import React from "react";
import { spreadsheet } from "../data/index";



const Spreadsheet: React.FC = () => {
  return (
    <div className=" mx-auto overflow-x-auto p-4 pb-24 ">
      {/* <h1 className="text-amber-500 text-center p-4 text-4xl">Mobile Proxies</h1> */}
      <table className="w-full overflow-hidden relative h-full rounded-2xl p-10 min-w-full border border-amber-500 table-fixed max-w-5xl">
        <thead>
          <tr className="bg-black">
            <th className="p-4 border border-amber-500 text-left font-semibold text-md text-zinc-300">Feature</th>
            <th className="p-4 border border-amber-500 text-center font-semibold text-md text-zinc-300">Free Plan</th>
            <th className="p-4 border border-amber-500 text-center font-semibold text-md text-zinc-300">Personal Plan</th>
            <th className="p-4 border border-amber-500 text-center font-semibold text-md text-zinc-300">Business Plan</th>
            <th className="p-4 border border-amber-500 text-center font-semibold text-md text-zinc-300">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {spreadsheet.map((row, index) => (
            <tr key={index} className="odd:bg-zinc-950 even:bg-black text-zinc-300">
              <td className="p-4 border border-amber-500 text-md">{row.feature}</td>
              <td className="p-4 border border-amber-500 text-md text-center">{row.free}</td>
              <td className="p-4 border border-amber-500 text-md text-center">{row.personal}</td>
              <td className="p-4 border border-amber-500 text-md text-center">{row.business}</td>
              <td className="p-4 border border-amber-500 text-md text-center">{row.enterprise}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
