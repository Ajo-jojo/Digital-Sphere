// import React from 'react'
// import { useDispatch } from 'react-redux';
// import { signUpUser } from '../../redux/actionCreators/authActionCreator';
// import { useNavigate } from 'react-router-dom';

// const RegisterForm = () => {
//     const [name, setName] = React.useState('');
//     const [email, setEmail] = React.useState('');
//     const [password, setPassword] = React.useState('');
//     const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
//     const [success,setSuccess] = React.useState(false);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if(!name || !email || !password || !passwordConfirmation){
//             alert("please fill in all fields");
//             return;
//         }
//         if(password != passwordConfirmation){
//             alert("password do not match");
//             return;
//         }
//         dispatch(signUpUser(name,email,password,setSuccess));
//     };

//     React.useEffect(()=>{
//         if(success){
//             navigate('/dashboard')
//         }
//     },[success])

//   return (
//     <form autoComplete='off' onSubmit={handleSubmit}>

//             <div className="form-group my-2">
//                 <input type="text" name="name" className="form-control" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
//             </div>

//             <div className="form-group my-2">
//                 <input type="email" name="email" className="form-control" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
//             </div>
//             <div className="form-group my-2">
//                 <input type="password" name="password" className="form-control" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
//             </div>

//             <div className="form-group my-2">
//                 <input type="password" name="passwordConfirmation" className="form-control" placeholder='Re-type Password' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
//             </div>

//             <button type="submit" className="btn btn-primary my-2 form-control">Register</button>
//         </form>
//   )
// }

// export default RegisterForm

// import React from 'react';
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBRow,
//   MDBCol,
//   MDBIcon,
//   MDBInput
// } from 'mdb-react-ui-kit';
// import './RegisterStyle.css';
// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { signInUser } from '../../redux/actionCreators/authActionCreator';
// import { useNavigate } from 'react-router-dom';

// const RegisterForm = () => {
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
//   const [name, setName] = React.useState('');
//   const [success, setSuccess] = React.useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email || !password || !name || !passwordConfirmation) {
//       alert('Please fill in all fields');
//       return;
//     }

//     dispatch(signInUser(email, password, setSuccess));
//   };

//   React.useEffect(() => {
//     if (success) {
//       navigate('/dashboard');
//     }
//   }, [success, navigate]);

//   return (
//     <div >
// <br /><br /><br /><br />
{
  /* <MDBContainer className="my-5 justify-content-center align-items-center" style={{ width: '90%', height: '50vh' }}>
      <MDBCard style={{ width: '175%', height: '175%', marginLeft: '-25%' }}>
        <MDBRow className="g-0">
          <MDBCol md="6"> */
}
//             <MDBCardImage
//               src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
//               alt="login form"
//               className="rounded-start w-100"
//               style={{ height: '77.8vh' }}
//             />
//           </MDBCol>

//           <MDBCol md="6">
// <MDBCardBody className="d-flex flex-column" style={{ marginTop: '1%' }}>
//   <div className="d-flex flex-row mt-2">
//     {/* <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} /> */}
//     <span className="h2 fw-bold mb-0">Digital Sphere</span>
//   </div>

//   <h6 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px', marginLeft: '1%' }}>
//   Enter your personal details and start journey with us
//   </h6>

// <MDBInput
//   wrapperClass="mb-4"
//   placeholder="Name"
//   id="nameFormControlLg"  // Make the id unique
//   type="name"
//   size="lg"
//   value={name}
//   onChange={(e) => setName(e.target.value)}
//   />

//   <MDBInput
//   wrapperClass="mb-4"
//   placeholder="Email address"
//   id="emailFormControlLg"  // Make the id unique
//   type="email"
//   size="lg"
//   value={email}
//   onChange={(e) => setEmail(e.target.value)}
//   />

//   <MDBInput
//   wrapperClass="mb-4"
//   placeholder="Password"
//   id="passwordFormControlLg"  // Make the id unique
//   type="password"
//   size="lg"
//   value={password}
//   onChange={(e) => setPassword(e.target.value)}
//   />

//   <MDBInput
//   wrapperClass="mb-4"
//   placeholder="Re-type Password"
//   id="passwordConfirmationFormControlLg"  // Make the id unique
//   type="password"
//   size="lg"
//   value={passwordConfirmation}
//   onChange={(e) => setPasswordConfirmation(e.target.value)}
//   />

// <MDBBtn className="mb-4 px-5" color="dark" size="lg" type="submit" noRipple onClick={handleSubmit}>
//   Sign Up
// </MDBBtn>
//               {/* <a className="small text-muted" href="#!">
//                 Forgot password?
//               </a> */}
//               <br />
//               <p className="mb-5 pb-lg-2" style={{ color: '#393f81',marginTop:'-5%' }}>
//                 Already have an account? <Link to="/login">Login</Link>
//                 {/* <a href="/login" style={{ color: '#393f81' }}>
//                   Login here
//                 </a> */}
//               </p>
//             </MDBCardBody>
//           </MDBCol>
//         </MDBRow>
//       </MDBCard>
//     </MDBContainer>
//     </div>
//   );
// };

// export default RegisterForm;

import React from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';
import './RegisterStyle.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/actionCreators/authActionCreator';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !passwordConfirmation) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== passwordConfirmation) {
      alert('Passwords do not match');
      return;
    }
    dispatch(signUpUser(name, email, password, setSuccess));
  };

  React.useEffect(() => {
    if (success) {
      navigate('/dashboard');
    }
  }, [success, navigate]);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <MDBContainer
        className="my-5 justify-content-center align-items-center"
        style={{ width: '90%', height: '50vh' }}
      >
        <MDBCard style={{ width: '175%', height: '175%', marginLeft: '-25%' }}>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                alt="login form"
                className="img-fluid"
                style={{ height: '77.8vh' }}
              />
            </MDBCol>
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column" style={{ marginTop: '1%' }}>
                <div className="d-flex flex-row mt-2">
                  {/* <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} /> */}
                  <span className="h2 fw-bold mb-0">Digital Sphere</span>
                </div>

                <h6
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: '1px', marginLeft: '1%' }}
                >
                  Enter your personal details and start journey with us
                </h6>
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Name"
                    id="nameFormControlLg" // Make the id unique
                    type="name"
                    size="lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Email address"
                    id="emailFormControlLg" // Make the id unique
                    type="email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Password"
                    id="passwordFormControlLg" // Make the id unique
                    type="password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Re-type Password"
                    id="passwordConfirmationFormControlLg" // Make the id unique
                    type="password"
                    size="lg"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />

                  {/* <MDBInput
                  placeholder="Name"
                  id="nameFormControlLg"
                  type="text"
                  size="lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <MDBInput
                  placeholder="Email address"
                  id="emailFormControlLg"
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  placeholder="Password"
                  id="passwordFormControlLg"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <MDBInput
                  placeholder="Re-type Password"
                  id="passwordConfirmationFormControlLg"
                  type="password"
                  size="lg"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                /> */}

                  {/* <MDBBtn color="primary" size="lg" block type="submit" style={{textAlign:'center'}}>
                  Register
                </MDBBtn> */}
                  <MDBBtn className="mb-4 px-5" color="dark" size="lg" type="submit" noRipple>
                    Register
                  </MDBBtn>
                </form>
                <p className="text-center mt-3 mb-0">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default RegisterForm;
