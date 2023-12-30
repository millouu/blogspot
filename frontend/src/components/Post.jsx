import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { format } from "date-fns";
const Post = ({ title, summary, coverImage, createdAt, author,_id }) => {
  return (
    <Link to={`/post/${_id}`}>
      <div className='relative mb-7 h-64 flex bg-clip-border rounded-xl bg-white text-gray-700 hover:shadow-md w-full max-w-[48rem] flex-row cursor-pointer'>
      <div className='relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0'>
        <img
          src={`http://localhost:4000/${coverImage}`}
          alt='card-image'
          className='object-cover w-full h-full'
        />
      </div>
      <div className='p-6 pt-3 flex flex-col justify-between'>
        <div>
          <h4 className='block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
            {title}
          </h4>
          <div className='mb-3 font-sans text-md font-medium uppercase flex gap-3 antialiased leading-snug tracking-normal text-blue-gray-900'>
            <span>{author.username}</span>
            <time>{format(new Date(createdAt), "MMM d,yyyy HH:mm")}</time>
          </div>
          <p className='block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700'>
            {summary}
          </p>
        </div>
        <div className='inline-block'>
          <button
            className='flex items-center gap-2 font-sans text-sm font-bold text-center text-gray-900 uppercase align-middle'
            type='button'>
            Click to read more
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
              className='w-4 h-4'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    </Link>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired
};

export default Post;
