/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState } from "react";
import {
  useGetReviewQuery,
  usePostReviewMutation,
} from "../../redux/api/productapislice";
import "./Review.css";
interface IProps {
  id: string | undefined;
}

const Reviews = ({ id }: IProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { data } = useGetReviewQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  const [postReview, options] = usePostReviewMutation();
  console.log(options);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const option = {
      id: id,
      data: { reviews: inputValue },
    };
    postReview(option);
    setInputValue("");
  };
  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };
  return (
    <div>
      <div className="max-w-xl mx-auto mt-5 reviewcard dark:bg-gray-900">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              type="text"
              onChange={handleChange}
              placeholder="Add a comment..."
              value={inputValue}
              className="w-full py-0.5 dark:bg-transparent border-none rounded text-sm pl-0 dark:text-white p-3 border-4"
            />
            <button
              type="submit"
              className="rounded-full h-10 w-20 p-2 text-black bg-white"
            >
              Send
            </button>
          </div>
        </form>
        <div className="mt-5">
          {data?.data?.slice(0, 5).map((reviews: string, index: number) => (
            <div key={index} className="flex gap-2 items-center mb-5">
              <p className="bg-white rounded-full w-96 p-2">{reviews}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
