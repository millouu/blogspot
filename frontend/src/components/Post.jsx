const Post = () => {
  return (
    <div className='relative mb-7 flex bg-clip-border rounded-xl bg-white text-gray-700 hover:shadow-md w-full max-w-[48rem] flex-row cursor-pointer'>
        <div className='relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0'>
          <img
            src='https://images.unsplash.com/photo-1639020715359-f03b05835829?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='card-image'
            className='object-cover w-full h-full'
          />
        </div>
        <div className='p-6'>
          <h4 className='block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
            The Best Burgers in Town
          </h4>
          <div className='block mb-3 font-sans text-md font-medium uppercase flex gap-3 antialiased leading-snug tracking-normal text-blue-gray-900'>
            <span>Mills</span>
            <span>28-12-2023</span>
          </div>
          <p className='block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700'>
            {`Nestled within the bustling streets of our town lies an unassuming
            yet extraordinary culinary haven—the place where burgers transcend
            mere meals and become exquisite works of art. Yes, you guessed it
            right! We're talking about the epitome of burger perfection: "Flavor
            Junction."`}
          </p>
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
  )
}

export default Post
