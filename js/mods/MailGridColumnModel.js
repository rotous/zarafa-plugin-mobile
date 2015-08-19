console.log('modding columnmodel')

//var origFn = Zarafa.mail.ui.MailGrid.prototype.constructor;

Zarafa.mail.ui.MailGrid.override({
	initColumnModel : function()
	{
		return new Zarafa.mail.ui.MailGridColumnModel({
			useCompactView: false
		});
	},
	
	/**
	 * Override this function to always use 'compact view'
	 * @param {Object} context
	 * @param {Object} newViewMode
	 * @param {Object} oldViewMode
	 */
	onContextViewModeChange : function(context, newViewMode, oldViewMode)
	{
		this.getColumnModel().setCompactView(true);
	}
	
});

Zarafa.mail.ui.MailGridColumnModel.override({
	/**
	 * Override this function to only show the columns that we need for mobile
	 */
	createCompactColumns : function()
	{
		return [{
			menuDisabled: true,
			header : '<p class="icon_index">&nbsp;</p>',
			dataIndex : 'icon_index',
			width : 24,
			renderer : Zarafa.common.ui.grid.Renderers.icon,
			fixed : true,
			preventRowSelection : true
		},{
			menuDisabled: true,
			header : _('From'),
			dataIndex : 'sent_representing_name',
			width : 160,
			renderer : Zarafa.common.ui.grid.Renderers.sender
		},{
			menuDisabled: true,
			header : _('To'),
			dataIndex : 'display_to',
			width : 160,
			renderer : Zarafa.common.ui.grid.Renderers.to
		},{
			menuDisabled: true,
			header : _('Received'),
			dataIndex : 'message_delivery_time',
			width : 160,
			// Setting the renderer with createDelegate to be able to pass a meta object to the renderer.
			// This way we can add a css-class to the element (used by Selenium tests)
//			renderer : Zarafa.common.ui.grid.Renderers.datetime.createDelegate(null, [{css: 'mail-received'}], true)
			renderer : this.renderers.date.createDelegate(null, [{css: 'mail-received'}], true)
		},{
			menuDisabled: true,
			header : _('Sent'),
			dataIndex : 'client_submit_time',
			width : 160,
			// Setting the renderer with createDelegate to be able to pass a meta object to the renderer.
			// This way we can add a css-class to the element (used by Selenium tests)
			renderer : Zarafa.common.ui.grid.Renderers.datetime.createDelegate(null, [{css: 'mail-sent'}], true)
		}];
	},
	
	renderers: {
		date: function(value, p, record, row, column, store, meta){
			p.css = 'mail_date';
			
			if ( meta && meta.css ){
				p.css += ' ' + meta.css;
			}
			
			return Ext.isDate(value) ? value.format(_('d/m/Y')) : '';
		}
	}
});

