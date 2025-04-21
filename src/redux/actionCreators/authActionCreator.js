import * as types from '../actionsTypes/authActionTypes';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Navigate } from 'react-router-dom';

const loginUser = (payload) => {
  return {
    type: types.SIGN_IN,
    payload,
  };
};

const logoutUser = () => {
  return {
    type: types.SIGN_OUT,
  };
};
const provider = new GoogleAuthProvider();
// Action creators
export const signInUser = (email, password, setSuccess) => (dispatch) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch(
        loginUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      setSuccess(true);
    })
    .catch(() => {
      alert('Invalid Email or Password!');
    });
};

export const signInWithGoogle = (navigate) => (dispatch) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      dispatch({
        type: types.SIGN_IN,
        payload: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        },
      });
      navigate('/dashboard'); // ✅ Redirect after login
    })
    .catch((error) => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        alert('Account already exists. Please log in.');
        navigate('/login');
      } else {
        console.error(error);
        alert('Google sign-in failed');
      }
    });
};

// export const signUpUser = (name, email, password, setSuccess) => (dispatch) => {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       updateProfile(user, {
//         displayName: name,
//       })
//         .then(() => {
//           dispatch(
//             loginUser({
//               uid: user.uid,
//               name: user.displayName,
//               email: user.email,
//             })
//           );
//           setSuccess(true);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     })
//     .catch((error) => {
//       if (error.code === 'auth/email-already-in-use') {
//         alert('Email already in use!');
//       } else if (error.code === 'auth/invalid-email') {
//         alert('Invalid email!');
//       } else if (error.code === 'auth/weak-password') {
//         alert('Weak Password!');
//       }
//     });
// };

export const signUpUser = (name, email, password, setSuccess, navigate) => (dispatch) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name,
      }).then(() => {
        dispatch({
          type: types.SIGN_IN,
          payload: {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
          },
        });
        setSuccess(true);
      });
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use! Please log in.');
        navigate('/login');
      } else if (error.code === 'auth/invalid-email') {
        alert('Invalid email!');
      } else if (error.code === 'auth/weak-password') {
        alert('Weak Password!');
      }
    });
};

export const SignOutUser = () => (dispatch) => {
  signOut(auth).then(() => {
    dispatch(logoutUser());
    Navigate('/login');
  });
};

export const checkIsLoggedIn = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        loginUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
    }
  });
};

export const signUpWithGoogle = (setSuccess) => (dispatch) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      dispatch(
        loginUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        })
      );

      setSuccess(true);
    })
    .catch((error) => {
      console.error('Google Sign-In error:', error);
      alert('Google Sign-In failed. Please try again.');
    });
};
