import { prisma } from "../../client";
import { UniqueConstraintViolationError } from "../../errors/repository-error";
import { Prisma, Role } from '../../generated/prisma/client';

const getUserByEmail = async(
  email: string,
) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

const createUser = async ({
  email,
  password,
  role = Role.USER
}: {
  email: string;
  password: string;
  role: Role;
}) => {
  try {
    return await prisma.user.create({
      data: {
        email,
        password,
        role
      }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new UniqueConstraintViolationError((error?.meta?.driverAdapterError as any)?.cause?.constraint?.fields)
      }
    }
    throw error;
  }
 
}
export default {
  getUserByEmail,
  createUser
}