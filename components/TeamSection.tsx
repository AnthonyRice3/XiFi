// components/TeamSection.tsx
import Image from "next/image";
import React from "react";

const team = [
  { name: "Alex Morgan", title: "Chief Executive Officer", role: "CEO", img:"/alienfrens.png" },
  { name: "Jamie Carter", title: "Chief Technology Officer", role: "CIO", img:"/mm.jpg" },
  { name: "Dana Kim", title: "Chief Financial Officer", role: "CFO", img:"/cloaks.png" },
  { name: "Jordan Lee", title: "Chief Information Officer", role: "CTO", img:"/invisible.png" },
  { name: "Taylor Brooks", title: "Chief Strategy Officer", role: "CSO", img:"/naka.png" }, // Extra spot
];

const TeamSection = () => {
  return (
    <section className=" py-20 px-6 md:px-20 bg-black">
      <div className="max-w-7xl mx-auto text-center">
        
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
            >
              <Image className="border border-amber-500 rounded-xl" src={member.img} alt="4" width={350} height={400} />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-sm text-amber-600">{member.role}</p>
                <p className="text-sm text-gray-500">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
