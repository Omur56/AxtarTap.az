import React from 'react'
import Katalog from '../Katalog'
import { Link } from 'react-router'

function CreateCatalogPost() {
    return (
        <div className='mx-auto px-5 px-5 my-auto max-w-[1200px] max-h-[1000px] '>
            <Link to='/CreateCatalogPost'>Geri</Link>
            <Katalog />
            <h1 className=' text-[20px] text-center mt-5 sm:text-[30px] text:sm'>Əlavə edəcəyiniz elana uyğun bölməni seçib elanınızı rahatlıqla yerləşdirə bilərsiniz</h1>
        </div>
    )
}

export default CreateCatalogPost;

