function Hooks() {

	const self = this;

	this.actions = {
		// key: [
		// 	{ context: null, callback: () => {} },
		// ],
	};

	this.doAction = function( key, args, rootContext ) {
		const actionKeys = Object.keys( self.actions );

		if ( ! actionKeys.length ) {
		  return;
		}

		for ( const actionKey of actionKeys ) {

		  if ( actionKey === key ) {
			const actions = self.actions[ actionKey ];

			if ( ! actions.length ) {
			  continue;
			}

			for ( const action of actions ) {
			  console.log( { key, action });
			  action.callback( args, action.context, rootContext );
			}

		  }
		}
	  };

	  this.addAction = function( key, callback, context ) {
		const callbacks = ( typeof self.actions[ key ] !== 'undefined' ) ?
		[
		  ...self.actions[ key ],
		  { context, callback }
		] :
		[ { context, callback } ];

		self.actions = {
		  ...self.actions,
		  [key]: callbacks,
		};
	  };
}

window.wpwaxHooks = new Hooks();

// Example
// wpwaxHooks.addAction( 'onInit', ( selfContext, rootContext, args ) => {}, this );
// wpwaxHooks.doAction( 'onInit', {}, this );