import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e) => {
    console.log(e);
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="flex justify-around items-center h-[400px] mt-[8px]">
        <img
          src={images[active]}
          alt="animal hero"
          className="max-w-[400px] max-h-[400px]"
        />

        <div className="w-1/2">
          {images.map((photo, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={
                index === active
                  ? "w-[120px] h-[120px] rounded-lg inline-block m-[15px] cursor-pointer border-2 opacity-80"
                  : "w-[120px] h-[120px] rounded-lg inline-block m-[15px] cursor-pointer border-2"
              }
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
