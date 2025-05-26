// components/Manifesto.tsx
import React from "react";

const Manifesto = () => {
  return (
    <section className=" text-white py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-left md:ml-32">
        <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-6 text-white">
          Our <span className="text-amber-600">Manifesto</span>
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-amber-300">
          <span className="text-amber-500 font-semibold">Brains on Fire</span>{" "}
          builds movements for great companies and causes.
          <br />
          Born out of the bond between{" "}
          <span className="text-amber-400">word of mouth marketing</span> and{" "}
          <span className="text-amber-400">identity development</span>, we are
          devoted to helping organizations{" "}
          <span className="text-amber-300">discover</span> and{" "}
          <span className="text-amber-300">sustain</span> excitement about{" "}
          <span className="text-amber-400">who they are</span> and{" "}
          <span className="text-amber-400">why they exist</span>.
        </p>

        <div className="space-y-4 text-amber-200">
          <p>
            <span className="font-bold text-white">Our beliefs:</span> <br />
            Great organizations are driven by{" "}
            <span className="text-amber-400 font-semibold">purpose</span>, not
            just profit.
          </p>
          <p>
            They grow{" "}
            <span className="text-amber-400 font-semibold">relationships</span>,
            not just transactions.
          </p>
          <p>
            And they thrive through{" "}
            <span className="text-amber-400 font-semibold">movements</span>, not
            campaigns.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
