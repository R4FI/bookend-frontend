/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useState } from "react";
import { useGetBooksQuery } from "../../redux/api/productapislice";
import { IBook } from "../../types/globalTypes";
import BooksCard from "./BooksCard";

const AllBooks = () => {
  const { data } = useGetBooksQuery(undefined);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [input, setInput] = useState("");

  return (
    <div>
      <div className="text-2xl font-extrabold text-center mt-10">
        <h1>All Books</h1>
        <div>
          {/* Search Bar */}
          <div className="flex justify-center mt-5">
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }}
              type="text"
              placeholder="search"
            />
          </div>
          {/* Filter by Genre */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="border border-gray-300 p-2 rounded-md mr-2"
          >
            <option value="">All Genres</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Mystery">Mystery</option>
            {/* Add other genres here */}
          </select>
          {/* Filter by Year */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="">All Years</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            {/* Add other years here */}
          </select>
        </div>
      </div>

      <div className="mx-auto col-span-9 grid xs:grid-cols-3 gap-10 pb-5 xl:grid-cols-3">
        {data?.data
          ?.filter((val: { title: { toString: () => string } }) => {
            if (input == "") {
              return val;
            } else if (
              val.title
                .toString()
                .toLowerCase()
                .includes(input.toString().toLowerCase())
            ) {
              return val;
            }
          })
          .map((book: IBook) => <BooksCard book={book} key={book._id} />)}
      </div>
      <div className="text-center text-xl text-white"></div>
    </div>
  );
};

export default AllBooks;

// data?.data?.
