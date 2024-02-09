import { Access, CollectionConfig } from "payload/types";
import { selfOrAdminID } from "../utils";

const Todos: CollectionConfig = {
  slug: "todos",
  access: {
    create: selfOrAdminID,
    read: selfOrAdminID,
    update: selfOrAdminID,
    delete: selfOrAdminID,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "owners",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
    },

    // Email added by default
    // Add more fields as needed
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === "create") {
          if (req.user) {
            data.owners = req.user.id;
            return data;
          }
        }
      },
    ],
  },
};

export default Todos;
