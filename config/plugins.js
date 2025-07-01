module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {
          // folder: env("CLOUDINARY_FOLDER", "Assets")
        },
        uploadStream: {},
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.example.com"),
        port: env("SMTP_PORT", 587),
        secure: false,
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: "lilit.sargsyan@rambler.ru",
        defaultReplyTo: "lilit.sargsyan@rambler.ru",
      },
    },
  },
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
      contentTypeFilter: {
        mode: "allow",
        uids: {
          "api::customer.customer": true,
        },
        ids: {
          slugify: true,
        },
      },
      plugins: {
        ids: {
          slugify: true,
        },
      },
    },
  },
});
