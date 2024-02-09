import { CollectionConfig } from "payload/types";
import {
  isAuthenticated,
  ownProfileImageOrAdmin,
  selfOrAdminID,
} from "../utils";
import payload from "payload";

const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: isAuthenticated,
    read: ownProfileImageOrAdmin,
    update: selfOrAdminID,
    delete: selfOrAdminID,
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        // By specifying `undefined` or leaving a height undefined,
        // the image will be sized to a certain width,
        // but it will retain its original aspect ratio
        // and calculate a height automatically.
        height: undefined,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
  hooks: {
    afterChange: [
      async ({ req, operation, doc }) => {
        if (operation === "create") {
          // get ?profileImage=true
          const profileImage = req.query.profileImage ?? false;
          if (profileImage) {
            if (req.user.profileImage) {
              console.log(
                "User already has a profile image,delete the old one"
              );
            }
            const res = await payload.update({
              collection: "users",
              id: req.user.id,
              data: {
                profileImage: doc.id,
              },
            });
          }

          return doc;
        }
        return doc;
      },
    ],
  },
};

export default Media;
