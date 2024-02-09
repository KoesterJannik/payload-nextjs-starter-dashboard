import { CollectionConfig } from "payload/types";
import {
  adminOnly,
  isAdminFieldLevel,
  registerWithoutRoleOrAdmin,
  selfOrAdminID,
} from "../utils";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: registerWithoutRoleOrAdmin,
    read: selfOrAdminID,
    update: selfOrAdminID,
    delete: adminOnly,
  },

  fields: [
    {
      name: "role",
      type: "text",
      defaultValue: "user",
      access: {
        update: isAdminFieldLevel,
        create: isAdminFieldLevel,
      },
    },
    {
      name: "profileImage",
      type: "relationship",
      relationTo: "media",
      hasMany: false,
    },
  ],
};

export default Users;
