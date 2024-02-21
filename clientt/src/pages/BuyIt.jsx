import React from 'react';

function BuyIt() {
  return (
    <div className='text-white flex flex-col lg:flex-row gap-7 p-10'>
      <div className='lg:w-1/2'>
        <img
          src="https://i.seadn.io/s/raw/files/5969db5565a8b281445eb057a36e0e67.png?auto=format&dpr=1&w=1000"
          alt=""
          className='rounded-xl w-full'
        />
      </div>
      <div className='lg:w-1/2'>
        <div className='text-xl pb-10'>
          <h1 className='text-6xl font-bold'>Gardens by the Sea</h1>
          <p className='pl-1 text-lg'>owned by FBD85F</p>
        </div>
        <div>
          <div className='border-2 rounded-lg p-4 mb-6'>
            <p className='text-xl pb-2 pl-1 text-slate-300'>Current price</p>
            <h1 className='text-4xl font-bold pb-5'>0.021ETH</h1>
            <div className='flex flex-col lg:flex-row gap-5 mb-6'>
              <button className='border text-xl p-2 w-full lg:w-[50%] rounded-xl bg-blue-600 mb-2 lg:mb-0'>
                Buy now
              </button>
              <button className='border text-xl p-2 w-full lg:w-[50%] rounded-xl bg-blue-600'>
                Cart
              </button>
            </div>
          </div>
          <div className='border-2 rounded-lg p-4 text-2xl font-bold mb-6'>
            <h1>Listing</h1>
          </div>
          <div className='border-2 rounded-lg p-4'>
            <h1 className='text-2xl font-bold pb-1'>Description</h1>
            <p className='text-lg pb-2'>
              By dreamingdigitally “Gardens by the Sea” is a curated collection by multidisciplinary Canadian artist & architect dreamingdigitally, created in conversation with AI. 2023.
            </p>
            <hr className='mt3 mb-3 w-48 mx-auto font-extrabold lg:w-96' />
            <div>
              <h1 className='font-bold text-2xl mt-6'>Details</h1>
              <div className='flex flex-col lg:flex-row justify-between p-3 pl-7 pr-5 text-lg '>
                <div className='mb-3 lg:mb-0'>
                  <p>Contract Address<br />Token ID<br />Token Standard</p>
                </div>
                <div>
                  <p>0x7faa...592d<br />133<br />ERC-721</p>
                </div>
              </div>
              <div className='flex flex-col lg:flex-row justify-between p-3 pl-7 pr-5 text-lg '>
                <div className='mb-3 lg:mb-0'>
                  <p>Chain<br />Last Updated<br />Creator Earnings</p>
                </div>
                <div>
                  <p>Ethereum<br />3 months ago<br />10%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyIt;
