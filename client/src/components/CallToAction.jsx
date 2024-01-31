import React from "react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about Javascript?</h2>
        <p className="text-gray-500 my-2">Checkout these resources with 100 Jaascript Projects</p>
        <button className="rounded-bl-none bg-gradient-to-r focus:outline from-gray-500 via-slate-500 to-gray-800 rounded-lg text-white p-2"> <a  href="https://myportfolioblogapp.onrender.com/" target="_blank" rel="noopener noreferrer">100 JavaScript Projects</a></button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/151984/Originals/javascript-la-gi%20(2).png"
        />
      </div>
    </div>
  );
};

export default CallToAction;
