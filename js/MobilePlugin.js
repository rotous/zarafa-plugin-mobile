Ext.namespace('Zarafa.plugins.mobile');

Zarafa.plugins.mobile.MobilePlugin = Ext.extend(Zarafa.core.Plugin, {

	constructor : function(config)
	{
		this.disableZoom();
		
		this.loadStylesheets();
		
		container.on('contextswitch', this.onContextSwitch, this);
	},
	
	disableZoom : function()
	{
		var head = Ext.getHead();
		head.createChild({
			tag: 		'meta',
			content: 	'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
			name:		'viewport'
		});
	},
	
	loadStylesheets : function()
	{
		var stylesheets = [
			'plugins/mobile/css/topbar.css',
			'plugins/mobile/css/toolbar.css',
			'plugins/mobile/css/mainpanel.css'
		];
		var head = Ext.getHead();
		Ext.each(stylesheets, function(stylesheet){
			head.createChild({
				tag: 'link',
				rel: 'stylesheet',
				type: 'text/css',
				href: stylesheet
			});
		});
	},
	
	/**
	 * Adds a class to the body to identify the active context
	 * @param {Object} folder
	 * @param {Object} oldContext
	 * @param {Object} newContext
	 */
	onContextSwitch : function(folder, oldContext, newContext){
		if ( Ext.isDefined(oldContext) ){
			var oldClass = 'zarafa-context-' + oldContext.getName();
			Ext.getBody().removeClass(oldClass);
		}
		if ( Ext.isDefined(newContext) ){
			var newClass = 'zarafa-context-' + newContext.getName();
			Ext.getBody().addClass(newClass);
		}
	}
});

Zarafa.onReady(function() {
	container.registerPlugin(new Zarafa.core.PluginMetaData({
		name : 'mobile',
		displayName : _('Mobile Plugin'),
		allowUserDisable : false,
//		about : Zarafa.plugins.responsive.ABOUT,
		pluginConstructor : Zarafa.plugins.mobile.MobilePlugin
	}));
});
