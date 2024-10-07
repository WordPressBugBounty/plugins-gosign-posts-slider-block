/**
 * BLOCK: posts-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./style.scss";
import "./editor.scss";
import edit from "./edit.js";
import icon from './icon.js';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("gosign/posts-slider-block", {
  title: __("Gosign - Slider Posts Block"),
  icon: icon.postSlider,
  category: "common",
  keywords: [
    __("Posts Block"),
    __("Gosign - slider posts Block"),
    __("Gosign post block")
  ],
  attributes: {
    postsToShow: {
      type: "integer",
      default: 10
    },
    categories: {
      type: "array",
      default: []
    },
    orderBy: {
      type: "string"
    },
    order: {
      type: "string"
    },
    horizontalSpacing: {
      type: "integer",
      default: 0
    },
    showTitle: {
      type: "boolean",
      default: false
    },
    enableDots: {
      type: "boolean",
      default: false
    },
    autoPlay: {
      type: "boolean",
      default: false
    },
    infinite: {
      type: "boolean",
      default: false
    },
    fadeAnimation: {
      type: "boolean",
      default: false
    },
    adaptiveHeight: {
      type: "boolean",
      default: false
    },
    pauseOnHover: {
      type: "boolean",
      default: false
    },
    ladzLoadSlides: {
      type: "boolean",
      default: false
    },
    swipeToSlide: {
      type: "boolean",
      default: false
    },
    verticalSlider: {
      type: "boolean",
      default: false
    },
    focusOnSelect: {
      type: "boolean",
      default: false
    },
    ReverseSlideScroll: {
      type: "boolean",
      default: false
    },
    showArrows: {
      type: "boolean",
      default: false
    },
    variableWidth: {
      type: "boolean",
      default: false
    },
    centerMode: {
      type: "boolean",
      default: false
    },
    responsiveSettings: {
      type: "boolean",
      default: false
    },
    deskdots: {
      type: "boolean",
      default: false
    },
    deskarrows: {
      type: "boolean",
      default: false
    },
    tabdots: {
      type: "boolean",
      default: false
    },
    tabarrows: {
      type: "boolean",
      default: false
    },
    mobdots: {
      type: "boolean",
      default: false
    },
    mobarrows: {
      type: "boolean",
      default: false
    },
    slidesToShow: {
      type: "integer",
      default: 1
    },
    slidesToScroll: {
      type: "integer",
      default: 1
    },
    deskSlidesToShow: {
      type: "integer",
      default: 1
    },
    deskSlidesToScroll: {
      type: "integer",
      default: 1
    },
    tabSlidesToShow: {
      type: "integer",
      default: 1
    },
    tabSlidesToScroll: {
      type: "integer",
      default: 1
    },
    mobSlidesToShow: {
      type: "integer",
      default: 1
    },
    mobSlidesToScroll: {
      type: "integer",
      default: 1
    },
    animationSpeed: {
      type: "integer",
      default: 500
    },
    autoplayDelay: {
      type: "integer",
      default: 3000
    },
    initialSlide: {
      type: "integer",
      default: 0
    },
    cssEase: {
      type: "string",
      default: "ease"
    },
    // verticalSpacing: {
    //   type: "integer",
    //   default: 0
    // },
    enableAnimation: {
      type: "boolean",
      default: false
    },
    displayAuthor: {
      type: "boolean",
      default: false
    },
    displayPostDate: {
      type: "boolean",
      default: false
    },
    displayPostExcerpt: {
      type: "boolean",
      default: false
    },
    displayCountReading: {
      type: "boolean",
      default: false
    },
    align: {
      type: "string"
    },
    blockId: {
      type: "string"
    },
    readMoreText: {
      type: "string",
      default: ""
    },
    sliderDotsClass: {
      type: "string",
      default: ""
    }
  },
  supports: {
    html: false
  },
  selectedCategories: {
    type: "array",
    default: []
  },

  getEditWrapperProps(attributes) {
    const { align } = attributes;
    if (
      "left" === align ||
      "right" === align ||
      "wide" === align ||
      "full" === align
    ) {
      return { "data-align": align };
    }
  },

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   */
  edit,

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   */
  save: function() {
    // Rendering in PHP
    return null;
  }
});
