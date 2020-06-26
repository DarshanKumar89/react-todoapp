import { AuthenticationError, ValidationError, UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET1 } from '../secret';


export default {
  Query: {
    getUsers: (parent, args, { model: { User }, me }) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      return User.find({});
    },
  },
  Mutation: {
    register: async (parent, { name, email, password }, { model: { User } }) => {

    },
    login: async (parent, { email, password }, { model: { User } }) => {

    },
  },
};
