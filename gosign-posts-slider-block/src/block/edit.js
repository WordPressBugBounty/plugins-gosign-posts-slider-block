/**
 * External dependencies
 */
import isUndefined from "lodash/isUndefined";
import pickBy from "lodash/pickBy";
import classnames from "classnames";
import Slider from "react-slick";
// import get from 'lodash/get';
// import pick from 'lodash/pick';

// import imagesLoaded from "imagesloaded";

/**
 * WordPress dependencies
 */

const { Component, Fragment } = wp.element;
const {
  PanelBody,
  Placeholder,
  QueryControls,
  RangeControl,
  Spinner,
  ToggleControl,
  BaseControl,
  SelectControl,
  TextControl,
} = wp.components;

const { __ } = wp.i18n;
import { decodeEntities } from "@wordpress/html-entities";
import { dateI18n, format, __experimentalGetSettings } from "@wordpress/date";
const { InspectorControls, BlockAlignmentToolbar, BlockControls } = wp.editor;
const { withSelect } = wp.data;

class LatestPostsEdit extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      attributes,
      categoriesList,
      setAttributes,
      latestPosts,
      authors
    } = this.props;
    const {
      align,
      order,
      orderBy,
      categories,
      postsToShow,
      horizontalSpacing,
      blockId,
      displayAuthor,
      displayPostDate,
      displayPostExcerpt,
      displayCountReading,
      readMoreText,
      enableDots,
      autoPlay,
      infinite,
      slidesToShow,
      slidesToScroll,
      animationSpeed,
      autoplayDelay,
      initialSlide,
      fadeAnimation,
      ladzLoadSlides,
      adaptiveHeight,
      pauseOnHover,
      swipeToSlide,
      verticalSlider,
      focusOnSelect,
      ReverseSlideScroll,
      showArrows,
      variableWidth,
      centerMode,
      cssEase,
      showTitle,
      sliderDotsClass,
      responsiveSettings,
      deskdots,
      deskarrows,
      tabdots,
      tabarrows,
      mobdots,
      mobarrows,
      deskSlidesToShow,
      deskSlidesToScroll,
      tabSlidesToShow,
      tabSlidesToScroll,
      mobSlidesToShow,
      mobSlidesToScroll
    } = attributes;

    if (blockId == undefined) {
      setAttributes({
        blockId:
          "post-slider-block-" +
          Math.random()
            .toString(36)
            .substr(2, 9)
      });
    }

    //slider settings
    var settings = {
      dots: enableDots,
      infinite: infinite,
      slidesToShow: slidesToShow,
      slidesToScroll: slidesToScroll,
      fade: fadeAnimation,
      autoplay: autoPlay,
      speed: animationSpeed,
      autoplaySpeed: autoplayDelay,
      initialSlide: initialSlide,
      lazyLoad: ladzLoadSlides,
      adaptiveHeight: adaptiveHeight,
      pauseOnHover: pauseOnHover,
      swipeToSlide: swipeToSlide,
      vertical: verticalSlider,
      focusOnSelect: focusOnSelect,
      rtl: ReverseSlideScroll,
      arrows: showArrows,
      variableWidth: variableWidth,
      centerMode: centerMode,
      cssEase: cssEase,
      dotsClass: "slick-dots "+sliderDotsClass,
    };

    if(responsiveSettings){
      settings["responsive"] = [
       {
        breakpoint : 1024,
        settings: {
          slidesToShow: deskSlidesToShow,
          slidesToScroll: deskSlidesToScroll,
          arrows: deskarrows,
          dots: deskdots
        }
       },
       {
        breakpoint : 600,
        settings: {
          slidesToShow: tabSlidesToShow,
          slidesToScroll: tabSlidesToScroll,
          arrows: tabarrows,
          dots: tabdots
        }
       },
       {
        breakpoint : 480,
        settings: {
          slidesToShow: mobSlidesToShow,
          slidesToScroll: mobSlidesToScroll,
          arrows: mobarrows,
          dots: mobdots
        }
       }
      ]     
    }

    const onCategorySelected = (isChecked, checkBoxId) => {
      categories.map((category, index) => {
        if (category == checkBoxId && isChecked == false) {
          categories.splice(index, 1);
          setAttributes({ categories: [...categories] });
          return;
        }
      });
      if (isChecked) {
        categories.push(checkBoxId);
        setAttributes({ categories: [...categories] });
        return;
      }
    };

    const showCheckboxes = () => {
      if (categoriesList != null)
        return categoriesList.map(cat => {
          return (
            <CheckboxControl
              label={cat.name}
              slug={cat.slug}
              instanceId={cat.id}
              checked={categories.indexOf(cat.id) !== -1 ? true : false}
              onChange={(isChecked, props) => {
                onCategorySelected(isChecked, props);
              }}
            />
          );
        });
    };

  
    const ShowSliderSettings = () => {
      return(
        <Fragment>
          <ToggleControl
            label={__("Show Dots")}
            checked={enableDots}
            onChange={value => setAttributes({ enableDots: value })}
          />
          <ToggleControl
            label={__("Auto Play")}
            checked={autoPlay}
            onChange={value => setAttributes({ autoPlay: value })}
          />
          <ToggleControl
            label={__("Infinite Slides Loop")}
            checked={infinite}
            onChange={value => setAttributes({ infinite: value })}
          />
          <ToggleControl
            label={__("Slides Fade Animation")}
            checked={fadeAnimation}
            onChange={value => setAttributes({ fadeAnimation: value })}
          />
          <ToggleControl
            label={__("LazyLoad Slide Images")}
            checked={ladzLoadSlides}
            onChange={value => setAttributes({ ladzLoadSlides: value })}
          />
          <ToggleControl
            label={__("Adaptive Height of slides")}
            checked={adaptiveHeight}
            onChange={value => setAttributes({ adaptiveHeight: value })}
          />
          <ToggleControl
            label={__("Pause Slides on hover")}
            checked={pauseOnHover}
            onChange={value => setAttributes({ pauseOnHover: value })}
          />
          <ToggleControl
            label={__("Swipe to Slide")}
            checked={swipeToSlide}
            onChange={value => setAttributes({ swipeToSlide: value })}
          />
          <ToggleControl
            label={__("Vertical Slider")}
            checked={verticalSlider}
            onChange={value => setAttributes({ verticalSlider: value })}
          />
          <ToggleControl
            label={__("Focus on Select")}
            checked={focusOnSelect}
            onChange={value => setAttributes({ focusOnSelect: value })}
          />
          <ToggleControl
            label={__("Reverses the slide order")}
            checked={ReverseSlideScroll}
            onChange={value => setAttributes({ ReverseSlideScroll: value })}
          />
          <ToggleControl
            label={__("Variable width of slides")}
            checked={variableWidth}
            onChange={value => setAttributes({ variableWidth: value })}
          />
          <ToggleControl
            label={__("Show Arrows")}
            checked={showArrows}
            onChange={value => setAttributes({ showArrows: value })}
          />
          <ToggleControl
            label={__("centered view slide with partial prev/next slides")}
            checked={centerMode}
            onChange={value => setAttributes({ centerMode: value })}
          />
          <RangeControl
            label={__("Slides to Show")}
            value={slidesToShow}
            onChange={value => setAttributes({ slidesToShow: value })}
            min={1}
            max={latestPosts ? latestPosts.length : 0}
          />
          <RangeControl
            label={__("Slides to Scroll")}
            value={slidesToScroll}
            onChange={value => setAttributes({ slidesToScroll: value })}
            min={1}
            max={latestPosts ? latestPosts.length : 0 }
          />
          <RangeControl
            label={__("Horizontal spacing between Slides")}
            value={horizontalSpacing}
            onChange={value => setAttributes({ horizontalSpacing: value })}
            min={0}
            max={100}
          />
          <RangeControl
            label={__("Scroll Animation Speed")}
            value={animationSpeed}
            onChange={value => setAttributes({ animationSpeed: value })}
            min={1}
            max={10000}
          /> 
          <RangeControl
            label={__("Autoplay Scroll Delay")}
            value={autoplayDelay}
            onChange={value => setAttributes({ autoplayDelay: value })}
            min={1}
            max={20000}
          />
          <RangeControl
            label={__("Initial Slide to Show")}
            value={initialSlide}
            onChange={value => setAttributes({ initialSlide: value })}
            min={1}
            max={latestPosts ? latestPosts.length - 1 : 0}
          />
          <SelectControl
            label="Scrolling Animation"
            value={cssEase}
            options={[
              { label: "linear", value: "linear" },
              { label: "ease", value: "ease" },
              { label: "ease-in ", value: "ease-in" },
              { label: "ease-out", value: "ease-out"},
              { label: "ease-in-out", value: "ease-in-out" }
            ]}
            onChange={cssEase => {
              setAttributes({ cssEase });
            }}
          /> 
          <ToggleControl
            label={__("Enable Responsive Settings")}
            checked={responsiveSettings}
            onChange={value => setAttributes({ responsiveSettings: value })}
          />
          {responsiveSettings && (
            <ShowResponsiveSettings />
          )}
          <TextControl
              label="Add class to Slider Dots"
              help="Enter class for Slider Dots"
              value={sliderDotsClass}
              Placeholder={sliderDotsClass}
              onChange={text => setAttributes({ sliderDotsClass: text })}
            />
        </Fragment >
      );
    }

    const ShowResponsiveSettings = () => {
      return(
        <Fragment>
          <PanelBody
            title="Desktop View(Breakpoint 1024)"
            icon="desktop"
            initialOpen={true}
          >
            <ToggleControl
              label={__("Show Dots")}
              checked={deskdots}
              onChange={value => setAttributes({ deskdots: value })}
            />
            <ToggleControl
              label={__("Show Arrows")}
              checked={deskarrows}
              onChange={value => setAttributes({ deskarrows: value })}
            />
            <RangeControl
              label={__("Slides to Show")}
              value={deskSlidesToShow}
              onChange={value => setAttributes({ deskSlidesToShow: value })}
              min={1}
              max={latestPosts ? latestPosts.length : 0}
            />
            <RangeControl
              label={__("Slides to Scroll")}
              value={deskSlidesToScroll}
              onChange={value => setAttributes({ deskSlidesToScroll: value })}
              min={1}
              max={latestPosts ? latestPosts.length : 0 }
            />
          </PanelBody>
          <PanelBody
            title="Tablet View(Breakpoint 600)"
            icon="tablet"
            initialOpen={true}
          >
            <ToggleControl
              label={__("Show Dots")}
              checked={tabdots}
              onChange={value => setAttributes({ tabdots: value })}
            />
            <ToggleControl
              label={__("Show Arrows")}
              checked={tabarrows}
              onChange={value => setAttributes({ tabarrows: value })}
            />
            <RangeControl
              label={__("Slides to Show")}
              value={tabSlidesToShow}
              onChange={value => setAttributes({ tabSlidesToShow: value })}
              min={1}
              max={latestPosts ? latestPosts.length : 0}
            />
            <RangeControl
              label={__("Slides to Scroll")}
              value={tabSlidesToScroll}
              onChange={value => setAttributes({ tabSlidesToScroll: value })}
              min={1}
              max={latestPosts ? latestPosts.length : 0 }
            />
          </PanelBody>
            <PanelBody
            title="Mobile View(Breakpoint 480)"
            icon="smartphone"
            initialOpen={true}
          >
            <ToggleControl
              label={__("Show Dots")}
              checked={mobdots}
              onChange={value => setAttributes({ mobdots: value })}
            />
            <ToggleControl
              label={__("Show Arrows")}
              checked={mobarrows}
              onChange={value => setAttributes({ mobarrows: value })}
            />
            <RangeControl
              label={__("Slides to Show")}
              value={mobSlidesToShow}
              onChange={value => setAttributes({ mobSlidesToShow: value })}
              min={1}
              max={latestPosts ? latestPosts.length : 0}
            />
            <RangeControl
              label={__("Slides to Scroll")}
              value={mobSlidesToScroll}
              onChange={value => setAttributes({ mobSlidesToScroll: value })}
              min={1}
              max={latestPosts ? latestPosts.length : 0 }
            />
          </PanelBody>   
        </Fragment>
      )
    }
    


    const showdetailLayoutSettings = () => {
        return (
          <Fragment>
            <ToggleControl
              label={__("Show Post Title")}
              checked={showTitle}
              onChange={value => setAttributes({ showTitle: value })}
            />
            <ToggleControl
              label={__("Show Post Author")}
              checked={displayAuthor}
              onChange={value => setAttributes({ displayAuthor: value })}
            />
            <ToggleControl
              label={__("Show Post Date")}
              checked={displayPostDate}
              onChange={value => setAttributes({ displayPostDate: value })}
            />
            <ToggleControl
              label={__("Show Post Excerpt")}
              checked={displayPostExcerpt}
              onChange={value => setAttributes({ displayPostExcerpt: value })}
            />
            <ToggleControl
              label={__("Show Contiue Reading Link")}
              checked={displayCountReading}
              onChange={value => setAttributes({ displayCountReading: value })}
            />
            <TextControl
              label="Read More Link Text"
              help="Enter Read More Link Text"
              value={readMoreText}
              Placeholder={readMoreText}
              onChange={text => setAttributes({ readMoreText: text })}
            />
          </Fragment>
        );
    };

    const inspectorControls = (
      <InspectorControls>
        <PanelBody title={__("Posts Slider Settings")}>
          <QueryControls
            {...{ order, orderBy }}
            numberOfItems={postsToShow}
            categoriesList={categoriesList}
            selectedCategoryId={categories}
            onOrderChange={value => setAttributes({ order: value })}
            onOrderByChange={value => setAttributes({ orderBy: value })}
            onNumberOfItemsChange={value =>
              setAttributes({ postsToShow: value })
            }
          />
          {showdetailLayoutSettings()}
        </PanelBody>
        <PanelBody
          title="Slider Settings"
          icon="admin-settings"
          initialOpen={true}
        >
          <ShowSliderSettings />
        </PanelBody>
        <PanelBody
          title="Posts Categories"
          icon="category"
          initialOpen={true}
        >
          {showCheckboxes()}
        </PanelBody>
      </InspectorControls>
    );

    const hasPosts = Array.isArray(latestPosts) && latestPosts.length;
    if (!hasPosts) {
      return (
        <Fragment>
          {inspectorControls}
          <Placeholder icon="admin-post" label={__("Slider Posts")}>
            {!Array.isArray(latestPosts) ? <Spinner /> : __("No posts found.")}
          </Placeholder>
        </Fragment>
      );
    }

    const displayPosts =
      latestPosts.length > postsToShow
        ? latestPosts.slice(0, postsToShow)
        : latestPosts;

    let tempStyle = "";
    if (horizontalSpacing >= 0) {
      tempStyle += `.${blockId} .slick-slide {`;
      tempStyle += "padding: 0  " + horizontalSpacing+"px";
      tempStyle += "}";
      tempStyle += ` .${blockId} .slick-list {`;
      tempStyle += "margin: 0 -" + horizontalSpacing+"px";
      tempStyle += "}";
    }
    const dateFormat = __experimentalGetSettings().formats.date;
    // console.log(URL());
    function displayImage( { image } ) {
      if(image)
        return (<img src={image.source_url} />);
      else 
        return(<Placeholder label="Placeholder"/>); 
    }
  
    const DisplayPostImage = withSelect( ( select, ownProps ) => {
        const { getMedia  } = select( 'core' );
        const { imageID } = ownProps;
        return {
          image: imageID ? getMedia( imageID ) : null,
        };
    } )( displayImage );

    const DisplayAuthorInfo = props => {
      const { authorID } = props;
      var author = authors.find(function(el){
        return el.id == authorID;
      });

      if(author){
        return(
          <a href={author.link} target="_blank">
            <span>{decodeEntities(author.name)}</span>
          </a>
        );
      }
      return "";
     
    }

    const showGalleryContent = post => {
        return (
          <div
            className={classnames(this.props.className, "gallery-image", {})}
          >
            <div class="slider-image-container">
              <a href={post.link} target="_blank">
                <DisplayPostImage imageID={post.featured_media}/>
              </a>
            </div>
            <div className="box-content">
              {showTitle && (
                <h3 className="title">
                  <a href={post.link} target="_blank">
                    {decodeEntities(post.title.rendered.trim()) ||
                      __("(Untitled)")}
                  </a>
                </h3>
              )}
              <div className="author-and-date">
                {displayAuthor && authors.length !== 0 && (
                  <DisplayAuthorInfo authorID={post.author} />
                )}
                {displayPostDate && post.date_gmt && (
                  <span>
                    {displayPostDate && displayAuthor && " . "}
                    <time
                      dateTime={format("c", post.date_gmt)}
                      className={`${this.props.className}__post-date`}
                    >
                      {dateI18n(dateFormat, post.date_gmt)}
                    </time>
                  </span>
                )}
              </div>
              {displayPostExcerpt && post.excerpt && (
                <p>
                  {decodeEntities(post.excerpt.rendered).replace(
                    /(<([^>]+)>)/gi,
                    ""
                  )}
                </p>
              )}
              {displayCountReading && (
                <a href={post.link} className="readmore">
                  {readMoreText}
                </a>
              )}
            </div>
          </div>
        );
    };

    return (
      <Fragment>
        {inspectorControls}
        <BlockControls>
          <BlockAlignmentToolbar
            value={align}
            onChange={nextAlign => {
              setAttributes({ align: nextAlign });
            }}
            controls={["center", "full"]}
          />
        </BlockControls>
        <style>{tempStyle}</style>
        <Slider {...settings}
          className={classnames(this.props.className, {
            "grid-post-parent-gosign": true
          },"detail_layout",blockId)}
        >
          {displayPosts.map((post, i) => (
            <SliderItem
              className={classnames(this.props.className, {
                "grid-item": true,
                [`grid-item-${i + 1}`]: true
              })}
              instanceId={i}
              post={post}
              categories={categoriesList}
            >
              {showGalleryContent(post)}
            </SliderItem>
          ))}
        </Slider >
      </Fragment>
    );
  }
}

export default withSelect((select, props) => {
  const { postsToShow, order, orderBy, categories } = props.attributes;
  const { getEntityRecords, getAuthors } = select("core");
  const postsQuery = pickBy(
    {
      categories,
      order,
      orderby: orderBy,
      per_page: postsToShow
    },
    value => !isUndefined(value)
  );
  const categoriesListQuery = {
    per_page: 100
  };

  return {
    categoriesList: getEntityRecords(
      "taxonomy",
      "category",
      categoriesListQuery
    ),
    authors: getAuthors(),
    latestPosts: getEntityRecords("postType", "post", postsQuery)
  };
})(LatestPostsEdit);

function CheckboxControl({
  label,
  className,
  heading,
  checked,
  help,
  instanceId,
  onChange,
  ...props
}) {
  const id = `inspector-checkbox-control-${instanceId}`;
  const onChangeValue = event => onChange(event.target.checked, instanceId);
  return (
    <BaseControl label={heading} id={id} help={help} className={className}>
      <input
        id={id}
        className="components-checkbox-control__input"
        type="checkbox"
        value="1"
        onChange={onChangeValue}
        checked={checked}
        aria-describedby={!!help ? id + "__help" : undefined}
        {...props}
      />
      <label className="components-checkbox-control__label" htmlFor={id}>
        {label}
      </label>
    </BaseControl>
  );
}

function SliderItem({ className, instanceId, post, categories, children }) {
  let catClass = "";
  // if (categories) {
  //   categories.map(cat => {
  //     if (post.categories.indexOf(cat.id) != -1) {
  //       catClass += " gosign_sort_" + cat.id;
  //     }
  //   });
  // }
  return (
    <div className={className + "" + catClass} key={instanceId}>
      {children}
    </div>
  );
}

// export const pickRelevantMediaFiles = ( image ) => {
// 	const imageProps = pick( image, [ 'alt', 'id', 'link', 'caption' ] );
// 	imageProps.url = get( image, [ 'sizes', 'large', 'url' ] ) || get( image, [ 'media_details', 'sizes', 'large', 'source_url' ] ) || image.url;
// 	return imageProps;
// };