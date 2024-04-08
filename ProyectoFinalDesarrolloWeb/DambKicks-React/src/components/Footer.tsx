import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='bg-dark text-center text-white'>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4'>
          <MDBBtn outline color="light" floating className='m-1' href='https://www.facebook.com/LUSTMEXICOSNEAKERSTORE' role='button'>
            <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" width="25" />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://www.instagram.com/lust.mexico/' role='button'>
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="25" />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://www.youtube.com/@Complex' role='button'>
          <img src="https://cdn-icons-png.flaticon.com/512/3670/3670147.png" width="25" />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='https://mail.google.com/mail/u/1/#inbox' role='button'>
          <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" width="25" />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://github.com/BraulioNavarrete' role='button'>
          <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" width="25" />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum=0' role='button'>
          <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" width="25" />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2022 Copyright : 
        <a className='text-white' href='http://moiseshdz.com/index.html'>
            &lt;moiseshdz.com&gt;
        </a>
      </div>
    </MDBFooter>
  );
}