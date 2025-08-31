import React from "react";


const Yardim = () => {
    return (
      <div className="min-h-screen ">
<div className="max-w-5xl min-h-screen mx-auto p-8 mt-12 mb-12 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl">
  <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Yardım və Dəstək</h2>

  <p className="text-gray-700 text-lg leading-relaxed text-center mb-10">
    Sizə kömək etmək üçün buradayıq! AxtarTap.az-da elan yerləşdirmə, hesab idarəsi və digər suallarınız üçün aşağıdakı üsullardan istifadə edə bilərsiniz.
  </p>

  <div className="grid md:grid-cols-3 gap-8 text-center">

    <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
      <div className="text-yellow-500 text-5xl mb-4 flex justify-center">❓</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Tez-tez verilən suallar</h3>
      <p className="text-gray-600">
        Elan yerləşdirmə, kateqoriya seçimi və digər proseslər haqqında suallarınızı buradan öyrənin.
      </p>
    </div>

    <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
      <div className="text-green-500 text-5xl mb-4 flex justify-center">💬</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Canlı Dəstək</h3>
      <p className="text-gray-600">
        WhatsApp və ya email vasitəsilə canlı olaraq suallarınıza cavab alabilirsiniz.
      </p>
    </div>

 
    <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
      <div className="text-purple-500 text-5xl mb-4 flex justify-center">📚</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Təlimatlar</h3>
      <p className="text-gray-600">
        Saytın funksionallığını daha yaxşı anlamaq və elan yerləşdirmək üçün addım-addım təlimatlarımızdan istifadə edin.
      </p>
    </div>
  </div>

  <div className="mt-10 flex justify-center">
    <a
      href="https://wa.me/994559138099"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-xl hover:scale-105 transition-transform cursor-pointer"
    >
      Bizə Yazın
    </a>
  </div>
</div>
</div>
    );
};
export default Yardim;