import { Access } from "payload/config";
import { CollectionBeforeChangeHook, FieldAccess } from "payload/types";
import { ValidationError } from "payload/errors";

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

export const preventEmailChange: CollectionBeforeChangeHook = async ({
  data, // incoming data to update or create with
  operation, // name of the operation ie. 'create', 'update'
  originalDoc, // original document
}) => {
  if (operation === "update") {
    const triedToChangeEmail = data.email && data.email !== originalDoc.email;
    if (triedToChangeEmail) {
      const result = {
        field: "email",
        message: "You cannot change your email",
      };
      throw new ValidationError([result]);
    }
  }

  return data;
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
