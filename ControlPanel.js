// Copyright 2013-2015, University of Colorado Boulder

/**
 * Control panel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BarMagnet = require( 'EXAMPLE_SIM/example/model/BarMagnet' );
  var BarMagnetNode = require( 'EXAMPLE_SIM/example/view/BarMagnetNode' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var exampleSim = require( 'EXAMPLE_SIM/exampleSim' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var flipPolarityString = require( 'string!EXAMPLE_SIM/flipPolarity' );
  var moveMagnetString = require( 'string!EXAMPLE_SIM/moveMagnet' );
  var addMagnetString = require( 'string!EXAMPLE_SIM/addMagnet' );

  /**
   * Control panel constructor
   * @param {Node} parentNode 
   * @param {BarMagnet} barMagnetModel the entire model for the bar magnet screen
   * @param {ModelViewTransform2} modelViewTransfrom 
   * @param {Object} [options] scenery options for rendering the control panel, see the constructor for options.
   * @constructor
   */
  function ControlPanel( parentNode, barMagnetModel, modelViewTransform, options ) {

    // Demonstrate a common pattern for specifying options and providing default values.
    options = _.extend( {
        xMargin: 10,
        yMargin: 10,
        stroke: 'orange',
        lineWidth: 3
      },
      options );

    var initialNodeList;

    var initialNodeList = parentNode.getChildren();

    // 'Flip Polarity' button
    var flipButton = new TextPushButton( flipPolarityString, {
      font: new PhetFont( 16 ),
      baseColor: 'yellow',
      xMargin: 10,
      listener: function() {
        var orientation = barMagnetModel.barMagnet.orientationProperty.get() + Math.PI;
        barMagnetModel.barMagnet.orientationProperty.set( orientation );
      }
    } );

    // 'Move Magent' button
    var moveMagnetButton = new TextPushButton( moveMagnetString, {
      font: new PhetFont( 16 ),
      baseColor: 'green',
      xMargin: 10,
      listener: function() {
        var maxX = modelViewTransform.getMatrix().translation.x * 2;
        var maxY = modelViewTransform.getMatrix().translation.y * 2;
        var newX = Math.floor(Math.random() * maxX);
        var newY = Math.floor(Math.random() * maxY);
        var newPosition = modelViewTransform.viewToModelXY(newX, newY);
        barMagnetModel.barMagnet.locationProperty.set( newPosition );
      }
    } );

    // 'Add Bar Magnet' button
    var addMagnetButton = new TextPushButton( addMagnetString, {
      font: new PhetFont( 16 ),
      baseColor: 'pink',
      xMargin: 10,
      listener: function () {
        var newBarMagnet = new BarMagnet( new Vector2( 0, 0 ), new Dimension2( 262.5, 52.5 ), 0 );
        parentNode.addChild(new BarMagnetNode(newBarMagnet, modelViewTransform));
      }
    } );

    // 'Reset All' button, resets the sim to its initial state
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        barMagnetModel.reset();

        var childNodes = parentNode.getChildren();
        if (childNodes.length > 2) {
          parentNode.setChildren(childNodes.slice(0,2));
        }
      }
    } );

    // The contents of the control panel
    var content = new VBox( {
      align: 'center',
      spacing: 10,
      children: [
        flipButton,
        moveMagnetButton,
        addMagnetButton,
        resetAllButton
      ]
    } );

    Panel.call( this, content, options );
  }

  exampleSim.register( 'ControlPanel', ControlPanel );

  return inherit( Panel, ControlPanel );
} );