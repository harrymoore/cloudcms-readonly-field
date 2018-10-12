define(function(require, exports, module) {

    var $ = require("jquery");

    var Alpaca = $.alpaca;

    Alpaca.Fields.ReadonlyTextField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.ReadonlyTextField.prototype
     */
    {
        onChange: function()
        {
            var self = this;
            self.base();
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
            return baseStatus;
        },
        
        /**
         * @see Alpaca.Fields.TextField#setup
         */
        setup: function()
        {
            this.base();
        },
 
        afterRenderControl: function (model, callback) {
            var self = this;

            if (Alpaca.globalContext.document) {
                self.readonly = true;
                self.disable();
            }

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

