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
        <Container>
<div className="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/YwbVu5mVZd0" allowfullscreen></iframe>
</div>
        </Container>
        <h2 className="text-2xl">Want to learn more about Javascript/Typescript? || Python?</h2>
        <p className="text-gray-500 my-2">Checkout these resources with my JavaScript & Typescript Projects and django framework</p>
        <button className="rounded-bl-none bg-gradient-to-r focus:outline from-gray-500 via-slate-500 to-gray-800 rounded-lg text-white p-2"> <a  href="/myprojects" target="_blank" rel="noopener noreferrer"> Click to View!!!!! My Javascript/Typescript && django Projects</a></button>
      </div>
      <div className="p-2 flex-1">
        <img className="rounded-full size=10"
          src="https://media.licdn.com/dms/image/D4D03AQG7BUxHF4I8Tg/profile-displayphoto-shrink_800_800/0/1701194850229?e=1718236800&v=beta&t=nUpzxtiFS_lQffhlmZeobF8DnFht1AuklPYxZ1L4_yA"
          style={{ width: '400px', height: '400px' }}
        />
      </div>
    </div>
  );
};

export default CallToAction;
