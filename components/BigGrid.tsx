"use client";
import React from "react";

export default function BigGrid () {
  return (
    <div className="w-full p-8 pt-24 ">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Check the navbar at the top of the container
      </h1>
      <p className="mb-10 text-center text-sm text-zinc-500">
        For demo purpose we have kept the position as{" "}
        <span className="font-medium">Sticky</span>. Keep in mind that this
        component is <span className="font-medium">fixed</span> and will not
        move when scrolling.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            id: 1,
            header: "title",
            title: "This free lorem ipsum generator lets you choose how many sentences, paragraphs or list items you want. You can also select to include HTML markup and specify how big the text should be. It currently supports standard Lorem Ipsum, Marvel Ipsum, Batman Ipsum and Pokemon Ipsum.",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          {
            id: 2,
            header: "title",
            title: "his free lorem ipsum generator lets you choose how many sentences, paragraphs or list items you want. You can also select to include HTML markup and specify how big the text should be. It currently supports standard Lorem Ipsum, Marvel Ipsum, Batman Ipsum and Pokemon Ipsum.",
            width: "md:col-span-2",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          {
            id: 3,
            header: "title",
            title: "his free lorem ipsum generator lets you choose how many sentences, paragraphs or list items you want. You can also select to include HTML markup and specify how big the text should be. It currently supports standard Lorem Ipsum, Marvel Ipsum, Batman Ipsum and Pokemon Ipsum.",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          {
            id: 4,
            header: "title",
            title: "Of",
            width: "md:col-span-3",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          {
            id: 5,
            header: "title",
            title: "F",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          {
            id: 6,
            header: "title",
            title: "Club",
            width: "md:col-span-2",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          {
            id: 7,
            header: "title",
            title: "Is",
            width: "md:col-span-2",
            height: "h-60",
            bg: "bg-neutral-100 dark:bg-neutral-800",
          },
          
        ].map((box) => (
          <div
            key={box.id}
            className={`${box.width} ${box.height} ${box.bg} flex flex-col items-center justify-center rounded-lg p-4 shadow-sm`}
          >
            <div>
            <h1 className="text-center text-zinc-950 font-bold text-3xl">{box.header}</h1>
            </div>
            <h2 className="text-xl font-medium">{box.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};