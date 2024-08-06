import React from "react";
import { Container } from "react-bootstrap";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3  border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <Container>
        <div className="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/kdPxheeDF4g?si=A5CuY8krjjeoVYLi" allowfullscreen></iframe>
</div>
        </Container>
        <h2 className="text-2xl text-black">Want to learn more about Javascript: Typescript? && Python?</h2>
        <p className="text-gray-500 my-2 text-black">Checkout these resources with my JavaScript & Typescript Projects and django framework</p>
        <button className="rounded-bl-none bg-gradient-to-r focus:outline from-gray-500 via-slate-500 to-gray-800 rounded-lg text-white p-2 text-black"> <a  href="/myprojects" target="_blank" rel="noopener noreferrer"> Click to View!!!!! My Javascript/Typescript && django Projects</a></button>
      </div>
      <div className="p-2 flex-1">
        <img className="rounded-full size=8"
          src="https://avatars.githubusercontent.com/u/123101284?s=400&u=a04dfe5638c3e7c0baa461bfe87c5a4c1ef123c2&v=4"
          style={{ width: '300px', height: '300px' }}
        />
      </div>
    </div>
  );
};

export default CallToAction;
