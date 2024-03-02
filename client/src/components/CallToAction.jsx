import React from "react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about Javascript/Typescript? || django?</h2>
        <p className="text-gray-500 my-2">Checkout these resources with my Javscript & Typescript Projects and django framework</p>
        <button className="rounded-bl-none bg-gradient-to-r focus:outline from-gray-500 via-slate-500 to-gray-800 rounded-lg text-white p-2"> <a  href="/myprojects" target="_blank" rel="noopener noreferrer">My Javascript/Typescript && django Projects</a></button>
      </div>
      <div className="p-7 flex-1">
        <img className="rounded-full"
          src="https://media.licdn.com/dms/image/D4D03AQG7BUxHF4I8Tg/profile-displayphoto-shrink_800_800/0/1701194850229?e=1710979200&v=beta&t=_4pcIIxCbUnBBApuuGUFLhqB1ocxGyilNSYQWWXUERU"
        />
      </div>
    </div>
  );
};

export default CallToAction;
