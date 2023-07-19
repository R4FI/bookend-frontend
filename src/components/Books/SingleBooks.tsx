/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
  useSingleBookQuery,
} from "../../redux/api/productapislice";
import Reviews from "../Reviews/Reviews";
import EditButton from "../Button/EditButton";
import DeleteButton from "../Button/DeleteButton";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
const SingleBooks = () => {
  const { id } = useParams();
  const { data: data } = useSingleBookQuery(id);
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  const { refetch } = useGetBooksQuery(undefined);
  const [isBookDeleted, setIsBookDeleted] = useState(false);
  const isUserBookCreator = data?.data.userEmail === userEmail;
  console.log(isUserBookCreator);
  const [deleteBook, option] = useDeleteBookMutation();
  const handleDelete = async () => {
    if (isUserBookCreator) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this book?"
      );
      if (confirmed) {
        await deleteBook(id);
        toast.success("Book Deleted Successfully");
        setIsBookDeleted(true);
        navigate("/all-books");
      }
    }
  };
  useEffect(() => {
    if (option.isSuccess) {
      void refetch();
    }
  }, [option.isSuccess, refetch]);
  if (!data) {
    return (
      <div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
        </div>
      </div>
    );
    if (isBookDeleted) {
      return <div>Book has been deleted successfully.</div>;
    }
  }
  return (
    <div>
      <div className="m-auto mt-10 rounded-md shadow-md sm:w-96 dark:bg-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-between "></div>
        <img
          src={data?.data.img}
          alt=""
          className="object-cover object-center w-full h-72 dark:bg-gray-500"
        />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to={`/book/${id}`}>
                {" "}
                {isUserBookCreator && <EditButton />}
              </Link>
              <button onClick={handleDelete}>
                {" "}
                {isUserBookCreator && <DeleteButton />}
              </button>
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
            <h1 className="text-2xl">Tittle:{data?.data.title}</h1>
          </div>
          <div className="space-y-1">
            <h3>Author: {data?.data.author}</h3>
            <h3>Genre: {data?.data.genre}</h3>
            <p>Publication Date: {data?.data.PublicationDate}</p>
          </div>
        </div>
      </div>
      <Reviews id={id} />
      <ToastContainer />
    </div>
  );
};

export default SingleBooks;
