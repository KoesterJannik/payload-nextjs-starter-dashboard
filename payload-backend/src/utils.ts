import { Access } from "payload/config";
import { FieldAccess } from "payload/types";

export const selfOrAdminID: Access = ({ req: { user } }) => {
  if (user?.role === "admin") {
    return true;
  }
  return {
    id: {
      equals: user?.id,
    },
  };
};

export const ownProfileImageOrAdmin: Access = ({ req: { user } }) => {
  if (user?.role === "admin") {
    return true;
  }
  return {
    id: {
      equals: user?.profileImage?.id,
    },
  };
};

export const registerWithoutRoleOrAdmin: Access = ({ req: { user } }) => {
  if (user?.role === "admin") {
    return true;
  }
  return {
    role: {
      equals: "user",
    },
  };
};

// if you want to see resources only if you are authenticated
export const isAuthenticated: Access = ({ req: { user } }) => {
  if (user) {
    return true;
  }
  return false;
};

// things that only admin can do
export const adminOnly: Access = ({ req: { user } }) => {
  if (user?.role === "admin") {
    return true;
  }
  return false;
};
export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => {
  if (user?.role === "admin") {
    return true;
  }
  return false;
};
