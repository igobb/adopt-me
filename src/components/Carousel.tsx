import { Component, MouseEvent } from "react";

interface IProps {
  images: string[];
}

class Carousel extends Component<IProps> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event: MouseEvent<HTMLElement>) => {
    if (!(event?.target instanceof HTMLElement)) {
      return;
    }

    if (event?.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index,
      });
    }
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="flex justify-around items-center h-[400px] mt-3 mb-3">
        <img
          data-testid="hero"
          src={images[active]}
          alt="animal hero"
          className="max-w-[400px] max-h-[400px] rounded-md "
        />

        <div className="w-1/2">
          {images.map((photo, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <img
              data-testid={`thumbnail${index}`}
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={
                index === active
                  ? "w-[125px] h-[125px] rounded-lg inline-block m-[15px] cursor-pointer border-3 opacity-80 active"
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
