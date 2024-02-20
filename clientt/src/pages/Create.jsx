import React from "react";
import dogPng from "../assets/dog.png";
import "../pages/create.css";
function Create() {
  return (
    <div className=" flex  justify-center  ">
      <img src={dogPng} alt="" className=" h-96 mr-48 mt-40" />
      <div className=" justify-center">
        <div
          className=" text-4xl font-bold text-white ml-32 mt-60"
          id="nft-title"
        >
          Create your NFTs
        </div>
        <div className="mt-10">
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        </div>
        <div className="mt-10">
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        </div>

        <button
          class="h-10 px-6 font-semibold rounded-md border border-slate-200 text-white mt-10"
          type="button"
        >
          Browse
        </button>
      </div>
    </div>
  );
}

export default Create;
