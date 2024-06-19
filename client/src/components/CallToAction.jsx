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

        </Container>
        <h2 className="text-2xl">Want to learn more about Javascript/Typescript? || Python?</h2>
        <p className="text-gray-500 my-2">Checkout these resources with my JavaScript & Typescript Projects and django framework</p>
        <button className="rounded-bl-none bg-gradient-to-r focus:outline from-gray-500 via-slate-500 to-gray-800 rounded-lg text-white p-2"> <a  href="/myprojects" target="_blank" rel="noopener noreferrer"> Click to View!!!!! My Javascript/Typescript && django Projects</a></button>
      </div>
      <div className="p-2 flex-1">
        <img className="rounded-full size=8"
          src="https://scontent.fnbo13-1.fna.fbcdn.net/v/t39.30808-1/401462089_6946329178807166_8955888725925277191_n.jpg?stp=c0.0.200.200a_dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEl2tch92bTMBVxgaEEGcqdG5JGFSgMCZYbkkYVKAwJlq9WIRk5i221Wa71qGf5YqjTFgG068DT_mJYiYfgDyPt&_nc_ohc=SwSew-PFaSgQ7kNvgHe-Clc&_nc_ht=scontent.fnbo13-1.fna&oh=00_AYBOTM_zS18eBoKwWKfW5eoyoy2HfbLLEWNYdZjSyj5Kzw&oe=66791CDB"
          style={{ width: '300px', height: '300px' }}
        />
      </div>
    </div>
  );
};

export default CallToAction;
