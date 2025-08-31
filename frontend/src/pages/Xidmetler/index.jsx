import React from "react";

function Xidmetler() {
    return (
    <div className="min-h-screen">
<div className="max-w-5xl mx-auto p-8 mt-12 mb-12 min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl">
  <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Xidmətlərimiz</h2>

  <p className="text-gray-700 text-lg leading-relaxed text-center mb-10">
    AxtarTap.az istifadəçilərinə geniş çeşidli xidmətlər təqdim edir ki, həm elan yerləşdirmə, həm də məhsul alqı-satqısı rahat və təhlükəsiz olsun.
  </p>

  <div className="grid md:grid-cols-3 gap-8 text-center">
   
    <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
      <div className="text-blue-500 text-5xl mb-4 flex justify-center">📝</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Elan yerləşdirmə</h3>
      <p className="text-gray-600">
        İstənilən kateqoriya üzrə tez və asan elan yerləşdirin. Məhsullarınızı geniş auditoriyaya təqdim edin.
      </p>
    </div>

   
    <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
      <div className="text-green-500 text-5xl mb-4 flex justify-center">🔒</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Təhlükəsiz alqı-satqı</h3>
      <p className="text-gray-600">
        Saytda bütün əməliyyatlar etibarlı və izlənilə bilən şəkildə həyata keçirilir.
      </p>
    </div>

  
    <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
      <div className="text-purple-500 text-5xl mb-4 flex justify-center">🏢</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Biznes və fərdi istifadəçi dəstəyi</h3>
      <p className="text-gray-600">
        Həm fərdlər, həm də şirkətlər üçün elan yerləşdirmə və məhsul tanıtımı üçün tam dəstək təqdim olunur.
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
      Bizimlə əlaqə
    </a>
  </div>
</div>

    </div>
    );
}
export default Xidmetler;