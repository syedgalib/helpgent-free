const Hooks = {
    actions: {
      // key: [
      // 	{ context: null, callback: () => {} },
      // ],
    },

    doAction: function( key, args, rootContext ) {
      const actionKeys = Object.keys( this.actions );

      if ( ! actionKeys.length ) {
        return;
      }

      for ( const actionKey of actionKeys ) {

        if ( actionKey === key ) {
          const actions = this.actions[ actionKey ];

          if ( ! actions.length ) {
            continue;
          }

          for ( const action of actions ) {
            action.callback( args, action.context, rootContext );
          }

        }
      }
    },

    addAction: function( key, callback, context ) {
      const callbacks = ( typeof this.actions[ key ] !== 'undefined' ) ?
      [
        ...this.actions[ key ],
        { context, callback }
      ] :
      [ { context, callback } ];

      this.actions = {
        ...this.actions,
        [key]: callbacks,
      };
    },
 };

window.wpwaxHooks = Hooks;

// Example
// wpwaxHooks.addAction( 'onInit', ( selfContext, rootContext, args ) => {}, this );
// wpwaxHooks.doAction( 'onInit', {}, this );