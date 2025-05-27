"use client";
import React, { useRef,  } from "react";
import emailjs from '@emailjs/browser';



export function Form() {
  const form = useRef<HTMLFormElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const referralInput = useRef<HTMLInputElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs.sendForm('service_ps4mogk', 'template_gzd61om', form.current, 'fP3VrCnq3NBoW1mKL')
        .then((result) => {
          console.log(result.text);
          console.log("message sent");

          // Reset input values
          if (nameInput.current) nameInput.current.value = '';
          if (emailInput.current) emailInput.current.value = '';
          if (referralInput.current) referralInput.current.value = '';

          alert('Thank you for your submission!');
        }, (error) => {
          console.log(error.text);
        });
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto rounded-none md:rounded-2xl p-4 md:p-8 z-40">
      <h2 className="font-bold text-xl text-amber-200 ">
        Welcome to ProXiFi
      </h2>
      

      <form ref={form} onSubmit={sendEmail}>
        {/* <h1>Request a Job Estimate</h1> */}
        <div></div>
        <p className="text-amber-500 py-4">To request an estimate for your glass or mirror job, please fill out the form below and we will contact you as soon as possible to schedule an appointment time. You will receive an email confirming your request. Our team looks forward to discussing your needs further and ensuring you have an outstanding experience!</p>
        <div></div>
        <div>
          <div>
            <label className='font-bold text-white'>Last Name *</label>
            <br />
            <input
            placeholder="last name"
            title="name"
              ref={nameInput}
              type="text"
              name="last_name"
              className='mb-12 mt-2 p-4 border-2  w-full text-md font-bold text-black'
            />
          </div>
          <br />
          <div>
            <label className='font-bold text-white'>First Name *</label>
            <br />
            <input
            title="name"
              ref={nameInput}
              type="text"
              name="first_name"
              className='mb-12 mt-2 p-4 border-2  w-full text-md font-bold text-black'
            />
          </div>
          <br />
          <div>
            <label className='font-bold text-white'>Phone Number *</label>
            <br />
            <input
            title="name"
              ref={nameInput}
              type="text"
              name="number"
              className='mb-12 mt-2 p-4 border-2  w-full text-md font-bold text-black'
            />
          </div>
          <br />
          <div>
            <label className='font-bold text-white'>Email</label>
            <br />
            <input
            title="name"
              required
              ref={emailInput}
              type="email"
              name="email"
              className='my-2 p-4 border-2  w-full text-md font-bold text-black'
            />
          </div>
          <br />
          <div>
            <label className='font-bold text-white'>Address</label>
            <br />
            <input
            title="name"
              required
              ref={referralInput}
              type="text"
              name="address"
              className='my-2 p-4 border-2  w-full text-md font-bold text-black'
            />
          </div>
          <br />
          <div>
            <label className='font-bold text-white'>Zip/Postal Code *</label>
            <br />
            <input
            title="name"
              ref={nameInput}
              type="number"
              name="zip_code"
              className='mb-12 mt-2 p-4 border-2  w-full text-md font-bold text-black'
            />
          </div>
          <br />
          <div >
            <label htmlFor="date" className="text-white">Availability</label>
            <br />
            <input
            title="name" type="date" id="date" name="date" />
          </div>
          <br />
          <div className="py-4 v">
            <label htmlFor="myfile" className="text-white">Select a file:</label>
            <br />
            <input
            title="name" type="file" id="myfile" name="myfile"  className="text-white"/>
          </div>

          {/* Uncomment if you need this input */}
          {/* <label className='font-bold text-white'>Short Message *optional</label>
          <input
          title="name"
            ref={referralInput}
            type="text"
            name="referral_key"
            className='p-4 py-20 border-2  w-full text-md font-bold text-black'
          /> */}

          <button
            type="submit"
            value="submit"
            className="p-2 bg-black cursor-pointer text-white"
            onClick={() => alert('Thank You We Have Received Your Email!')}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

// const BottomGradient = () => {
//   return (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );
// };

// const LabelInputContainer = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className="flex flex-col space-y-2 w-full z-50">
//       {children}
//     </div>
//   );
// };
