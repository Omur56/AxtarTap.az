


const Contact = () => {
    return (
        <div className="min-h-screen ">
            <div className="max-w-4xl mx-auto p-8 mt-12  mb-12   bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 rounded-3xl shadow-2xl">
  <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Bizimlə əlaqə</h2>

  <p className="text-gray-700 text-lg leading-relaxed text-center mb-10">
    Sizin suallarınıza cavab verməyə hər zaman hazırıq! AxtarTap.az komandası ilə əlaqə saxlamaq üçün aşağıdakı üsullardan istifadə edə bilərsiniz:
  </p>

  <div className="grid md:grid-cols-3 gap-8 text-center justify-items-center">
 
    <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
      <div className="text-green-500 text-5xl mb-4 flex justify-center">📱</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">WhatsApp ilə əlaqə</h3>
      <a
        href="https://wa.me/+994559138099"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 font-medium hover:underline"
      >
        +994 55 913 80 99
      </a>
    </div>

  
    <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
      <div className="text-blue-500 text-5xl mb-4 flex justify-center">📞</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Mobil Nömrə</h3>
      <a href="tel:+994559138099" className="text-blue-600 font-medium hover:underline">
        +994 55 913 80 99
      </a>
    </div>

  
    <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300">
      <div className="text-pink-500 text-5xl mb-4 flex justify-center">✉️</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Elektron Poçt</h3>
      <a href="mailto:omur199624@gmail.com" className="text-pink-600 font-medium hover:underline">
        omur199624@gmail.com
      </a>
    </div>
  </div>

  <div className="mt-10 flex justify-center">
    <span className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-xl hover:scale-105 transition-transform cursor-pointer">
      Bizə Yazın
    </span>
  </div>
</div>

        </div>
    );
};
export default Contact;