import * as types from '../actionsTypes/authActionTypes';
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

export const signUpUser = (name, email, password, setSuccess) => (dispatch) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name,
      })
        .then(() => {
          dispatch(
            loginUser({
              uid: user.uid,
              name: user.displayName,
              email: user.email,
            })
          );
          setSuccess(true);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use!');
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
    Navigate('/');
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
