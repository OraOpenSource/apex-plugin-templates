// TODO mdsouza: Ask Dan to review this.
// uiw = UIWidget. Shortcut to help handle what "this" is


//Enter widget name. Usually ui.widgetName
$.widget('ui.widgetName', {
  /**
   * Examples are included in this code.
   * They will all assume that the widgetName is 'ui.foo'
   * and it's being applied against jQuery object $('#bar')
   */


  /**
   * Default options
   *
   * @example
   *  As part of Widget initialization: $('#bar').foo({'abc': 'def'});
   *  Setting after: $('#bar').foo('option', 'abc', 'def');
   *  Getting: var myVal = $('#bar').foo('option', 'abc');
   */
  options: {
    ajaxId : '' // This is the ajaxId for the plugin's AJAX functions to reference
  },

  // TODO mdsouza: debugging
  // TODO mdsouza: Add this to all the functions.
  // TODO mdsouza: Need a way to close up (general exception handle)
  /**
   * Starts debugging for a function
   * @param pGroupName Name of group for collapsed debugging
   * @param pThis the "this" object of the calling function
   */
  _debugFunction: function(pGroupName, pThis){
    // TODO mdsouza: Wrapper for Console required

    var uiw = this;
    console.groupCollapsed(uiw._scope + '.' + pGroupName);
    console.log('this:', pThis);

    var
      //This is the function that called this function
      callingFn = arguments.callee.caller,
      // Got following line from: http://stackoverflow.com/questions/914968/inspect-the-names-values-of-arguments-in-the-definition-execution-of-a-javascript
      // Get the name of all the arguments in the function.
      argList = /\(([^)]*)/.exec(callingFn)[1].split(','),
      // Array of arguments passed into the calling function (not this function)
      args = Array.prototype.slice.call(callingFn.arguments);

    //Display each argument
    for(var i = 0, iMax = args.length; i < iMax; i++) {
      if (i === 0){
        console.log('Arguments');
      }

      if (i < argList.length){
        console.log(argList[i].trim() + ':', args[i]);
      }
      else {
        //Unassigned
        console.warn('unassigned:', args[i]);
      }
    }//for


  }, //_debugFunction

  /**
   * Set private widget varables.
   * Thes are not accesible outside of the widget
   */
  _setWidgetVars: function(){
    var uiw = this;

    //No Auto Debug here since _scope is not yet set

    // TODO mdsouza: are we still going to use scope?
    uiw._scope = 'ui.toggleFontSize'; //For debugging

    uiw._values = {
    };

    //Enter elements here for quick reference
    //If jQuery object, prefix with "$"
    uiw._elements = {
      $element : $(uiw.element)
    };
  }, //_setWidgetVars

  /**
   * Create function: Only called the first time the widget is assiocated to the object
   * Will implicitly call the _init function after
   */
  _create: function(){
    var uiw = this;

    uiw._setWidgetVars(); // Set variables (don't modify this)

    var consoleGroupName = uiw._scope + '_create';
    $.console.groupCollapsed(consoleGroupName);
    $.console.log('this:', uiw);

    //CODE that only needs to be run only once when widget is applied to object
    //Ex: uiw._values.fontSize = uiw._elements.$element.css('fontSize');

    $.console.groupEnd(consoleGroupName);
  },//_create

  /**
   * Init function. This function will be called each time the widget is referenced with no parameters
   */
  _init: function(){
    var
      uiw = this,
      // TODO mdsouza: Is there a way to find the current function name in a function?
      consoleGroupName = uiw._scope + '_init';

    _debugFunction(consoleGroupName, uiw);

    //CODE
    //Code here will be run each time the widget is called without params

    $.console.groupEnd(consoleGroupName);
  }, //_init


  /**
   * Public functions here
   *
   * @example
   * //Define public function
   * getBaseFontSize: function(){
   *   var
   *     uiw = this,
   *     consoleGroupName = uiw._scope + 'getBaseFontSize';
   *
   *   $.console.groupCollapsed(consoleGroupName);
   *   $.console.log('this:', uiw);
   *   return uiw._values.baseFontSize;
   * },//getBaseFontSize
   *
   *
   */

  // TODO mdsouza: Example call to AJAX

  // TODO mdsouza: Look into docs on proper destroy function
  /**
   * Removes all functionality associcated with widget
   * In most cases in APEX this won't be necessary
   *
   * @example // TODO mdsouza:
   */
  destroy: function() {
    var uiw = this;
    $.console.log(uiw._scope, 'destroy', uiw);

    //restore the font size back to its original size
    uiw._elements.$element.css('fontSize', uiw._values.baseFontSize);

    $.Widget.prototype.destroy.apply(uiw, arguments); // default destroy
  }//destroy

}); //ui.widgetName
