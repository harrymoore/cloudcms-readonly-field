define(function(require, exports, module) {

    var $ = require("jquery");

    var Alpaca = $.alpaca;

    Alpaca.Fields.ReadonlyTextField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.ReadonlyTextField.prototype
     */
    {
        originalValue: null,

        onChange: function()
        {
            var self = this;

            self.base();

            var value = self.getValue();
            if ("" === value) {
                self.setValue(self._randomValue());
            }
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "readonly-text-field";
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function()
        {
            var self = this;
            var baseStatus = this.base();
            var valInfo = this.validation;
            var value = (this.getValue()+"").toLowerCase();

            if (!self.originalValue) {
                self.originalValue = value;
            }

            return baseStatus;
        },
        
        /**
         * @see Alpaca.Fields.TextField#setup
         */
        setup: function()
        {
            this.base();
        },
 
        _getThisNodeId: function()
        {
            if (Alpaca.globalContext.document) {
                return Alpaca.globalContext.document._doc;
            }

            var parts = window.location.hash.split('/');
            var id = parts[4] || "";
            return id;
        },

        beforeRenderControl: function(model, callback)
        {
            var self = this;

            if (!!self.originalValue) {
                self.readonly = true;
            }
            
            return callback();
        },

        afterRenderControl: function (model, callback) {
            var self = this;

            return callback();
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Readonly Text Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Field value can not be changed once the containing record is created";
        }

        /* end_builder_helpers */
    });

    Alpaca.registerFieldClass("readonly-text", Alpaca.Fields.ReadonlyTextField);

});

