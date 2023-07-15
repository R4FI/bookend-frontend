/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useGetBooksQuery } from "../../redux/api/productapislice";
import { IBook } from "../../types/globalTypes";
import BooksCard from "./BooksCard";

const AllBooks = () => {
  const { data } = useGetBooksQuery(undefined);
  return (
    <div>
      <div className="text-2xl font-extrabold text-center mt-10">
        <h1>All Books</h1>
      </div>
      <div className="mx-auto col-span-9 grid xs:grid-cols-3 gap-10 pb-5 xl:grid-cols-3">
        {data?.data?.map((book: IBook) => <BooksCard book={book} />)}
      </div>
      <div className="text-center text-xl text-white"></div>
    </div>
  );
};

export default AllBooks;
