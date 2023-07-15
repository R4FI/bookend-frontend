/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link } from "react-router-dom";
import { IBook } from "../../types/globalTypes";
import BooksCard from "./BooksCard";
import { useGetBooksQuery } from "../../redux/api/productapislice";

const HomeBooks = () => {
  const { data } = useGetBooksQuery(undefined);
  return (
    <div>
      <div className="text-2xl font-extrabold text-center mt-10">
        <h1>Books</h1>
      </div>
      <div className="mx-auto col-span-9 grid xs:grid-cols-3 gap-10 pb-5 xl:grid-cols-3">
        {data?.data
          ?.slice(0, 6)
          .map((book: IBook) => <BooksCard book={book} />)}
      </div>
      <div className="text-center text-xl text-white">
        <Link to={"/all-books"}>
          <button className="bg-black p-2 w-25 border rounded-md">
            See All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeBooks;
