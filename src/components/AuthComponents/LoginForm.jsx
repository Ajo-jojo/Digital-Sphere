// import React from 'react';
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBRow,
//   MDBCol,
//   MDBInput,
// } from 'mdb-react-ui-kit';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { signInUser } from '../../redux/actionCreators/authActionCreator';
// import { Button } from 'bootstrap';

// const LoginForm = () => {
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [success, setSuccess] = React.useState(false);
//   const [error, setError] = React.useState('');

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError(''); // Clear previous errors

//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setError('Please enter a valid email address');
//       return;
//     }

//     dispatch(signInUser(email, password, setSuccess));
//   };

//   React.useEffect(() => {
//     if (success) {
//       navigate('/main');
//     }
//   }, [success, navigate]);

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100">
//       <MDBContainer className="my-5" style={{ maxWidth: '3000px', width: '100%' }}>
//         <MDBCard>
//           <MDBRow className="g-0">
//             <MDBCol md="6">
//               <MDBCardImage
//                 src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
//                 alt="login form"
//                 className="rounded-start w-100 h-100"
//                 style={{ objectFit: 'cover' }}
//               />
//             </MDBCol>

//             <MDBCol md="6" className="d-flex align-items-center">
//               <MDBCardBody className="p-4 p-lg-5">
//                 <div className="d-flex flex-row mb-4">
//                   <span className="h1 fw-bold mb-0">Digital Sphere</span>
//                 </div>

//                 <h6 className="fw-normal mb-4 pb-3" style={{ letterSpacing: '1px' }}>
//                   To keep connected with us please login with your personal info
//                 </h6>

//                 {error && (
//                   <div className="alert alert-danger mb-4" role="alert">
//                     {error}
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                   <MDBInput
//                     wrapperClass="mb-4"
//                     label="Email address"
//                     id="email"
//                     type="email"
//                     size="lg"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                   <MDBInput
//                     wrapperClass="mb-4"
//                     label="Password"
//                     id="password"
//                     type="password"
//                     size="lg"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />

//                   <button
//                     className="mb-4 w-100 bg-black text-white p-2"
//                     color="dark"
//                     size="lg"
//                     type="submit"
//                     style={{
//                       borderRadius: '8px',
//                     }}
//                   >
//                     Sign In
//                   </button>
//                 </form>

//                 <p className="mb-0 text-center" style={{ color: '#393f81' }}>
//                   Don't have an account? <Link to="/register">Register here</Link>
//                 </p>
//               </MDBCardBody>
//             </MDBCol>
//           </MDBRow>
//         </MDBCard>
//       </MDBContainer>
//     </div>
//   );
// };

// export default LoginForm;

import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInUser, signInWithGoogle } from '../../redux/actionCreators/authActionCreator'; // ✅ IMPORTED GOOGLE SIGN-IN
// import { FaGoogle } from 'react-icons/fa'; // ✅ ICON (run `npm install react-icons` if not already done)

const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    dispatch(signInUser(email, password, setSuccess));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle(setSuccess, navigate));
  };

  React.useEffect(() => {
    if (success) {
      navigate('/main'); // ✅ REDIRECT AFTER LOGIN
    }
  }, [success, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <MDBContainer className="my-5" style={{ maxWidth: '3000px', width: '100%' }}>
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                alt="login form"
                className="rounded-start w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </MDBCol>

            <MDBCol md="6" className="d-flex align-items-center">
              <MDBCardBody className="p-4 p-lg-5">
                <div className="d-flex flex-row mb-4">
                  <span className="h1 fw-bold mb-0">Digital Sphere</span>
                </div>

                <h6 className="fw-normal mb-4 pb-3" style={{ letterSpacing: '1px' }}>
                  To keep connected with us please login with your personal info
                </h6>

                {error && (
                  <div className="alert alert-danger mb-4" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Email address"
                    id="email"
                    type="email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Password"
                    id="password"
                    type="password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    className="mb-4 w-100 bg-black text-white p-2"
                    size="lg"
                    type="submit"
                    style={{ borderRadius: '8px' }}
                  >
                    Sign In
                  </button>
                </form>

                <div className="text-center mb-3">or</div>

                <MDBBtn
                  className="mb-4 w-100"
                  color="danger"
                  size="lg"
                  onClick={handleGoogleSignIn}
                >
                  Sign in with Google
                </MDBBtn>

                <p className="mb-0 text-center" style={{ color: '#393f81' }}>
                  Don't have an account? <Link to="/register">Register here</Link>
                </p>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default LoginForm;
