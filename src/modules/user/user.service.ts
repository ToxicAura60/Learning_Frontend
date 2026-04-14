import bcrypt from 'bcryptjs';
import { Role } from '../../generated/prisma/client';
import userRepository from './user.repository';
import { EmailAlreadyInUseError } from './user.error';
import { RepositoryError, UniqueConstraintViolationError } from '../../errors/repository-error';

const createUser = async ({
  email,
  password,
  role = Role.USER
}: {
  email: string;
  password: string;
  role?: Role;
}) => {
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    return await userRepository.createUser({
      email,
      password: encryptedPassword,
      role,
    });
    
  } catch (error) {
    if(error instanceof RepositoryError) {
      if (error instanceof UniqueConstraintViolationError) {
        if(error.fields?.includes("email")) {
          throw new EmailAlreadyInUseError()
        }
      }
    }
    throw error;
  }
};
 
export default {
  createUser
}