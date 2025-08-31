import React from 'react'
import Katalog from "../Katalog";
import { Link } from 'react-router-dom'

function CreateCatalogPost() {
    return (
        <div className='mx-auto px-5 px-5 my-auto max-w-[1200px] min-h-[64.5vh] '>
            <Link to="/"> <button className="flex mt-4 items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md">
                              
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Geri
                            </button></Link>
            <Katalog />
            <h1 className=' text-[20px] text-center mt-5 sm:text-[30px] text:sm'>Əlavə edəcəyiniz elana uyğun bölməni seçib elanınızı rahatlıqla yerləşdirə bilərsiniz</h1>
        </div>
    )
}

export default CreateCatalogPost;

