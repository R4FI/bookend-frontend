/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import { IBook } from "../../types/globalTypes";
import EditButton from "../Button/EditButton";
import DeleteButton from "../Button/DeleteButton";

interface IProps {
  book: IBook;
}

const BooksCard = ({ book }: IProps) => {
  const userEmail = localStorage.getItem("userEmail");
  const isUserBookCreator = book?.userEmail === userEmail;

  return (
    <div>
      <div className="m-auto mt-24 rounded-md shadow-md sm:w-96 dark:bg-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-between "></div>
        <Link to={`/all-books/${book._id}`}>
          <img
            src={book?.img}
            alt=""
            className="object-cover object-center w-full h-72 dark:bg-gray-500"
          />
        </Link>

        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isUserBookCreator ? <EditButton /> : ""}
              {isUserBookCreator ? (
                <button>
                  <DeleteButton />
                </button>
              ) : (
                ""
              )}
            </div>
            <button
              type="button"
              title="Bookmark post"
              className="flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fill-current"
              >
                <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z"></path>
              </svg>
            </button>
          </div>

          <div>
            <h1 className="text-2xl">Tittle:{book?.title}</h1>
          </div>

          <div className="space-y-1">
            <h3>Author: {book?.author}</h3>
            <h3>Genre: {book?.genre}</h3>
            <p>Publication Date: {book?.PublicationDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksCard;
