﻿define([
    'Backbone',
    'Underscore',
    'text!templates/salesQuotation/list/ListTemplate.html',
    'text!templates/salesQuotation/list/ListTemplate.html',
    'helpers'
], function (Backbone, _, listTemplate, listForWTrack, helpers) {
    'use strict';

    var QuotationListItemView = Backbone.View.extend({
        el: '#listTable',

        initialize: function (options) {
            this.collection = options.collection;
            this.page = options.page ? parseInt(options.page, 10) : 1;
            this.startNumber = (this.page - 1) * options.itemsNumber;
        },

        render: function () {
            this.$el.append(_.template(listForWTrack, {
                quotations      : this.collection.toJSON(),
                startNumber     : this.startNumber,
                currencySplitter: helpers.currencySplitter,
                currencyClass   : helpers.currencyClass
            }));
        }
    });

    return QuotationListItemView;
});
