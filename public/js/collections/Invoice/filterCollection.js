﻿define([
    'Backbone',
    'collections/parent',
    'models/InvoiceModel',
    'constants'
], function (Backbone, Parent, InvoiceModel, CONSTANTS) {
    'use strict';

    var InvoiceCollection = Parent.extend({
        model   : InvoiceModel,
        url     : CONSTANTS.URLS.INVOICE,
        pageSize: CONSTANTS.DEFAULT_THUMBNAILS_PER_PAGE,

        initialize: function (options) {
            var regex = /^sales/;
            var page;

            this.viewType = options.viewType;
            this.contentType = options.contentType;

            this.filter = options.filter;

            if (regex.test(this.contentType)) {
                options.forSales = true;
            }

            if (options && options.contentType && !(options.filter)) {
                options.filter = {};
                if (regex.test(this.contentType)) {
                    options.filter = {
                        forSales: {
                            key  : 'forSales',
                            value: ['true']
                        }
                    };
                } else {
                    options.filter = {
                        forSales: {
                            key  : 'forSales',
                            value: ['false']
                        }
                    };
                }
            }

            if (options && options.url) {
                this.url = options.url;
                delete options.url;
            }

            function _errHandler(models, xhr) {
                if (xhr.status === 401) {
                    Backbone.history.navigate('#login', {trigger: true});
                }
            }

            options = options || {};
            options.error = options.error || _errHandler;
            page = options.page;

            if (page) {
                return this.getPage(page, options);
            }

            this.getFirstPage(options);
        }

        /* showMore: function (options) {
         var that = this;
         var regex = /^sales/;
         var filterObject = options || {};

         filterObject.page = (options && options.page) ? options.page : this.page;
         filterObject.count = (options && options.count) ? options.count : this.namberToShow;
         filterObject.viewType = (options && options.viewType) ? options.viewType : this.viewType;
         filterObject.contentType = (options && options.contentType) ? options.contentType : this.contentType;
         filterObject.filter = options ? options.filter : {};

         if (regex.test(this.contentType)) {
         filterObject.forSales = true;
         }

         if (options && options.contentType && !(options.filter)) {
         options.filter = {};

         if (regex.test(this.contentType)) {
         filterObject.filter.forSales = true;
         }
         }

         this.fetch({
         data   : filterObject,
         waite  : true,
         success: function (models) {
         that.page += 1;
         that.trigger('showmore', models);
         },
         error  : function () {
         App.render({
         type   : 'error',
         message: "Some Error."
         });
         }
         });
         }*/
    });
    return InvoiceCollection;
});