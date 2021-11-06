import Profile from '../view/profile/view';
import SignIn from '../view/signin/view';
import SignUp from '../view/signup/view';
import { ConstructorInterface } from '../types';
import Homepage from '../view/homepage/view';

const constructor: { [name: string]: ConstructorInterface } = {
  signup: SignUp,
  signin: SignIn,
  profile: Profile,
  homepage: Homepage,
};

export default constructor;
