"use strict";

/**
 * customer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::customer.customer",
  ({ strapi }) => ({
    createWithRelations: async (ctx, next) => {
      try {
        const { body } = ctx.request;
        const { customer, phone_code } = { ...body.data };
        const { image, first_name, last_name, phone, address, contacts } = {
          ...customer,
        };

        const newCustomerData = {
          first_name,
          last_name,
          phone_number: phone_code + phone.number,
        };

        const existingCustomer = await strapi.entityService.findMany(
          "api::customer.customer",
          {
            filters: {
              phone_number: phone_code + phone.number,
            },
          }
        );

        if (existingCustomer.length > 0) {
          return ctx.send({
            error: "Հեռ․ արդեն գոյություն ունի",
          });
        }

        if (image) {
          newCustomerData.Avatar = image;
        }
        if (contacts) {
          const createdContacts = await Promise.all(
            contacts.map(
              async (c) =>
                await strapi.entityService.create("api::contact.contact", {
                  data: { phone_number: c.phone_number },
                })
            )
          );
          newCustomerData.contacts = {
            connect: createdContacts.map((c) => c.id),
          };
        }
        if (address.district) {
          const createdAddresses = await Promise.all(
            [address].map(async (a) => {
              const { district, street, index } = a;
              const [countryId, marzId, communityId, settlementId] = district;
              const newAddressData = {
                country: +countryId,
                marz: +marzId,
                community: +communityId,
                street: street,
                index: index,
              };

              if (settlementId) {
                newAddressData.settlement = +settlementId;
              }

              return await strapi.entityService.create("api::address.address", {
                data: newAddressData,
              });
            })
          );

          newCustomerData.addresses = {
            connect: createdAddresses.map((c) => c.id),
          };
        }

        const createdCustomer = await strapi.entityService.create(
          "api::customer.customer",
          {
            data: {
              ...newCustomerData,
            },
          }
        );
        ctx.send(createdCustomer);
      } catch (error) {
        console.log("error::::::>>", error.message);
        ctx.throw(403, error.message);
      }
    },
    editCustomers: async (ctx, next) => {
      try {
        const { body, params } = ctx.request;

        const {
          first_name,
          last_name,
          contacts,
          phone_code,
          phone_number,
          address_id,
          district,
          street,
          index,
        } = { ...body.data };

        const newCustomerData = {
          first_name,
          last_name,
          phone_number: phone_code + phone_number,
        };

        const existingCustomer = await strapi.entityService.findOne(
          "api::customer.customer",
          +params.customerId,
          {}
        );

        if (!existingCustomer) {
          return ctx.send({
            error: "Նման հաճախորդ  գոյություն չունի",
          });
        }

        //Connecting new image Id
        // if (image) {
        //   newCustomerData.Avatar = image;
        // }

        //creating new contacts and connecting to Customer
        if (contacts) {
          const createdContacts = await Promise.all(
            contacts.map(
              async (c) =>
                await strapi.entityService.create("api::contact.contact", {
                  data: { phone_number: c.phone_number },
                })
            )
          );
          newCustomerData.contacts = {
            set: createdContacts.map((c) => c.id),
          };
        }

        //Address
        const [countryId, marzId, communityId, settlementId] = district;
        if (countryId !== null) {
          const newAddressData = {
            country: +countryId,
            marz: +marzId,
            community: +communityId,
            street: street,
            index: index,
          };

          if (settlementId !== null) {
            newAddressData.settlement = +settlementId;
          }

          await strapi.entityService.update(
            "api::address.address",
            address_id,
            {
              data: {
                ...newAddressData,
              },
            }
          );
        }

        const updatedCustomer = await strapi.entityService.update(
          "api::customer.customer",
          +params.customerId,
          {
            data: {
              ...newCustomerData,
            },
          }
        );
        ctx.send(updatedCustomer);
      } catch (error) {
        console.log("error::::::<<<", error.message);
        ctx.throw(403, error.message);
      }
    },
  })
);
