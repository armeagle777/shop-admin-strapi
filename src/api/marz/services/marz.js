'use strict';

/**
 * marz service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::marz.marz');
